<template>
  <div>
    <base-material-card color="primary" class="px-5 py-3" size="pa-6">
      <template v-slot:heading>
        <v-icon sm> mdi-twitter</v-icon>
        <span class="display-2 font-weight-light ml-1">
          Task List ({{ $store.state.tasks.length }})
        </span>
      </template>
      <v-card-text>
        <v-row>
          <v-col style="overflow-y: auto; height: 595px">
            <v-timeline align-top dense>
              <v-timeline-item
                v-for="(item, index) in $store.state.tasks"
                :key="item.id"
                :color="'primary ' + colorSwitch((index % 2) + 1)"
                :icon="formatTask(item.name)"
                :search="search"
              >
                <v-row>
                  <v-col>
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
export default {
  components: {},
  name: "task-timeline",
  data() {
    return {
      search: "",
    };
  },
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
        finalTime = date + ", " + finalTime;
      }

      return finalTime;
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
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>