<template>
  <div class="resources-list">
    
    <h2 class="resources-list__header">{{name}}
      <n-link :to="redirect ? `${path  || ''}new` : ''">
        <v-btn class="add-button" text icon color="primary">
          <v-icon>mdi-plus-circle-outline</v-icon>
        </v-btn>
      </n-link>
    </h2>

    <div v-for="eachOne in resources" v-bind:key="eachOne.id" class="resource">
      <n-link :to="editLink(eachOne)">
        <div class="resource__info">
          <h3 class="resource__title">{{ eachOne.title }}</h3>
          <p class="resource__subtitle">{{ subtitle ? subtitle(eachOne) : null }}</p>
        </div>
      </n-link>
      <div class="actions">
        <n-link :to="editLink(eachOne)" text icon color='primary' class="actions__link">
          <v-btn text icon color="primary" class="actions__link">
            <v-icon class="color: #aa56ff;">mdi-pencil</v-icon>
          </v-btn>
        </n-link>
        <v-btn @click="deleteObject(eachOne)" text icon color="primary" class="actions__link">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '~/services/http/auth'
import { http } from '~/services/http/config'
export default {
  props: ['resources', 'path', 'name', 'subtitle', 'redirect'],
  methods: {
    editLink (resource) {
      const path = this.path || ''
      return `${path}${resource.id}/edit`
    },
    deleteObject (resource) {
      if(this.path) {
        const { accessToken } = auth.getInfoAuth()
        http.delete(`/api/v1/${this.path}${resource.id}`, {
          headers: {
            Authorization: accessToken
          }
        }).then(() => {
          this.resources.splice(this.resources.findIndex(_resource => _resource.id == resource.id), 1)
        });
      }
    }
  }
}
</script>

<style>
a {
  text-decoration: none;
}

.actions__link {
  margin-left: 0.5em;
  min-width: 0 !important;
}

.resources-list__header {
  font-weight: 900;
  font-size: 20px;
  line-height: 24px;
  text-transform: uppercase;

  color: #6600CC;
  margin-bottom: 10px;
}

.resources-list {
  padding: 20px 0;
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
  height: 24px;
  justify-content: flex-end;
  display: flex;
  align-items: center;
}

.actions__link:first-child {
  margin-left: 0;
}

.add-button {
  min-width: 0 !important;
}
</style>
