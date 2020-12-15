<template>
  <div>
    <base-material-card color="primary" class="px-5 py-3">
      <template v-slot:heading>
        <v-icon sm> mdi-account-group</v-icon>
        <span class="display-2 font-weight-light ml-2"
          >Followers List ({{ followers.length }})</span
        >
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </template>
      <v-card-text>
        <v-data-table
          dense
          v-model="selected"
          :headers="headers"
          :items="followers"
          item-key="id"
          show-select
          class="elevation-1"
        >
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
        body: "3301325541",
        credentials: "include",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.followers = data.data;
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
      followers: this.data,
      selected: [],
      search: "",
      headers: [
        {
          text: "USER",
          align: "start",
          sortable: false,
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
    data: {
      type: Array,
      default: () => [],
      description: "Table data",
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