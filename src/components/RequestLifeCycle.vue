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
              :number="request.stages.indexOf(stage) + 1"
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
import Request from "./Request";
import { loadRequest } from "./sampleData";
import Stage from "./Stage";
import EventBus from "../event-bus";

/**
 * Component for request's life cycle Card
 */
export default {
  name: "RequestLifeCycle",
  components: {
    Request,
    Stage,
  },
  data: () => ({
    request: "",
  }),
  mounted() {
    EventBus.$on("LOAD_REQUEST", async (uuid) => {
      this.request = "";
      const request = await loadRequest(uuid);
      this.request = request;
    });
  },
};
</script>
