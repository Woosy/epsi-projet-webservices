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
      items: [
        { guid: 40, first: 'Dickerson', last: 'Macdonald', street: 'Adresse', city: 'City', zip: 'ZIP' },
        { guid: 21, first: 'Larsen', last: 'Shaw', street: 'Adresse', city: 'City', zip: 'ZIP' },
        { guid: 89, first: 'Geneva', last: 'Wilson', street: 'Adresse', city: 'City', zip: 'ZIP' },
        { guid: 38, first: 'Jami', last: 'Carney', street: 'Adresse', city: 'City', zip: 'ZIP' },
        { guid: 39, first: 'Arsene', last: 'Dupont', street: 'Adresse', city: 'City', zip: 'ZIP' }
      ]
    }
  },
  computed: {
    rows () {
      return this.items.length
    }
  },
  mounted () {
    // fetch l'api avec les "perPage" premiers résultats classés par ordre alphabétique des noms de famille
    axios.get('http://localhost:3005/v1/customers/search?search=Eugene').then(res => {
      console.log(res.data)
      this.items = res.data.customers
    })
  },
  methods: {
    handleSearchChange () {
      console.log('handling change')
      axios.get(`http://localhost:3005/v1/customers/search?search=${this.searchQuery}`).then(res => {
        console.log(res.data)
        this.items = res.data.customers
      })
    }
  }
}
</script>
