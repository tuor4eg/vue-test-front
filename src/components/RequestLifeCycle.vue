<template>
  <v-container>
      <template v-if="request !== ''">
        <v-card max-width="500" elevation="10">
          <v-card-title class="font-weight-bold ml-8 mb-2">
            <Request :request="request" />
            </v-card-title>
          <v-card-text>
            <div class="font-weight-bold ml-8 mb-2">
              История заявки
            </div>
              <template v-for="stage in request.stages">
                <Stage 
                  :stage="stage" 
                  :key="stage.uuid"
                  :number="stages.indexOf(stage) + 1"
                />
              </template>
          </v-card-text>
        </v-card>
      </template>
        <template v-else>
        <v-card max-width="500" elevation="10">
          <p>Загрузка данных...</p>
        </v-card>
      </template>
  </v-container>
</template>

<script>
import Request from './Request'
import {loadRequest} from './sampleData'
import Stage from './Stage'
import EventBus from '../event-bus'

export default {
  name: 'RequestLifeCycle',
  components: {
    Request,
    Stage,
  },
  data: () => ({
    colorDispatcher: {
      request: 'blue',
      accept: 'green',
      deny: 'red',
      in_progress: 'deep-purple lighten-1'
    },
    request: ''
  }),
  mounted() {
    EventBus.$on('LOAD_REQUEST', function(uuid) {
      const request = loadRequest(uuid)
      this.request = request
      console.log(this.request)
    })
  },
}
</script>
