<template>
  <div>
    <base-material-card color="primary" class="px-5 py-3">
      <template v-slot:heading>
        <div class="display-2 font-weight-light">
          Schedule List ({{ $store.state.schedules.length }})
        </div>
        <div class="subtitle-1 font-weight-light">
          The Current Time: {{ theTime() }}
        </div>
      </template>
      <v-card-text>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="$store.state.schedules"
          :hide-default-footer="true"
          item-key="name"
          show-select
          class="elevation-1"
        >
          <template v-slot:[`item.name`]="{ item }">
            <a href="#" style="text-decoration: none"
              ><v-icon sm color="primary" class="mr-1">
                mdi-account-details
              </v-icon>
              <strong>{{ item.name }}</strong></a
            >
          </template>
          <template v-slot:[`item.task`]="{ item }">
            <v-icon sm color="primary" class="mr-1">
              {{ formatTask(toTitleCase(item.task)) }}
            </v-icon>
            {{ toTitleCase(item.task) }}
          </template>
          <template v-slot:[`item.time`]="{ item }">
            <span>{{ new Date(item.time).toLocaleString() }}</span>
          </template>
          <template v-slot:[`item.timer`]="{ item }">
            <span v-if="item.status === 'Active'">
              <v-icon sm color="primary" class="mr-1">
                mdi-camera-timer
              </v-icon>
              <count-timer :time="item.time" /> {{ item.timer }}
            </span>
          </template>
          <template v-slot:[`item.status`]="{ item }">
            <a class="nlink" href="#"
              ><v-icon sm color="primary">
                {{ formatStatus(item.status) }}
              </v-icon></a
            >
            {{ item.status }}
          </template>
        </v-data-table>
      </v-card-text>

      <schedules-toolbar :selected="selected" @run:schedule="runSchedule" />
    </base-material-card>
  </div>
</template>

<script>
import SchedulesToolbar from "../toolbars/SchedulesToolbar";
import CountTimer from "./CountTimer.vue";
export default {
  components: { SchedulesToolbar, CountTimer },
  name: "schedule-table",
  methods: {
    theTime() {
      return new Date().toLocaleTimeString();
    },
    toTitleCase(str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    },
    formatTask(taskName) {
      let task = taskName.split(" ");
      switch (task[0]) {
        case "Tweet":
          return "mdi-comment-edit";
        case "Retweet":
          return "mdi-twitter-retweet";
        case "Message":
          return "mdi-message";
        case "Reply":
          return "mdi-message-reply-text";
        case "Like":
          return "mdi-thumb-up";
        case "Follow":
          return "mdi-account-multiple-plus";
        case "Unfollow":
          return "mdi-account-multiple-minus";
      }
    },
    formatStatus(status) {
      switch (status) {
        case "Active":
          return "mdi-check";
        case "Paused":
          return "mdi-pause";
        case "Queued":
          return "mdi-pause";
      }
    },
    async getScheduleAPI() {
      fetch("https://localhost:44396/TwitterBot/Schedule", {
        method: "POST",
        body: "",
        credentials: "include",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          //this.schedules = data.data;
          this.$store.commit('SET_SCHEDULES', data.data)
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    async runSchedule(storedItems) {
      if (storedItems.TaskName === "Delete") {
        this.selected = [];
      }
      fetch("https://localhost:44396/TwitterBot/Schedules", {
        method: "POST",
        body: JSON.stringify(storedItems),
        credentials: "include",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.getScheduleAPI();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  created() {
    this.getScheduleAPI();
  },
  data() {
    return {
      schedules: [],
      selected: [],
      headers: [
        {
          text: "NAME",
          align: "start",
          value: "name",
        },
        { text: "TASK", value: "task" },
        { text: "TIME", value: "time" },
        { text: "TIMER", value: "timer" },
        { text: "STATUS", value: "status" },
      ],
    };
  },
  props: {
  },
};
</script>

<style scoped>
.center {
  margin: auto;
  width: 90%;
  border: 0px solid rgb(0, 77, 128);
  padding: 10px;
}
button {
  margin: 0 0.6rem 0 0;
  border: 1px solid rgb(0, 77, 128);
}
.nlink {
  text-decoration: none;
}
</style>
