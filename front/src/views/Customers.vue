<template>
  <div class="container mt-5">
    <b-row>
      <!-- =============================== -->
      <!-- == SEARCH ===================== -->
      <!-- =============================== -->
      <b-col>
        <b-form-input
          v-model="searchQuery"
          placeholder="Rechercher..."
          @change="handleSearchChange()"
        />
        <div class="mb-3">
          <small class="text-muted">
            {{ rows }} entrées trouvées...
          </small>
        </div>
      </b-col>

      <!-- =============================== -->
      <!-- == PAGINATION ================= -->
      <!-- =============================== -->
      <b-col>
        <b-pagination
          class="mb-0"
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage.current"
          :first-text="'1'"
          :last-text="Math.ceil(rows / perPage.current).toString()"
          limit="6"
          align="fill"
          aria-controls="customers-table"
        />
        <b-row>
          <b-col class="my-auto">
            Nombre de résultats par page :
          </b-col>
          <b-col>
            <b-form-select
              class="my-2"
              v-model="perPage.current"
              :options="perPage.options"
            />
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <!-- =============================== -->
    <!-- == TABLE ====================== -->
    <!-- =============================== -->
    <b-table
      id="customers-table"
      dark
      hover
      striped
      :fields="fields"
      :items="items"
      :per-page="perPage.current"
      :current-page="currentPage"
    />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      perPage: {
        current: 15,
        options: [5, 10, 15, 20, 25, 30, 50, 100]
      },
      currentPage: 1,
      searchQuery: '',

      fields: [
        { key: 'first', label: 'Prénom' },
        { key: 'last', label: 'Nom' },
        { key: 'zip', label: 'CP' },
        { key: 'city', label: 'Ville' },
        { key: 'street', label: 'Adresse' },
        { key: 'guid', label: 'guid' }
      ],
      items: [],

      // initialize cache from localStorage
      cache: JSON.parse(localStorage.getItem('projet-webservices.cache')) || []
    }
  },
  computed: {
    rows () {
      return this.items.length
    }
  },
  methods: {
    handleSearchChange () {
      const query = this.searchQuery

      // if query's result is in cache
      const result = this.cache.find(item => item.query === query)
      if (result) {
        this.items = result.items
        this.analytics(query, result.items)
        return
      }

      // otherwise, query the API and store the response in the cache
      axios.get(`http://localhost:3005/v1/customers/search?search=${query}`).then(res => {
        this.items = res.data.customers
        this.analytics(query, res.data.customers)

        // update the cache
        this.cache.push({ query, items: res.data.customers })
        this.updateLocalStorage()

        while (true) {
          const hasBeenUpdated = this.updateLocalStorage()
          if (hasBeenUpdated) break
        }

        console.log('Local cache has been updated')
      })
    },

    updateLocalStorage () {
      try {
        localStorage.setItem('projet-webservices.cache', JSON.stringify(this.cache))
        return true
      } catch (err) {
        // si une erreur est thrown, on assume que c'est un soucis de stockage
        // (il n'existe pas de code d'erreur standardisé lorsque le localStorage,
        // cf. https://stackoverflow.com/questions/3027142/calculating-usage-of-localstorage-space)
        console.error('LocalStorage seems to be full, trying to remove oldest element of the cache')
        this.cache.shift()
        return false
      }
    },

    // google analytics
    analytics (query, items) {
      this.$ga.event({
        eventCategory: 'category',
        eventAction: 'customer_search',
        eventLabel: query,
        eventValue: items
      })
    }
  }
}
</script>
