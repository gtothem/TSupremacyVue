<template>
  <div>
    <base-material-card color="primary" class="px-5 py-3" size="pa-5">
      <template v-slot:heading>
        <v-row>
          <v-col cols="auto">
            <v-icon sm> mdi-account-group</v-icon>
            <span class="display-2 font-weight-light ml-2">
              Likes List ({{ $store.state.likes.length }})
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
          :items="$store.state.likes"
          item-key="id"
          show-select
          class="elevation-1"
          :search="search"
        >
          <template v-slot:[`item.id`]="{ item }">
            <span
              ><a
                :href="
                  'https://twitter.com/' + item.user + '/status/' + item.id
                "
                target="_blank"
                >{{ item.id }}</a
              ></span
            >
          </template>
          <template v-slot:[`item.user`]="{ item }">
            <span
              ><a :href="'https://twitter.com/' + item.user" target="_blank">{{
                item.user
              }}</a></span
            >
          </template>
        </v-data-table>
      </v-card-text>

      <likes-toolbar />
    </base-material-card>
  </div>
</template>

<script>
import likesToolbar from "../toolbars/LikesToolbar";
export default {
  components: { likesToolbar },
  name: "likes-table",
  methods: {
    async getLikesAPI() {
      fetch("https://localhost:44396/TwitterBot/Likes", {
        method: "POST",
        body: this.user.userId,
        credentials: "include",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Likes:", data);
          this.$store.commit("SET_LIKES", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  created() {
    this.getLikesAPI();
  },
  data() {
    return {
      selected: [],
      search: "",
      headers: [
        {
          text: "USER",
          align: "start",
          value: "user",
        },
        { text: "ID", value: "id" },
        { text: "TIME", value: "time" },
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