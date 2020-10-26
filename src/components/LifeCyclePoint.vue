<template>
  <v-container>
      <div class="font-weight-normal">
        <strong>Запись # {{point.uuid}}</strong>
        <Approver :approver="point.userData"/> {{textDispatcher[point.result]}} заявку {{ this.date }}
      </div>
  </v-container>
</template>

<script>
import Approver from './Approver'

export default {
  name: 'LifeCyclePoint',
  components: {
    Approver
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