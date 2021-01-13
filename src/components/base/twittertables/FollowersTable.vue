<template>
  <div>
    <base-material-card color="primary" class="px-5 py-3" size="pa-5">
      <template v-slot:heading>
        <v-row>
          <v-col cols="auto">
            <v-icon sm class="ml-2"> mdi-account-group</v-icon>
            <span class="display-2 font-weight-light ml-2"
              >Followers List ({{ $store.state.followers.length }})</span
            >
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              clearable
              style="display: inline"
            ></v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn small outlined rounded>Filters</v-btn>
          </v-col>
        </v-row>
      </template>
      <v-card-text>
        <v-data-table
          dense
          v-model="selected"
          :headers="headers"
          :items="$store.state.followers"
          item-key="id"
          show-select
          class="elevation-1"
        >
          <template v-slot:[`item.user`]="{ item }">
            <a href="#" style="text-decoration: none"> {{ item.user }}</a>
          </template>
          
          <template v-slot:[`item.name`]="{ item }">
            <small v-if="item.name.length >= 15">{{
              item.name
            }}</small>
            <span v-if="item.name.length < 15">{{ item.name }}</span>
          </template>
          
          <template v-slot:[`item.description`]="{ item }">
            <small v-if="item.description.length > 100">{{
              item.description
            }}</small>
            <span v-if="item.description.length < 100">{{ item.description }}</span>
          </template>
        </v-data-table>
      </v-card-text>

      <followers-toolbar />
    </base-material-card>
  </div>
</template>

<script>
import FollowersToolbar from "../toolbars/FollowersToolbar";
export default {
  name: "followers-table",
  components: { FollowersToolbar },
  methods: {
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
    async getFollowersAPI() {
      fetch("https://localhost:44396/TwitterBot/Followers", {
        method: "POST",
        body: this.user.userId,
        credentials: "include",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          //this.followers = data.data;
          this.$store.commit("SET_FOLLOWERS", data.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  created() {
    this.getFollowersAPI();
  },
  data() {
    return {
      followers: [],
      selected: [],
      search: "",
      headers: [
        {
          text: "USER",
          align: "start",
          value: "user",
        },
        { text: "STATUSES", value: "statuses" },
        { text: "LIKES", value: "likes" },
        { text: "FRIENDS", value: "friends" },
        { text: "FOLLOWERS", value: "followers" },
        { text: "FOLLOWBACK", value: "followBack" },
        { text: "VERIFIED", value: "verified" },
        { text: "NAME", value: "name" },
        { text: "DESCRIPTION", value: "description" },
      ],
    };
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
</style>