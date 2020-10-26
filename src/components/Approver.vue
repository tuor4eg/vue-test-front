<template>
  <v-container>
      <strong>{{ approver.name }}</strong>
  </v-container>
</template>

<script>
export default {
  name: 'Approver',
  props: {
    approver: {
      type: Object,
      required: true,
    }
  }
}
</script>