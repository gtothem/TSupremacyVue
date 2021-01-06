<template>
  <div>
    <base-material-card color="primary" class="px-5 py-3" size="pa-4">
      <template v-slot:heading>
        <v-icon sm> mdi-bell-ring</v-icon>
        <span class="display-2 font-weight-light ml-2">
          Activity List ({{ $store.state.actions.length }})
        </span>
        <div class="subtitle-1 font-weight-light">
          Last 24 Hours
        </div>
      </template>
      <v-card-text>
        <v-data-table
          dense
          :headers="headers"
          :items="$store.state.actions"
          item-key="id"
          class="elevation-1 pt-2"
          :itemsPerPage="itemsPerPage"
          :hide-default-footer="false"
          fixed-header
        >
          <template v-slot:[`item.account`]="{ item }">
            <a @click="viewProfile(item.account)">{{ item.account }}</a>
          </template>
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
            <small>{{ new Date(item.time).toLocaleString() }}</small>
          </template>
        </v-data-table>
      </v-card-text>
    </base-material-card>
  </div>
</template>

<script>
export default {
  components: {},
  name: "activityfull-table",
  methods: {
    viewProfile(p) {
      console.log(p);
      this.$router.push({
        name: "Profiles",
        params: {
          profile: p,
        },
      });
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
    async getActivityAPI() {
      fetch("https://localhost:44396/TwitterBot/Actions", {
        method: "POST",
        body: "%",
        credentials: "include",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("activity:", data);
          //this.actions = data.data;
          //this.tasks = data.tasks;

          this.$store.commit("SET_ACTIONS", data.data);
          this.$store.commit("SET_TASKS", data.tasks);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  watch: {
    user: {
      handler: function () {
        this.getActivityAPI();
      },
      deep: true,
    },
  },
  created() {
    if (!this.user) {
      this.user = this.$store.state.accounts[0];
    }
    this.getActivityAPI();
  },
  data() {
    return {
      headers: [
        {
          text: "ACCOUNT",
          align: "start",
          value: "account",
        },
        { text: "ACTION", value: "action" },
        { text: "USER", value: "user" },
        { text: "ID", value: "id" },
        { text: "TIME", value: "time" },
      ],
    };
  },
  props: {
    user: {
      type: Object,
      default: () => [],
      description: "User data",
    },
    itemsPerPage: {
      type: Number,
      default: 10,
      description: "Pagination Items Per Page",
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>