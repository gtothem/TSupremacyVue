<template>
  <div>
    <base-material-card color="primary" class="px-5 py-3" size="pa-5">
      <template v-slot:heading>
        <v-row>
          <v-col cols="auto">
            <v-icon sm> mdi-account-group</v-icon>
            <span class="display-2 font-weight-light ml-2">
              Statuses List ({{ $store.state.statuses.length }})
            </span>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              clearable
              style="display: inline"
            ></v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn small outlined rounded>Filters</v-btn>
          </v-col>
        </v-row>
      </template>
      <v-card-text>
        <v-data-table
          dense
          v-model="selected"
          :headers="headers"
          :items="$store.state.statuses"
          item-key="id"
          show-select
          class="elevation-1"
          :search="search"
        >
          <template v-slot:[`item.id`]="{ item }">
            <span
              ><a
                :href="
                  'https://twitter.com/' + item.username + '/status/' + item.id
                "
                target="_blank"
                >{{ item.id }}</a
              ></span
            >
          </template>

          <template v-slot:[`item.created`]="{ item }">
            <span>{{ new Date(item.created).toLocaleString() }}</span>
          </template>

          <template v-slot:[`item.fullText`]="{ item }">
            <small v-if="item.fullText.length > 100">{{
              item.fullText
            }}</small>
            <span v-if="item.fullText.length < 100">{{ item.fullText }}</span>
          </template>
        </v-data-table>
      </v-card-text>

      <statuses-toolbar />
    </base-material-card>
  </div>
</template>

<script>
import statusesToolbar from "../toolbars/StatusesToolbar";
export default {
  components: { statusesToolbar },
  name: "statuses-table",
  methods: {
    formatStatus(status) {
      switch (status) {
        case "Good":
          return "fa fa-check-circle blue";
        case "Paused":
          return "fa fa-pause blue";
        case "Queued":
          return "fa fa-heart blue";
      }
    },
    async getstatusesAPI() {
      fetch("https://localhost:44396/TwitterBot/Statuses", {
        method: "POST",
        body: this.user.userId,
        credentials: "include",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Statuses:", data);
          //this.friends = data.data;
          this.$store.commit("SET_STATUSES", data.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  created() {
    this.getstatusesAPI();
    console.log(this.user);
  },
  data() {
    return {
      statuses: [],
      selected: [],
      search: "",
      headers: [
        {
          text: "ID",
          align: "start",
          value: "id",
        },
        { text: "CREATED", value: "created" },
        { text: "TEXT", value: "fullText" },
        { text: "LIKES", value: "like" },
        { text: "COMMENTS", value: "reply" },
        { text: "RETWEETS", value: "retweet" },
      ],
    };
  },
  props: {
    user: {
      type: Object,
      default: () => [],
      description: "User data",
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
a {
  text-decoration: none;
}
</style>