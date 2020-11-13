<template>
  <div>
    <!-- slot for parent component to activate the file changer -->
    <div @click="launchFilePicker()">
      <div>
        <v-avatar v-if="!imgSrc" size="130px" color="primary">
          <v-icon id="account-icon">mdi-camera</v-icon>
        </v-avatar>
        <v-avatar v-else v-ripple size="130px" class="mb-3">
          <img :src="imgSrc" alt="avatar" />
        </v-avatar>
        <p class="sub-purple mt-4 mb-10">Editar Foto</p>
      </div>
    </div>
    <!-- image input: style is set to hidden and assigned a ref so that it can be triggered -->
    <input
      ref="file"
      type="file"
      :name="uploadFieldName"
      style="display:none"
      @change="onFileChange($event.target.name, $event.target.files)"
    />
    <div v-if="loading">
      <div class="container-spinner">
        <v-progress-circular
          :size="70"
          :width="5"
          indeterminate
          color="#6600cc"
        />
      </div>
    </div>
    <!-- error dialog displays any potential errors -->
    <v-dialog v-model="errorDialog" max-width="300">
      <v-card>
        <v-card-text class="subheading">{{ errorText }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="errorDialog = false">Entendi!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { http } from '~/services/http/config';
import utils from '~/utils/index';

export default {
  name: 'ImageInput',
  props: {
    // Use "value" here to enable compatibility with v-model
    value: Object,
  },
  data: () => ({
    imgSrc: '',
    avatar: null,
    saving: false,
    loading: false,
    saved: false,
    errorDialog: null,
    errorText: '',
    uploadFieldName: 'file',
    maxSize: 1024,
    rules: [
      value =>
        !value ||
        value.size < 2000000 ||
        'O tamanho da foto deve ser menor que 2mb!',
    ],
  }),
  computed: {
    idUser() {
      return this.$store.state.user.data.id;
    },
    user() {
      return this.$store.state.user.data;
    },
  },
  watch: {
    avatar: {
      handler() {
        this.saved = false;
      },
      deep: true,
    },
  },
  mounted() {
    this.imgSrc = this.user.photo;
  },
  methods: {
    savedAvatar() {
      this.saving = false;
      this.saved = true;
    },
    launchFilePicker() {
      this.$refs.file.click();
    },
    onFileChange(fieldName, file) {
      this.loading = true;
      const { maxSize } = this;
      const imageFile = file[0];

      // check if user actually selected a file
      if (file.length > 0) {
        const size = imageFile.size / maxSize / maxSize;
        if (!imageFile.type.match('image.*')) {
          // check whether the upload is an image
          this.errorDialog = true;
          this.errorText = 'Please choose an image file';
        } else if (size > 1) {
          // check whether the size is greater than the size limit
          this.errorDialog = true;
          this.errorText =
            'Your file is too big! Please select an image under 1MB';
        } else {
          // para exibir web
          const imageURL = URL.createObjectURL(imageFile);
          this.imgSrc = imageURL;
          // para o post
          const formDataNew = new FormData();
          formDataNew.append('file', imageFile);
          http
            .post(`api/v1/user/${this.idUser}/photo`, formDataNew, {
              headers: {
                Authorization: utils.getToken(),
                'Content-Type': 'multipart/form-data',
              },
            })
            .then(res => {
              this.$notifier.showMessage({
                type: 'success',
                message: 'Boa! deu certo',
              });
              http
                .get(process.env.endpoints.USER_ME, {
                  headers: { Authorization: utils.getToken() },
                })
                .then(res => {
                  const types = {
                    ADMIN: 'Administrador',
                    STUDENT: 'Aluno',
                  };
                  this.$store.commit('user/SET_USER', {
                    name: res.data.name || 'Anônimo',
                    type: types[res.data.role.name] || 'Visitante',
                    id: res.data.id || '',
                    role: res.data.role.name || '',
                    photo: res.data.photo || '',
                  });
                  this.loading = false;
                });
            })
            .catch(err => {
              console.log(err);
              this.$notifier.showMessage({
                type: 'error',
              });
            });
        }
      }
    },
  },
};
</script>
<style scoped>
#account-icon {
  font-size: 80px;
  color: #ffffff9a;
}
.sub-purple {
  font-family: Roboto;
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
  color: var(--primary);
}
</style>
