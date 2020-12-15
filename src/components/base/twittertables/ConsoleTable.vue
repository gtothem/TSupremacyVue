<template>
  <div>
    <base-material-card color="primary" class="px-5 py-3">
      <template v-slot:heading>
        <div class="display-2 font-weight-light">Console</div>
      </template>
      <v-card-text>
        <v-data-table
          dense
          v-model="selected"
          :headers="headers"
          :items="console"
          class="elevation-1 ml-3"
          ref="consoleTable"
          :itemsPerPage="-1"
          :hide-default-footer="true"
          item-key="index"
          height="250px"
          fixed-header
        >
          <template v-slot:[`item.time`]="{ item }">
            <span>{{ new Date(item.time).toLocaleString() }}</span>
          </template>
          <template v-slot:[`item.status`]="{ item }">
            <v-icon sm color="primary"> mdi-check-circle </v-icon>
            {{ item.status }}
          </template>
          <template v-slot:[`item.task`]="{ item }">
            <a
              @click="viewTask(item.task)"
              class="ml-1"
              style="text-decoration: none"
              >{{ item.task }}</a
            >
          </template>
          <template v-slot:[`item.proxy`]="{ item }">
            <country-flag country="gb" size="small" /> {{ item.proxy }}
          </template>
        </v-data-table>
      </v-card-text>
    </base-material-card>
  </div>
</template>

<script>
export default {
  name: "console-table",
  watch: {
    console: {
      handler: function () {
        setTimeout(() => {
          this.scrollBottom();
        }, 500);
      },
      deep: true,
    },
  },
  methods: {
    viewTask(t) {
      console.log(t);
      this.$router.push({
        name: "Task View",
        params: { taskId: t },
      });
    },
    scrollBottom() {
      var table = this.$refs["consoleTable"];
      var wrapper = table.$el.querySelector("div.v-data-table__wrapper");
      wrapper.scrollTop = wrapper.scrollHeight;
    },
    async getConsoleAPI() {
      console.log(this.updating);
      fetch("https://localhost:44396/TwitterBot/Console", {
        method: "POST",
        body: this.reqBody,
        credentials: "include",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.console = data.data;
          if (this.updating === true) {
            setTimeout(
              function (scope) {
                scope.getConsoleAPI();
              },
              1500,
              this
            );
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  created() {
    this.getConsoleAPI();
  },
  data() {
    return {
      console: this.data,
      selected: [],
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
    reqBody: {
      type: String,
      default: "%",
      description: "Console request body",
    },
    updating: {
      type: Boolean,
      default: false,
      description: "Continual updates",
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
</style>