<template>
  <div>
    <base-material-card color="primary" class="px-5 py-3">
      <template v-slot:heading>
        <div class="display-2 font-weight-light">
          Accounts ({{ $store.state.accounts.length }})
        </div>
      </template>
      <v-card-text>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="$store.state.accounts"
          :hide-default-footer="true"
          item-key="id"
          show-select
          class="elevation-1"
        >
          <template v-slot:[`item.username`]="{ item }">
            <b
              ><a @click="viewProfile(item)"
                ><v-avatar size="30px" class="mr-2">
                  <img :src="item.picture" alt="" />
                </v-avatar>
                {{ item.username
                }}</a
              ></b
            >
          </template>
          <template v-slot:[`item.proxy`]="{ item }">
            <country-flag :country="item.proxyCC" size="small" />
            <span class="ml-1">{{ item.proxy }}</span>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <a v-bind="attrs" v-on="on"
                  ><v-icon sm color="primary"> mdi-menu-down</v-icon></a
                >
              </template>
              <v-list>
                <v-list-item
                  v-for="(p, index) in $store.state.proxies"
                  :key="index"
                  @click="updateProxy(item, p.proxy)"
                  class="tile"
                >
                  <v-list-item-title>
                    <v-icon color="primary" class="mr-2">mdi-wifi</v-icon
                    >{{ p.proxy }}</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
          <template v-slot:[`item.status`]="{ item }">
            <span v-if="item.status.includes('/')">
              <v-progress-linear :value="calc(item.status)" height="25">
                <strong>{{ Math.ceil(calc(item.status)) }}%</strong>
              </v-progress-linear>
            </span>
            <span v-if="!item.status.includes('/')">
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
import TaskStore from "../taskforms/TaskStore";
export default {
  components: { AccountsToolbar },
  name: "accounts-table",
  methods: {
    viewProfile(p) {
      console.log(p);
      this.$router.push({
        name: "Profiles",
        params: {
          profile: p,
        },
      });
    },
    calc(status) {
      let num = status.split("/");
      return (num[0] / num[1]) * 100;
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
          console.log("Accounts:", data);
          //this.accounts = data.data;
          this.$store.commit("SET_ACCOUNTS", data.data);

          if (this.updating) {
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
    updateProxy(account, proxy) {
      console.log(account);
      this.storedItems.TaskMode = "Account";
      TaskStore.convertTaskSettings(this.storedItems.TaskSettings);
      this.storedItems.TaskName = "proxyUpdate";
      this.storedItems.User.proxy = proxy;
      this.storedItems.User.username = account.username;
      //TaskStore.stripUserList();
      TaskStore.stripUser(this.storedItems.User);
      console.log(this.storedItems);
      this.addAccounts(this.storedItems);
      Object.assign(this.storedItems, TaskStore.resetData());
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
      storedItems: TaskStore.data,
      selected: [],
      headers: [
        {
          text: "USERNAME",
          align: "start",
          value: "username",
        },
        { text: "PROXY", value: "proxy" },
        { text: "STATUS", value: "status" },
        { text: "FRIENDS", value: "friends" },
        { text: "FOLLOWERS", value: "followers" },
        { text: "STATUSES", value: "statuses" },
      ],
      proxyMenu: [
        {
          title: "Add",
          icon: "mdi-account-plus",
        },
        {
          title: "Delete",
          icon: "mdi-delete",
        },
      ],
    };
  },
  props: {
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
.tile {
  margin: 4px;
  border-radius: 2px;
}
.tile:hover {
  background: lightblue;
}
</style>