<template>
  <div class="text-xs-center">
    <v-progress-circular
      indeterminate
      color="primary"
      v-if="loading"
    ></v-progress-circular>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
computed: {
  ...mapGetters(['loading'])
},
}
</script>