<template>
  <div v-if="user">
    <base-material-card
      color="primary"
      class="px-5 py-3 elevation-0"
      size="pa-4"
    >
      <template v-slot:heading>
        <v-row no-gutters>
          <v-col cols="auto" :key="1">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <a v-bind="attrs" v-on="on">
                  <h2 class="mt-5 white--text">
                    <v-avatar size="35px" class="mr-2">
                      <img :src="user.picture" alt="" />
                    </v-avatar>
                    {{ user.username
                    }}<v-icon sm color="white"> mdi-menu-down</v-icon>
                  </h2></a
                >
              </template>
              <v-list>
                <v-list-item
                  v-for="(a, index) in $store.state.accounts"
                  :key="index"
                  @click="viewProfile(a)"
                  class="tile"
                >
                  <v-list-item-title>
                    <v-avatar size="30px" class="mr-2">
                      <img :src="a.picture" alt="" />
                    </v-avatar>
                    {{ a.username }}</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
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
                Activity ({{ $store.state.actions.length }})
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

              <v-tab href="#tab-5">
                Likes ({{ stats.likes }})
                <v-icon sm> mdi-thumb-up </v-icon>
              </v-tab>
            </v-tabs>
          </v-col>
        </v-row>
      </template>
      <v-tabs-items v-model="tab">
        <v-tab-item :key="1" :value="'tab-1'">
          <v-row>
            <v-col> <activity :user="user" /> </v-col>
            <v-col> <task-timeline /> </v-col>
          </v-row>
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
        <v-tab-item :key="5" :value="'tab-5'">
          <likes :user="user" />
        </v-tab-item>
      </v-tabs-items>
    </base-material-card>
  </div>
</template>

<script>
import Friends from "../../components/base/twittertables/FriendsTable.vue";
import Followers from "../../components/base/twittertables/FollowersTable.vue";
import Statuses from "../../components/base/twittertables/StatusesTable.vue";
import Likes from "../../components/base/twittertables/LikesTable.vue";
import Activity from "../../components/base/twittertables/ActivityTable.vue";
import TaskTimeline from "../../components/base/twittertables/TaskTimeline.vue";
export default {
  components: { Friends, Followers, Statuses, Likes, Activity, TaskTimeline },
  name: "profiles-page",
  created() {
    if (this.$route.params.profile != null) {
      this.viewProfile(this.$route.params.profile);
      return;
    } else if (this.$store.state.profile != null) {
      this.viewProfile(this.$store.state.profile);
      return;
    }
    this.viewProfile(this.$store.state.accounts[0]);
  },
  methods: {
    viewProfile(p) {
      this.user = p;
      this.$store.commit("SET_PROFILE", this.user);
      this.getStats(this.user.username);
    },
    getStats(id) {
      this.stats.friends = this.$store.state.accounts.find(
        (x) => x.username === id
      ).friends;
      this.stats.followers = this.$store.state.accounts.find(
        (x) => x.username === id
      ).followers;
      this.stats.statuses = this.$store.state.accounts.find(
        (x) => x.username === id
      ).statuses;
      this.stats.likes = this.$store.state.accounts.find(
        (x) => x.username === id
      ).likes;
    },
  },
  data() {
    return {
      user: null,
      tab: null,
      singleSelect: false,
      selected: [],
      stats: {
        friends: 0,
        followers: 0,
        statuses: 0,
        likes: 0,
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