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
    <!-- error dialog displays any potential errors -->
    <v-dialog v-model="errorDialog" max-width="300">
      <v-card>
        <v-card-text class="subheading">{{ errorText }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="errorDialog = false">Got it!</v-btn>
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
    saved: false,
    errorDialog: null,
    errorText: '',
    uploadFieldName: 'file',
    maxSize: 1024,
    rules: [
      value =>
        !value ||
        value.size < 2000000 ||
        'Avatar size should be less than 2 MB!',
    ],
  }),
  computed: {
    idUser() {
      return this.$store.state.user.data.id;
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
  methods: {
    savedAvatar() {
      this.saving = false;
      this.saved = true;
    },
    launchFilePicker() {
      this.$refs.file.click();
    },
    onFileChange(fieldName, file) {
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
          formDataNew.append('image', file);
          http.post(`api/v1/user/${this.idUser}/photo`, formDataNew, {
            headers: {
              Authorization: utils.getToken(),
              'Content-Type': 'multipart/form-data',
            },
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
