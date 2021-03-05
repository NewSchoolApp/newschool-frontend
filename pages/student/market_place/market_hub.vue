<template>
  <div id="main-div">
    <header-bar title="Loja" :back-page="true">
      <v-icon id="magnify" v-ripple @click="$refs.drawer.toggleDrawer()"
        >mdi-magnify</v-icon
      >
    </header-bar>

    <v-row id="header-row" justify="space-between">
      <div>Produtos</div>
      <div>Saldo: {{ userPoints }}NC</div>
    </v-row>
    <navigation-bar />

    <!-- <div id="products-grid">
      <div
        v-for="product in filteredList"
        id="product-row"
        :key="product.id"
        v-infinite-scroll="getRanking"
        infinite-scroll-disabled="busy"
      >
        <product-card
          :name="product.name"
          :price="product.points"
          :img="
            'https://elgstore.vteximg.com.br/arquivos/ids/159105/MGSS_elg_04.jpg?v=636882566685830000'
          "
        />
      </div>
    </div> -->

    <masonry
      id="products-masonry"
      v-infinite-scroll="getProducts"
      :cols="2"
      :gutter="16"
      infinite-scroll-disabled="busy"
    >
      <div v-for="product in filteredList" :key="product.id">
        <product-card
          :name="product.name"
          :price="product.points"
          :img="
            'https://elgstore.vteximg.com.br/arquivos/ids/159105/MGSS_elg_04.jpg?v=636882566685830000'
          "
          :slug="product.slug"
        />
      </div>
    </masonry>
    <bottom-drawer ref="drawer">
      <v-text-field
        filled
        :full-width="true"
        append-icon="mdi-magnify"
        placeholder="Pesquisar..."
        @input="filter = $event"
        @click:append="applyFilter"
      ></v-text-field>
      <div v-for="item in history" id="history-list" :key="item.id">
        <v-row v-ripple @click="searchAgain(item)">
          <v-icon color="primary_light">mdi-history</v-icon>
          <div>{{ item }}</div>
        </v-row>
        <v-divider></v-divider>
      </div>
    </bottom-drawer>
  </div>
</template>
<router>
  {
    path: '/aluno/marketplace'
  }
</router>
<script>
import infiniteScroll from 'vue-infinite-scroll';
import NavigationBar from '~/components/NavigationBar.vue';
import HeaderBar from '~/components/Header.vue';
import BottomDrawer from '~/components/BottomDrawer.vue';
import market from '~/services/http/market_place';
import http from '~/services/http/generic';
import ProductCard from '~/components/marketplace/ProductCard.vue';

export default {
  components: {
    NavigationBar,
    HeaderBar,
    BottomDrawer,
    ProductCard,
  },
  directives: { infiniteScroll },
  data: () => ({
    userPoints: 0,
    products: [],
    history: [
      'Celular Motorola G6 Plus',
      'Entrevista Link API',
      'Celular Motorola G6 Plus',
      'Celular Motorola G6 Plus',
      'Celular Motorola G6 Plus',
      'Celular Motorola G6 Plus',
      'Celular Motorola G6 Plus',
      'Celular Motorola G6 Plus',
      'Celular Motorola G6 Plus',
      'Celular Motorola G6 Plus',
    ],
    filter: '',
    appliedFilter: '',
    page: 0,
    busy: false,
  }),
  computed: {
    filteredList() {
      if (this.appliedFilter) {
        const exp = new RegExp(
          this.appliedFilter
            .normalize('NFD')
            .replace(/[\u0300-\u036F]/g, '')
            .toLowerCase()
            .replace(' ', '-')
            .trim(),
          'i',
        );
        return this.products.filter(product => exp.test(product.nome));
      } else {
        return this.products;
      }
    },
    idUser() {
      return this.$store.state.user.data.id;
    },
  },
  async mounted() {
    this.getUserScore();
    await this.getProducts();
  },
  methods: {
    applyFilter() {
      this.appliedFilter = this.filter;
      this.history.push(this.filter);
      this.$refs.drawer.toggleDrawer();
    },
    searchAgain(value) {
      this.appliedFilter = value;
      this.$refs.drawer.toggleDrawer();
    },
    async getProducts() {
      if (!this.busy) {
        this.busy = true;

        const res = (
          await market.getAll(
            `${process.env.endpoints.MARKETPLACE.ITENS}?page=${this.page +
              1}&limit=8`,
          )
        ).data;

        if (res.length) {
          this.busy = false;
        }

        res.forEach(item => {
          this.products.push(item);
        });

        this.page += 1;
      }
    },
    async getUserScore() {
      this.userPoints = (
        await http.getAll(
          `${process.env.endpoints.RANKING}/user/${this.idUser}?timeRange=YEAR`,
        )
      ).data.points;
    },
  },
};
</script>
<style scoped>
* {
  font-family: Roboto;
}
#main-div {
  margin: 0 24px 100px;
}
.row {
  margin: initial;
  padding: initial;
}
.col {
  margin: initial;
  padding: initial;
}
#header-row {
  margin-bottom: 40px;
}
#header-row :nth-child(1) {
  font-size: 18px;
  font-weight: 700;
  line-height: 21px;
  letter-spacing: 0em;
  color: #585858;
}
#header-row :nth-child(2) {
  font-size: 18px;
  font-weight: 700;
  line-height: 21px;
  letter-spacing: 0em;
  color: var(--primary);
}
#magnify {
  font-size: 28px;
  color: #c4c4c4;
}
::v-deep .h1__theme {
  font-size: 24px;
}
::v-deep #header {
  margin: 24px 0;
}
/* #products-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 16px;
} */
#product-row:nth-child(odd) {
  margin-right: 4px;
}
#product-row:nth-child(even) {
  margin-left: 4px;
}
::v-deep .v-text-field {
  border-color: transparent !important;
  width: 100%;
  border-radius: 4px;
  margin-bottom: -10px;
}
::v-deep .v-text-field__details {
  height: 0;
  min-height: 0;
  margin: 0;
}
#history-list {
  padding: 0 8px;
  width: 100%;
}
#history-list .row {
  padding: 10px 0;
}
#history-list .mdi {
  margin-right: 18px;
}
::v-deep .v-icon {
  outline: none;
}
</style>
