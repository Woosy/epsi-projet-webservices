<template>
  <vuetable ref="vuetable"
    api-url="http://localhost:3005/v1/customers"
    :fields="['guid', 'first', 'last', 'street', 'city', 'zip']"
    data-path="customers"
    pagination-path=""
  ></vuetable>
</template>

<script>
import Vuetable from 'vuetable-2'

export default {
  components: {
    Vuetable
  }
}
</script>
