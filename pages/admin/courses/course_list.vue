<template>
  <div id="page">
    <div>
      <header class="title">
        <h1>MEUS CURSOS</h1>
        <v-btn class="mx-2 btn-icon" icon to="/admin/criar-curso">
          <v-icon dark id="plus-icon">mdi-plus-circle</v-icon>
        </v-btn>
      </header>
      <div class="body-list">
        <v-card v-for="item in list" v-bind:key="item.id" class="v-card-border">
          <div class="content">
            <div class="img-mask">
              <img :src="item.thumbUrl" alt />
            </div>
            <div class="info-text">
              <h1>{{ item.title }}</h1>
              <p id="description">{{ item.description }}</p>
            </div>
          </div>
          <div class="group-buttons">
            <v-btn class="btn-item bg-blue" :to="`/admin/course/${item.id}/edit`">
              <v-icon class="text-white">mdi-border-color</v-icon>
            </v-btn>
            <v-btn class="btn-item bg-danger" @click="deleteCourse(item.id)">
              <v-icon class="text-white">mdi-delete</v-icon>
            </v-btn>
          </div>
        </v-card>
      </div>
    </div>

    <navigation-bar />
  </div>
</template>
<router>
{
    path: '/admin/listar-cursos'
  }
</router>
<script>
import NavigationBar from '~/components/NavigationBar.vue';
import http from '~/services/http/generic';
export default {
  data: () => ({
    list: [],
    flagView: false,
    title: 'Listagem de Cursos',
  }),
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Listagem de Cursos New School',
        },
      ],
    };
  },
  components: {
    NavigationBar,
  },

  methods: {
    getAllCourses() {
      http
        .getAll(process.env.endpoints.COURSE)
        .then(res => {
          this.list = res.data;
          this.flagView = this.list.length < 1;
        })
        .catch(err => {
          alert(err);
        });
    },
    deleteCourse(id) {
      http
        .delete(process.env.endpoints.COURSE, id)
        .then(res => {
          alert('Curso excluído com sucesso!');
        })
        .catch(err => {
          console.error(err);
          alert('Erro ao excluir o curso!');
        });
    },
  },
  mounted() {
    this.getAllCourses();
  },
};
</script>
<style scoped>
#page {
  font-family: 'Montserrat', sans-serif !important;
}
h1 {
  font-size: 0.9rem;
}
p {
  font-size: 0.7rem;
}
.body-list {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.img-mask {
  display: flex;
  width: 100px;
  flex-shrink: 0;
}
.img-mask img {
  width: 100%;
}
.info-text {
  padding-left: 8px;
  padding-top: 8px;
}
.title {
  background: white;
  padding: 23px;
  display: flex;
  border-bottom: solid 1.5px #e4e4e4;
  margin-bottom: 2rem;
}
.title h1 {
  font-size: 25px;
  color: var(--primary);
  font-weight: 900;
  font-family: 'Montserrat', sans-serif !important;
}
.v-card {
  width: 90%;
  border-radius: 3px;
  margin: 11px;
  box-shadow: 0px 13px 18px #0000002b;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
.group-buttons {
  width: 2.1rem;
  overflow: hidden;
  flex: 0 0 auto;
}
.btn-item {
  height: 56px !important;
  min-width: unset !important;
  border-radius: none !important;
}
.v-card > *:last-child:not(.v-btn):not(.v-chip) {
  border-bottom-left-radius: unset !important;
}
.v-icon.v-icon {
  font-size: 15px !important;
}
.btn-icon {
  position: absolute;
  right: 10px;
  top: 58px;
}
#plus-icon {
  font-size: 3.8rem !important;
  color: var(--primary);
}
.content {
  display: flex;
}
#description {
  width: 11rem;
  word-break: break-word;
  height: 67px;
  overflow: hidden;
}

</style>