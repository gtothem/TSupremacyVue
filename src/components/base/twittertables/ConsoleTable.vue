<template>
  <div>
    <base-material-card color="primary" class="px-5 py-1">
      <template v-slot:heading>
        <div class="display-2 font-weight-light">Console</div>
      </template>
      <v-card-text>
        <v-data-table
          dense
          v-model="selected"
          :headers="headers"
          :items="$store.state.console"
          class="elevation-1 ml-3"
          ref="consoleTable"
          :itemsPerPage="-1"
          :hide-default-footer="true"
          item-key="index"
          :height="tableHeight"
          fixed-header
        >
          <template v-slot:[`item.time`]="{ item }">
            <span>{{ new Date(item.time).toLocaleString() }}</span>
          </template>
          <template v-slot:[`item.status`]="{ item }">
            <v-icon v-if="item.status === 'Good'" sm color="primary">
              mdi-check-circle
            </v-icon>
            <v-icon v-if="item.status === 'Bad'" sm color="red">
              mdi-alert-circle
            </v-icon>
            {{ item.status }}
          </template>
          <template v-slot:[`item.task`]="{ item }">
            <a @click="viewTask(item.task)" class="ml-1">{{ item.task }}</a>
          </template>
          <template v-slot:[`item.message`]="{ item }">
            <span v-if="idTest(item.message)">
              {{ formatMessage(item.message) }} (<a
                v-if="item.message.includes('Followed ')"
                :href="'https://twitter.com/' + formatMessageU(item.message)"
                target="_blank"
                >{{ formatMessageM(item.message) }}</a
              ><a
                v-if="!item.message.includes('Followed ')"
                :href="
                  'https://twitter.com/' +
                  formatMessageU(item.message) +
                  '/status/' +
                  formatMessageM(item.message)
                "
                target="_blank"
                >{{ formatMessageM(item.message) }}</a
              >)
            </span>
            <span v-else>
              <span v-if="item.message.length < 60">{{ item.message }}</span>
              <span v-else>
                <small>{{ item.message.substring(0, 100) }}</small>
              </span>
            </span>
          </template>

          <template v-slot:[`item.proxy`]="{ item }">
            <country-flag :country="item.proxyCC" size="small" />
            {{ item.proxy }}
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
        this.scrollBottom();
      },
      deep: true,
    },
  },
  methods: {
    idTest(m) {
      if (/\b\d{5}/g.test(m)) {
        return true;
      }
      return false;
    },
    formatMessage(m) {
      return m.replace("(" + m.match(/\b\d+/g) + ")", "");
    },
    formatMessageM(m) {
      return m.match(/\b\d+/g)[0];
    },
    formatMessageU(m) {
      return m.match(/(?<=ed\ )(.*?)(?=\ *\()/g)[0];
    },
    viewTask(t) {
      this.$router.push({
        name: "Task View",
        params: { taskId: t },
      });
    },
    scrollBottom() {
      let table = this.$refs["consoleTable"];
      let wrapper = table.$el.querySelector("div.v-data-table__wrapper");
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
          console.log("Console:", data);
          this.console = data.data;
          this.$store.commit("SET_CONSOLE", data.data);
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
      console: [],
      selected: [],
      headers: [
        {
          text: "TIME",
          align: "start",
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
    itemsPerPage: {
      type: Number,
      default: 10,
      description: "Pagination Items Per Page",
    },
    tableHeight: {
      type: String,
      default: "360px",
      description: "Datatable height",
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
a {
  text-decoration: none;
}
</style>