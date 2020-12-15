<template>
  <div>
    <base-material-card color="primary" class="px-5 py-3">
      <template v-slot:heading>
          <v-btn @click="$router.go(-1)" x-small text class="mr-2">
              <span> GO BACK </span>
          </v-btn>
        <v-icon sm> mdi-play</v-icon>
        <span class="display-2 font-weight-light ml-2"
          >[{{ data.taskMode }}] [{{ data.name }}] {{ data.id }}</span
        >
        <v-spacer></v-spacer>
      </template>
      <v-card-text>
        <v-row
          ><v-col cols="auto">
            <base-material-card color="primary" class="px-5 py-3" size="pa-2">
              <template v-slot:heading>
                <v-icon sm> mdi-animation-play</v-icon>
                <span class="display-2 font-weight-light ml-2">User List</span>
                <v-spacer></v-spacer>
              </template>
              <v-card-text>
                <table>
                  <tr v-for="item in data.taskItem.userList" :key="item.index">
                    <td class="pl-5">{{ item.username }}</td>
                  </tr>
                </table>
              </v-card-text>
            </base-material-card>
          </v-col>
          <v-col cols="auto">
            <base-material-card color="primary" class="px-5 py-3" size="pa-2">
              <template v-slot:heading>
                <v-icon sm> mdi-animation-play</v-icon>
                <span class="display-2 font-weight-light ml-2"
                  >Task Settings</span
                >
                <v-spacer></v-spacer>
              </template>
              <v-card-text>
                <table>
                  <tr
                    v-for="(item, key) in data.taskItem.taskSettings"
                    :key="item.index"
                  >
                    <td class="px-5">{{ key }}</td>
                    <td class="pl-5">{{ item }}</td>
                  </tr>
                </table>
              </v-card-text>
            </base-material-card>
          </v-col>
          <v-col v-if="data.taskItem.dataList.length > 0" cols="auto">
            <base-material-card color="primary" class="px-5 py-3" size="pa-2">
              <template v-slot:heading>
                <v-icon sm> mdi-animation-play</v-icon>
                <span class="display-2 font-weight-light ml-2">Data List</span>
                <v-spacer></v-spacer>
              </template>
              <v-card-text>
                <table>
                  <tr v-for="item in data.taskItem.dataList" :key="item.index">
                    <td class="pl-5">{{ item }}</td>
                  </tr>
                </table>
              </v-card-text>
            </base-material-card>
          </v-col>
          <v-col v-if="data.taskItem.imageList.length > 0" cols="auto">
            <base-material-card color="primary" class="px-5 py-3">
              <template v-slot:heading>
                <v-icon sm> mdi-animation-play</v-icon>
                <span class="display-2 font-weight-light ml-2">Image List</span>
                <v-spacer></v-spacer>
              </template>
              <v-card-text>
                <table>
                  <tr v-for="item in data.taskItem.imageList" :key="item.index">
                    <td class="pl-5">{{ item }}</td>
                  </tr>
                </table>
              </v-card-text>
            </base-material-card>
          </v-col>
        </v-row>
      </v-card-text>

      <console :headers="headers" :reqBody="this.$route.params.taskId" />
    </base-material-card>
  </div>
</template>

<script>
import Console from "../../components/base/twittertables/ConsoleTable";
export default {
  components: { Console },
  name: "task-view",
  created() {
    this.getReportAPI();
  },
  methods: {
    toTitleCase(str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    },
    async getReportAPI() {
      fetch("https://localhost:44396/TwitterBot/Tasks", {
        method: "POST",
        body: this.$route.params.taskId,
        credentials: "include",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.data = data.data[0];
          console.log("Success2:", this.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  data() {
    return {
      headers: [
        {
          text: "TIME",
          align: "start",
          sortable: true,
          value: "time",
        },
        { text: "TASK", value: "task" },
        { text: "ACCOUNT", value: "account" },
        { text: "PROXY", value: "proxy" },
        { text: "STATUS", value: "status" },
        { text: "MESSAGE", value: "message" },
      ],
      data: [
        {
          id: "Like-Search-20201214184124",
          name: "Like Search",
          status: "Finished",
          time: "12/14/2020 6:41:24 PM",
          taskMode: "Now",
          userList: "zhaky43118143, ",
          taskSettings:
            "",
        },
      ],
    };
  },
  props: {
    taskData: {
      type: Array,
      default: () => [],
      description: "Task object",
    },
  },
};
</script>

<style scoped>
</style>