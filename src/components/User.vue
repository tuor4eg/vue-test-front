<template>
  <v-container>
    <strong>{{ user.name }}</strong>
  </v-container>
</template>

<script>

/**
 * Component for user data
 */
export default {
  name: "User",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>
