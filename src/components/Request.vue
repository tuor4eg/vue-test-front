<template>
  <v-container>
    <v-toolbar-title class="title black--text pl-0">
      Заявка #{{request.uuid}} от {{this.date}}
    </v-toolbar-title>
    <v-toolbar-title class="title black--text pl-1">
      Состояние: {{statusDispatcher[request.status]}}
    </v-toolbar-title>
    <p class="ml-1">
      Автор: {{request.userData.name}}
    </p>
  </v-container>
</template>

<script>

export default {
  name: 'Request',
  props: {
    request: {
      type: Object,
      required: true,
    }
  },
  data: () => ({
    statusDispatcher: {
      create: 'создана',
      accept: 'принята',
      deny: 'отклонена',
      in_progress: 'в процессе визирования'
    }
  }),
  computed: {
    date() {
      const rawData = new Date(this.request.date)
      const date = `${rawData.getDay()}.${rawData.getMonth() + 1} ${rawData.getHours()}:${rawData.getMinutes()}`
      return date
    },
  },
}
</script>