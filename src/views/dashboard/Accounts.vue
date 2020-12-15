/* eslint no-use-before-define: 0 */  // --> OFF
<template>
  <div>
    <base-material-alert
      v-if="1 === 2"
      color="primary"
      dismissible
      icon="mdi-timer-sand"
      class="center my-2"
      width="75%"
    >
      <v-progress-circular
        :rotate="90"
        :size="30"
        :width="5"
        :value="value"
        color="white"
        class="mr-2"
      >
        <small>{{ value }}</small>
      </v-progress-circular>
      <span>Running - 12s - Follow Search 2/6</span>
    </base-material-alert>

    <accounts :data="accounts" :updating="updating" />
    <br />
    <console :data="console" reqBody="%" :updating="updating" />
  </div>
</template>

<script>
import Accounts from "../../components/base/twittertables/AccountsTable";
import Console from "../../components/base/twittertables/ConsoleTable";
export default {
  components: { Console, Accounts },
  name: "accounts-page",
  created() {
    if (this.$route.params.tasked === true) {
      this.updating = true;
    } else {
      this.updating = false;
    }
    this.getTasks();
  },
  methods: {
    async getTasks() {
      fetch("https://localhost:44396/TwitterBot/Tasks", {
        method: "POST",
        body: "Running",
        credentials: "include",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          console.log(Object.keys(data.data).length);
          if (Object.keys(data.data).length > 0) {
            this.updating = true;
            setTimeout(
              function (scope) {
                scope.getTasks();
              },
              3000,
              this
            );
          } else {
            this.updating = false;
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          this.updating = false;
        });
    },
  },
  data() {
    return {
      updating: false,
      value: 45,
      selected: [],
      accounts: [
        {
          id: 1,
          picture:
            "https://pbs.twimg.com/profile_images/1282372019192041472/j5OEUQJu_normal.jpg",
          username: "zhaky43118143",
          userId: "3301325541",
          proxy: "134.202.250.105:45785",
          status: "Good",
          password: "6jk7W65z0",
          useragent: "Chrome",
          email: "difximyqiiehaldwjc@awdrt.net",
          friends: "442",
          followers: "79",
          statuses: "596",
        },
        {
          id: 7,
          picture: "0",
          username: "testera",
          userId: "0",
          proxy: "Real",
          status: "Good",
          password: "CgYQ9xDX",
          useragent: "Chrome",
          email: "kt7ktkt@hotmail.co.uk",
          friends: "0",
          followers: "0",
          statuses: "0",
        },
      ],
      console: [
        {
          owner: 1,
          time: "11/22/2020 9:01:00 PM",
          message: "Connected",
          account: "zhaky43118143",
          proxy: "134.202.250.105:45785",
          status: "Good",
          task: "like-search-20201122210059",
        },
        {
          owner: 1,
          time: "11/22/2020 9:01:00 PM",
          message: "Search lol",
          account: "zhaky43118143",
          proxy: "134.202.250.105:45785",
          status: "Good",
          task: "like-search-20201122210059",
        },
        {
          owner: 1,
          time: "11/22/2020 9:01:04 PM",
          message: "Liked ArtisticADCxo (1330389061396205568)",
          account: "zhaky43118143",
          proxy: "134.202.250.105:45785",
          status: "Good",
          task: "like-search-20201122210059",
        },
        {
          owner: 1,
          time: "11/22/2020 9:01:05 PM",
          message: "Search Finished lol",
          account: "zhaky43118143",
          proxy: "134.202.250.105:45785",
          status: "Good",
          task: "like-search-20201122210059",
        },
        {
          owner: 1,
          time: "11/22/2020 9:01:05 PM",
          message: "Finished",
          account: "zhaky43118143",
          proxy: "134.202.250.105:45785",
          status: "Good",
          task: "like-search-20201122210059",
        },
      ],
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
  border: 1px solid rgb(0, 77, 128);
}
.blue {
  color: dodgerblue;
  margin-right: 0.2rem;
}
</style>