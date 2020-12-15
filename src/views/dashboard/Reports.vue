/* eslint no-use-before-define: 0 */  // --> OFF
<template>
  <div>
    <reports :data="reports" :itemsPerPage="15" />
  </div>
</template>

<script>
import Reports from "../../components/base/twittertables/ReportsTable";
export default {
  components: { Reports },
  name: "console-page",
  data() {
    return {
      singleSelect: false,
      selected: [],
      reports: [
        {
          id: "proxy-test-20201010021624",
          name: "proxy-test",
          status: "Running",
          time: "10/10/2020 2:16:24 AM",
          taskMode: "Now",
          userList: "",
          taskSettings: "{\u0022proxy\u0022:\u0022Real\u0022}",
        },
        {
          id: "proxy-test-20201010021459",
          name: "proxy-test",
          status: "Running",
          time: "10/10/2020 2:14:59 AM",
          taskMode: "Now",
          userList: "",
          taskSettings: "{\u0022proxy\u0022:\u0022Real\u0022}",
        },
        {
          id: "proxy-test-20201010021454",
          name: "proxy-test",
          status: "Running",
          time: "10/10/2020 2:14:54 AM",
          taskMode: "Now",
          userList: "",
          taskSettings: "{\u0022proxy\u0022:\u0022Real\u0022}",
        },
        {
          id: "unfollow-nonfollowers-20201010234708",
          name: "unfollow-nonfollowers",
          status: "Finished",
          time: "10/10/2020 11:47:08 PM",
          taskMode: "Now",
          userList: ", ",
          taskSettings: "{\u0022count\u0022:\u00224\u0022}",
        },
        {
          id: "unfollow-nonfollowers-20201010234652",
          name: "unfollow-nonfollowers",
          status: "Finished",
          time: "10/10/2020 11:46:52 PM",
          taskMode: "Now",
          userList: ", ",
          taskSettings: "{\u0022count\u0022:\u00223\u0022}",
        },
        {
          id: "sync-update-20201010234435",
          name: "sync-update",
          status: "Finished",
          time: "10/10/2020 11:44:35 PM",
          taskMode: "Now",
          userList: ", ",
          taskSettings: "{}",
        },
        {
          id: "proxy-test-20201010234211",
          name: "proxy-test",
          status: "Running",
          time: "10/10/2020 11:42:11 PM",
          taskMode: "Now",
          userList: "",
          taskSettings: "{\u0022proxy\u0022:\u0022Real\u0022}",
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