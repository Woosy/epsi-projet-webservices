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
      </b-col>

      <!-- =============================== -->
      <!-- == PAGINATION ================= -->
      <!-- =============================== -->
      <b-col>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          :first-text="'1'"
          :last-text="Math.ceil(rows / perPage).toString()"
          limit="6"
          align="fill"
          aria-controls="customers-table"
        />
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
      :per-page="perPage"
      :current-page="currentPage"
    />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      perPage: 15,
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
      items: []
    }
  },
  computed: {
    rows () {
      return this.items.length
    }
  },
  methods: {
    handleSearchChange () {
      axios.get(`http://localhost:3005/v1/customers/search?search=${this.searchQuery}`).then(res => {
        this.items = res.data.customers
        this.$ga.event({
          eventCategory: 'category',
          eventAction: 'customer_search',
          eventLabel: this.searchQuery,
          eventValue: res.data.customers.length
        })
      })
    }
  }
}
</script>
