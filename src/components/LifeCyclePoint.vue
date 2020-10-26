<template>
  <v-container>
      <div class="font-weight-normal">
        <strong>Запись # {{point.uuid}}</strong>
        <User :user="point.userData"/> {{textDispatcher[point.result]}} заявку {{ this.date }}
      </div>
  </v-container>
</template>

<script>
import User from './User'

export default {
  name: 'LifeCyclePoint',
  components: {
    User
  },
  props: {
    point: {
      type: Object,
      required: true,
    }
  },
  data: () => ({
    textDispatcher: {
      create: 'создал',
      accept: 'подтвердил',
      deny: 'отклонил',
    },
  }),
  computed: {
    date() {
      const rawData = new Date(this.point.date)
      const date = `${rawData.getDay()}.${rawData.getMonth() + 1} в ${rawData.getHours()}:${rawData.getMinutes()}`
      return date
    },
  }
}
</script>