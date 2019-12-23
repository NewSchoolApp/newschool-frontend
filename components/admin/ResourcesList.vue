<template>
  <div class="resources-list">
    <h2 class="resources-list__header">{{name}}</h2>
    <n-link :to="`${path  || ''}new`">Adicionar {{name}}</n-link>
    <div v-for="eachOne in resources" v-bind:key="eachOne.id" class="resource">
      <div class="resource__info">
        <h3 class="resource__title">{{ eachOne.title }}</h3>
        <p class="resource__subtitle">{{ subtitle ? subtitle(eachOne) : null }}</p>
      </div>
      <div class="actions">
        <nuxt-link v-bind:to="editLink(eachOne)" class="actions__link">Editar</nuxt-link>
        <nuxt-link v-bind:to="deleteLink(eachOne)" class="actions__link">Excluir</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['resources', 'path', 'name', 'subtitle'],
  methods: {
    editLink (resource) {
      const path = this.path || ''
      return `${path}${resource.id}/edit`
    },
    deleteLink (resource) {
      const path = this.path || ''
      return `${path}${resource.id}/delete`
    }
  }
}
</script>

<style>
.resources-list__header {
  font-weight: 900;
  font-size: 20px;
  line-height: 24px;
  text-transform: uppercase;

  color: #6600CC;
  margin-bottom: 10px;
}

.resources-list {
  margin-top: 20px;
  padding: 20px 0;
  border-top: 1px solid #e3e0e6;
}

.resource {
  border-bottom: 1px solid #e3e0e6;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
}

.resource__title {
  font-family: Montserrat;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;

  color: #1A1A1A;
}

.resource__author {
  font-family: Montserrat;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;

  color: #1A1A1A;
  margin: 0;
}

.actions {
  min-width: 120px;
  display: flex;
  align-items: center;
}

.actions__link {
  margin-left: 16px;
}
.actions__link:first-child {
  margin-left: 0;
}
</style>
