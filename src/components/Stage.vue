<template>
  <v-container>
    <v-timeline align-top dense>
      <v-timeline-item :color="colorDispatcher[stage.result]" small>
        <div>
          <h2>Этап # {{ number }}</h2>
          <strong>Участники:</strong>
          <ul>
            <template v-for="user in stage.userData">
              <li :key="user.uuid">
                <User :user="user" />
              </li>
            </template>
          </ul>
          <strong>{{ orderDispatcher[stage.order] }}</strong>
        </div>
        <template v-for="point in stage.points">
          <LifeCyclePoint :point="point" :key="point.uuid" />
        </template>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script>
import LifeCyclePoint from "./LifeCyclePoint";
import User from "./User";

/**
 * Component for request's stage
 */
export default {
  name: "Stage",
  components: {
    LifeCyclePoint,
    User,
  },
  data: () => ({
    // Dispatcher for stage's badge color
    colorDispatcher: {
      create: "blue",
      accept: "green",
      deny: "red",
      in_progress: "deep-purple lighten-1",
    },
    // Dispatcher for text message of stage's order
    orderDispatcher: {
      every: "Необходимо визирование каждым участником",
      any: "Достаточно визирования любого участника",
      default: null,
    },
  }),
  props: {
    stage: {
      type: Object,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
  },
};
</script>
