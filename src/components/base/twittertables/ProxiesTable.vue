<template>
  <div>
    <base-material-card color="primary" class="px-5 py-3">
      <template v-slot:heading>
        <div class="display-2 font-weight-light">Proxy List ({{ proxies.length }})</div>
      </template>
      <v-card-text>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="proxies"
          :hide-default-footer="true"
          item-key="id"
          show-select
          class="elevation-1"
        >
        
          <template v-slot:[`item.proxy`]="{ item }">
            <v-icon sm color="primary"> mdi-power-plug </v-icon>
            {{ item.proxy }}
          </template>

          <template v-slot:[`item.status`]="{ item }">
            <v-icon sm color="primary">
              {{ formatStatus(item.status) }}
            </v-icon>
            {{ item.status }}
          </template>

          <template v-slot:[`item.latency`]="{ item }">
            <v-icon sm color="primary"> mdi-wifi </v-icon>
            {{ item.latency }}
          </template>

          <template v-slot:[`item.country`]="{ item }">
            <country-flag :country="item.country" size="small" />
            {{ item.country }}
          </template>
        </v-data-table>
      </v-card-text>

      <proxies-toolbar
        :selected="selected"
        @run:proxy="runProxy"
        @add:proxy="addProxy"
      />
    </base-material-card>
  </div>
</template>

<script>
import ProxiesToolbar from "../toolbars/ProxiesToolbar";
export default {
  components: { ProxiesToolbar },
  name: "proxies-table",
  methods: {
    formatStatus(status) {
      switch (status) {
        case "Good":
          return "mdi-check-circle";
        case "Testing":
          setTimeout(
            function (scope) {
              scope.getProxiesAPI();
            },
            500,
            this
          );
          return "mdi-alert-circle";
        case "Queued":
          return "fa fa-heart blue";
      }
    },
    async getProxiesAPI() {
      fetch("https://localhost:44396/TwitterBot/Proxy", {
        method: "POST",
        body: "",
        credentials: "include",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.proxies = data.data;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    async runProxy(storedItems) {
      fetch("https://localhost:44396/TwitterBot/RunTask", {
        method: "POST",
        body: JSON.stringify(storedItems),
        credentials: "include",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.getProxiesAPI();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    async addProxy(storedItems) {
      if (storedItems.TaskName === "proxyDelete") {
        this.selected = [];
      }
      fetch("https://localhost:44396/TwitterBot/Accounts", {
        method: "POST",
        body: JSON.stringify(storedItems),
        credentials: "include",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.getProxiesAPI();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  created() {
    this.getProxiesAPI();
  },
  data() {
    return {
      proxies: this.data,
      selected: [],
      headers: [
        {
          text: "PROXY",
          align: "start",
          sortable: false,
          value: "proxy",
        },
        { text: "STATUS", value: "status" },
        { text: "COUNTRY", value: "country" },
        { text: "LATENCY", value: "latency" },
        { text: "USER", value: "user" },
        { text: "PASS", value: "pass" },
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
  border: 1px solid rgb(0, 77, 128);
}
.blue {
  color: dodgerblue;
  margin-right: 0.2rem;
}
</style>