<template>
  <div>
    <base-material-card color="primary" class="px-5 py-3">
      <template v-slot:heading>
        <v-icon sm> mdi-bell-ring</v-icon>
        <span class="display-2 font-weight-light ml-2">
          Activity List ({{ $store.state.actions.length }})
        </span>
      </template>
      <v-card-text>
        <v-row>
          <v-col cols="auto">
            <v-data-table
              dense
              v-model="selected"
              :headers="headers"
              :items="$store.state.actions"
              item-key="id"
              class="elevation-1"
              :search="search"
              :itemsPerPage="15"
              :hide-default-footer="false"
              fixed-header
            >
              <template v-slot:[`item.action`]="{ item }">
                <v-icon sm color="primary" class="pr-2"
                  >{{ formatAction(item.action) }}
                </v-icon>
                <span>{{ item.action }}</span>
              </template>
              <template v-slot:[`item.user`]="{ item }">
                <a href="#">{{ item.user }}</a>
              </template>
              <template v-slot:[`item.id`]="{ item }">
                <a href="#">{{ item.id }}</a>
              </template>
              <template v-slot:[`item.time`]="{ item }">
                <span>{{ new Date(item.time).toLocaleString() }}</span>
              </template>
            </v-data-table>
          </v-col>
          <v-col>
            <v-timeline align-top dense>
              <v-timeline-item
                v-for="(item, index) in $store.state.tasks"
                :key="item.id"
                :color="'primary ' + colorSwitch((index % 2) + 1)"
                :icon="formatTask(item.name)"
              >
                <v-row class="pt-1">
                  <v-col cols="2">
                    <strong
                      ><a @click="viewTask(item.id)">{{ item.name }}</a></strong
                    >
                    <div class="caption">
                      <span v-if="item.name.includes('Search')">
                        {{ item.taskItem.taskSettings.searchTerm }} -
                      </span>
                      {{ item.taskGood }} / {{ item.taskTotal }}
                    </div>
                    <div class="caption">
                      {{ formatDate(item.time) }}
                    </div>
                  </v-col>
                  <small></small>
                  <v-col> </v-col>
                </v-row>
              </v-timeline-item>
            </v-timeline>
          </v-col>
        </v-row>
      </v-card-text>
    </base-material-card>
  </div>
</template>

<script>
import FriendsToolbar from "../toolbars/FriendsToolbar";
export default {
  components: { FriendsToolbar },
  name: "activity-table",
  methods: {
    colorSwitch(c) {
      if (c === 1) {
        return "primary darken-3";
      } else {
        return "primary lighten-3";
      }
    },
    viewTask(t) {
      console.log(t);
      this.$router.push({
        name: "Task View",
        params: { taskId: t },
      });
    },
    formatDate(d) {
      let date =
        ("0" + new Date(d).getDate()).slice(-2) +
        "/" +
        ("0" + new Date(d).getMonth()).slice(-2) +
        "/" +
        new Date(d).getFullYear();
      let hours = ("0" + new Date(d).getHours()).slice(-2);
      let minutes = ("0" + new Date(d).getMinutes()).slice(-2);
      let AmOrPm = hours >= 12 ? "pm" : "am";
      hours = hours % 12 || 12;
      let finalTime = hours + ":" + minutes + AmOrPm;
      let today =
        ("0" + new Date().getDate()).slice(-2) +
        "/" +
        ("0" + new Date().getMonth()).slice(-2) +
        "/" +
        new Date().getFullYear();

      if (date !== today) {
        finalTime = date + " " + finalTime;
      }

      return finalTime;
    },
    formatAction(action) {
      switch (action) {
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
        case "Sync":
          return "mdi-battlenet";
      }
    },
    async getActivityAPI() {
      fetch("https://localhost:44396/TwitterBot/Actions", {
        method: "POST",
        body: this.user.userId,
        credentials: "include",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("activity:", data);
          //this.actions = data.data;
          //this.tasks = data.tasks;
          
          this.$store.commit('SET_ACTIONS', data.data)
          this.$store.commit('SET_TASKS', data.tasks)
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  created() {
    this.getActivityAPI();
  },
  data() {
    return {
      actions: [],
      tasks: null,
      selected: [],
      search: "",
      altColor: 0,
      headers: [
        {
          text: "ACTION",
          align: "start",
          value: "action",
        },
        { text: "USER", value: "user" },
        { text: "ID", value: "id" },
        { text: "TIME", value: "time" },
      ],
    };
  },
  computed: {
    numberOfPlayers: function () {
      return 2;
    },
  },
  props: {
    user: {
      type: Object,
      default: () => [],
      description: "User data",
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>