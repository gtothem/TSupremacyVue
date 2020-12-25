<template>
  <div v-if="user">
    <base-material-card color="primary" class="px-5 py-3">
      <template v-slot:heading>
        <v-row no-gutters>
          <v-col cols="auto" :key="1">
            <h2 class="mt-5">{{ user.username }}</h2>
          </v-col>
          <v-col cols="auto" :key="2">
            <v-tabs
              v-model="tab"
              background-color="primary"
              color="white"
              dark
              icons-and-text
            >
              <v-tabs-slider></v-tabs-slider>

              <v-tab href="#tab-1" class="mx-2">
                Activity ({{ stats.actions }})
                <v-icon sm> mdi-bell-ring</v-icon>
              </v-tab>

              <v-tab href="#tab-2">
                Friends ({{ stats.friends }})
                <v-icon sm> mdi-account-group </v-icon>
              </v-tab>

              <v-tab href="#tab-3">
                Followers ({{ stats.followers }})
                <v-icon sm> mdi-account-multiple-plus </v-icon>
              </v-tab>

              <v-tab href="#tab-4">
                Statuses ({{ stats.statuses }})
                <v-icon sm> mdi-comment-edit </v-icon>
              </v-tab>
            </v-tabs>
          </v-col>
        </v-row>
      </template>
      <v-tabs-items v-model="tab">
        <v-tab-item :key="1" :value="'tab-1'">
          <activity :user="user" />
        </v-tab-item>
        <v-tab-item :key="2" :value="'tab-2'">
          <friends :user="user" />
        </v-tab-item>
        <v-tab-item :key="3" :value="'tab-3'">
          <followers :user="user" />
        </v-tab-item>
        <v-tab-item :key="4" :value="'tab-4'">
          <statuses :user="user" />
        </v-tab-item>
      </v-tabs-items>
    </base-material-card>
  </div>
</template>

<script>
import Friends from "../../components/base/twittertables/FriendsTable.vue";
import Followers from "../../components/base/twittertables/FollowersTable.vue";
import Statuses from "../../components/base/twittertables/StatusesTable.vue";
import Activity from "../../components/base/twittertables/ActivityTable.vue";
export default {
  components: { Friends, Followers, Statuses, Activity },
  name: "profiles-page",
  created() {
    this.user = this.$route.params.profile;
    this.getStats(this.user.username);
  },
  methods: {
    getStats(id) {
      this.stats.actions = this.$store.state.actions.length;
      this.stats.friends = this.$store.state.accounts.find((x) => x.username === id).friends;
      this.stats.followers = this.$store.state.accounts.find((x) => x.username === id).followers;
      this.stats.statuses = this.$store.state.accounts.find((x) => x.username === id).statuses;
    },
  },
  data() {
    return {
      user: null,
      tab: null,
      singleSelect: false,
      selected: [],
      stats: {
        actions: 0,
        friends: 0,
        followers: 0,
        statuses: 0,
      },
    };
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
  margin: 0 0.5rem 0 0;
}
.blue {
  color: dodgerblue;
  margin-right: 0.2rem;
}
.pause {
  text-decoration: none;
  color: dodgerblue;
}
</style>