<template>
  <div>
    <base-material-card color="primary" class="px-5 py-3">
      <template v-slot:heading>
        <v-icon sm> mdi-bell-ring</v-icon>
        <span class="display-2 font-weight-light ml-2">
          Activity List ({{ actions.length }})
        </span>
      </template>
      <v-card-text>
        <v-row class="pt-1">
          <v-col cols="auto">
            <v-data-table
              dense
              v-model="selected"
              :headers="headers"
              :items="actions"
              item-key="id"
              class="elevation-1"
              :search="search"
              :itemsPerPage="10"
              :hide-default-footer="false"
              fixed-header
            >
              <template v-slot:[`item.time`]="{ item }">
                <span>{{ new Date(item.time).toLocaleString() }}</span>
              </template>
            </v-data-table>
          </v-col>
          <v-col>
            <v-timeline align-top dense>
              <v-timeline-item
                v-for="(item, index) in tasks"
                :key="item.id"
                :color="'primary ' + colorSwitch((index % 2) + 1)"
                small
              >
                <v-row class="pt-1">
                  <v-col cols="3">
                    <strong>{{ formatDate(item.time) }}</strong>
                  </v-col>
                  <v-col>
                    <strong
                      ><a @click="viewTask(item.id)">{{
                        item.name
                      }}</a></strong
                    >
                    <div class="caption"><span v-if="item.name.includes('Search')"> {{ item.taskItem.taskSettings.searchTerm }} - </span> {{ item.taskGood }} / {{ item.taskTotal }}</div>
                  </v-col>
                </v-row>
              </v-timeline-item>

              <v-timeline-item color="primary darken-3" small>
                <v-row class="pt-1">
                  <v-col cols="3">
                    <strong>5:34pm</strong>
                  </v-col>
                  <v-col>
                    <strong>Follow Search</strong>
                    <div class="caption">5/5</div>
                  </v-col>
                </v-row>
              </v-timeline-item>

              <v-timeline-item color="primary lighten-3" small>
                <v-row class="pt-1">
                  <v-col cols="3">
                    <strong>3:23pm</strong>
                  </v-col>
                  <v-col>
                    <strong>Unfollow Nonfollowers</strong>
                    <div class="caption mb-2">10</div>
                  </v-col>
                </v-row>
              </v-timeline-item>

              <v-timeline-item color="primary darken-3" small>
                <v-row class="pt-1">
                  <v-col cols="3">
                    <strong>12pm</strong>
                  </v-col>
                  <v-col>
                    <strong>Lunch break</strong>
                  </v-col>
                </v-row>
              </v-timeline-item>

              <v-timeline-item color="primary lighten-3" small>
                <v-row class="pt-1">
                  <v-col cols="3">
                    <strong>9-11am</strong>
                  </v-col>
                  <v-col>
                    <strong>Sync Update</strong>
                    <div class="caption">1/1</div>
                  </v-col>
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
    formatStatus(status) {
      switch (status) {
        case "Good":
          return "fa fa-check-circle blue";
        case "Paused":
          return "fa fa-pause blue";
        case "Queued":
          return "fa fa-heart blue";
      }
    },
    async getActivityAPI() {
      fetch("https://localhost:44396/TwitterBot/Actions", {
        method: "POST",
        body: "3301325541",
        credentials: "include",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.actions = data.data;
          this.tasks = data.tasks;
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
      actions: this.data,
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
    numberOfPlayers: function() {
    	return 2;
    }
  },
  props: {
    data: {
      type: Array,
      default: () => [],
      description: "Table data",
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.style-1 {
  color: '#1E90FF';
}

.style-2 {
  color: red;
}
</style>