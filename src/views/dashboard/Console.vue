/* eslint no-use-before-define: 0 */  // --> OFF
<template>
  <div>
    <console :data="console" reqBody="%" />
  </div>
</template>

<script>
import Console from "../../components/base/twittertables/ConsoleTable";
export default {
  components: { Console },
  name: "console-page",
  data() {
    return {
      singleSelect: false,
      selected: [],
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