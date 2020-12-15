<template>
  <div>
    <base-material-card color="primary" class="px-5 py-3">
      <template v-slot:heading>
        <div class="display-2 font-weight-light">
          Reports ({{ reports.length }})
        </div>
      </template>
      <v-card-text>
        <v-data-table
          dense
          v-model="selected"
          :headers="headers"
          :items="reports"
          class="elevation-1 ml-3"
          :itemsPerPage="itemsPerPage"
        >
          <template v-slot:[`item.id`]="{ item }">
            <v-icon sm color="primary"> mdi-check-circle </v-icon>
            <a @click="viewTask(item.id)" style="text-decoration: none" class="ml-2">{{
              item.id
            }}</a>
          </template>
          <template v-slot:[`item.name`]="{ item }">
            <v-icon sm color="primary" class="mr-1">
              {{ formatTask(item.name) }}
            </v-icon>
            {{ item.name }}
          </template>

          <template v-slot:[`item.time`]="{ item }">
            <span>{{ new Date(item.time).toLocaleString() }}</span>
          </template>
        </v-data-table>
      </v-card-text>
    </base-material-card>
  </div>
</template>

<script>
export default {
  name: "report-table",
  methods: {
    viewTask(t) {
      console.log(t);
      this.$router.push({
        name: "Task View",
        params: { taskId: t },
      });
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
        case "Repky":
          return "mdi-message-reply-text";
        case "Like":
          return "mdi-thumb-up";
        case "Follow":
          return "mdi-account-multiple-plus";
        case "Unfollow":
          return "mdi-account-multiple-minus";
        case "Proxy":
          return "mdi-wifi";
      }
    },
    async getReportsAPI() {
      fetch("https://localhost:44396/TwitterBot/Tasks", {
        method: "POST",
        body: "%",
        credentials: "include",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.reports = data.data;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  created() {
    this.getReportsAPI();
  },
  data() {
    return {
      reports: this.data,
      selected: [],
      headers: [
        {
          text: "ID",
          align: "start",
          value: "id",
        },
        { text: "TASK", value: "name" },
        { text: "TIME", value: "time" },
      ],
    };
  },
  props: {
    data: {
      type: Array,
      default: () => [],
      description: "Table data",
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