<template>
  <div>
    <base-material-card color="primary" class="px-5 py-3">
      <template v-slot:heading>
        <div class="display-2 font-weight-light">
          Accounts ({{ accounts.length }})
        </div>
      </template>
      <v-card-text>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="accounts"
          :hide-default-footer="true"
          item-key="id"
          show-select
          class="elevation-1"
        >
          <template v-slot:[`item.username`]="{ item }">
            <b
              ><a href="#" style="text-decoration: none"
                ><v-avatar size="30px" class="mr-2">
                  <img :src="item.picture" alt="" />
                </v-avatar>
                {{ item.username }}</a
              ></b
            >
          </template>
          <template v-slot:[`item.proxy`]="{ item }">
            <country-flag country="gb" size="small" />
            {{ item.proxy }}
          </template>
          <template v-slot:[`item.status`]="{ item }">
            <span v-if="formatStatus(item.status)">
              <v-progress-linear :value="calc(item.status)" height="25">
                <strong>{{ Math.ceil(calc(item.status)) }}%</strong>
              </v-progress-linear>
            </span>
            <span v-if="!formatStatus(item.status)">
              <v-icon sm color="primary"> mdi-check-circle </v-icon>
              {{ item.status }}
            </span>
          </template>
          <template v-slot:[`item.friends`]="{ item }">
            <v-icon sm color="primary"> mdi-account-group</v-icon>
            {{ item.friends }}
          </template>
          <template v-slot:[`item.followers`]="{ item }">
            <v-icon sm color="primary"> mdi-account-multiple-plus </v-icon>
            {{ item.followers }}
          </template>
          <template v-slot:[`item.statuses`]="{ item }">
            <v-icon sm color="primary"> mdi-comment-edit </v-icon>
            {{ item.statuses }}
          </template>
        </v-data-table>
      </v-card-text>

      <accounts-toolbar
        :selected="selected"
        @add:account="addAccounts"
        @delete:account="addAccounts"
      />
    </base-material-card>
  </div>
</template>

<script>
import AccountsToolbar from "../toolbars/AccountsToolbar";
export default {
  components: { AccountsToolbar },
  name: "accounts-table",
  methods: {
    calc(status) {
      let num = status.split("/");
      return (num[0] / num[1]) * 100;
    },
    formatStatus(status) {
      if (status.includes("/")) {
        return true;
      }
      return false;
    },
    async getAccountsAPI() {
      fetch("https://localhost:44396/TwitterBot/AccountList", {
        method: "POST",
        body: "",
        credentials: "include",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.accounts = data.data;

          if (this.updating === true) {
            setTimeout(
              function (scope) {
                scope.getAccountsAPI();
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
    async addAccounts(storedItems) {
      fetch("https://localhost:44396/TwitterBot/Accounts", {
        method: "POST",
        body: JSON.stringify(storedItems),
        credentials: "include",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.getAccountsAPI();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  created() {
    this.getAccountsAPI();
    console.log(this.$store.state.barImage);

    if (this.$route.params.tasked === true) {
      setTimeout(
        function (scope) {
          scope.getAccountsAPI();
        },
        1000,
        this
      );
    }
  },
  data() {
    return {
      accounts: this.data,
      selected: [],
      showModal: false,
      headers: [
        {
          text: "USERNAME",
          align: "start",
          sortable: false,
          value: "username",
        },
        { text: "PROXY", value: "proxy" },
        { text: "STATUS", value: "status" },
        { text: "FRIENDS", value: "friends" },
        { text: "FOLLOWERS", value: "followers" },
        { text: "STATUSES", value: "statuses" },
      ],
      menuItems: {
        accounts: [{ title: "Add" }, { title: "Delete" }],
      },
    };
  },
  props: {
    data: {
      type: Array,
      default: () => [],
      description: "Table data",
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
  padding: 10px;
}
</style>