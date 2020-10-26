<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col
          ><strong>Заявки:</strong>
          <v-list min-width="200">
            <v-list-item-group v-model="model">
              <v-list-item
                v-for="(item, i) in requests"
                :key="i"
                v-on:click="selectRequest(item.uuid)"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="item.uuid"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col>
          <template v-if="selectedRequest !== ''">
            <RequestLifeCycle />
          </template>
          <template v-else>
            <v-card class="mx-auto" max-width="500" elevation="0">
              <p>Не выбрано ни одной заявки</p>
            </v-card>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import RequestLifeCycle from "./components/RequestLifeCycle";
import db from "./components/sampleData";
import EventBus from "./event-bus";

/**
 * Main component for requests list
 */
export default {
  name: "App",
  components: {
    RequestLifeCycle,
  },
  created() {
    this.getRequestsList();
  },
  data: () => ({
    model: "1",
    selectedRequest: "",
  }),
  methods: {
    getRequestsList() {
      this.requests = db.requests;
    },
    selectRequest(uuid) {
      this.selectedRequest = uuid;
      EventBus.$emit("LOAD_REQUEST", uuid);
    },
  },
};
</script>
