<template>
  <div>
    <div class="center">
      <!-- TASK MENU -->
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn rounded color="primary" v-bind="attrs" v-on="on">
            Tasks
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items.tasks"
            :key="index"
            link
            class="tile"
          >
            <v-menu offset-x right open-on-hover close-delay="50">
              <template v-slot:activator="{ on, attrs }">
                <v-list-item-title @click.stop.prevent v-bind="attrs" v-on="on">
                  <v-icon color="primary" class="mr-2">{{ item.icon }}</v-icon>
                  {{ item.title }}</v-list-item-title
                >
              </template>
              <v-list>
                <v-list-item
                  v-for="(subitem, index) in item.subitems"
                  :key="index"
                  class="tile"
                  @click="runTask(item.title + '-' + subitem.title)"
                >
                  <v-icon color="primary" class="mr-2">{{
                    subitem.icon
                  }}</v-icon>
                  <v-list-item-title>{{ subitem.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn rounded color="primary" class="ml-2" @click="runSchedule('Tweet-Single')">Export</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  name: "friends-toolbar",
  methods: {
    runTask(action) {
      this.$router.push({
        name: "Stepper",
        params: { taskName: action, taskMode: 'Now', accounts: this.selected },
      });
    },
    runSchedule(action) {
      this.$router.push({
        name: "Stepper",
        params: { taskName: action, taskMode: 'Schedule', accounts: this.selected },
      });
    },
    OpenModal() {
      if (this.showModal === false) {
        this.showModal = true;
      } else {
        this.showModal = false;
      }
    },
  },
  created() {},
  data() {
    return {
      accounts: this.data,
      showModal: false,
      menuItems: {
        accounts: [{ title: "Add" }, { title: "Delete" }],
      },
      items: {
        accounts: [
          {
            title: "Tweet",
            icon: "mdi-comment-edit",
            subitems: [
              { title: "Single", icon: "mdi-comment-edit" },
              { title: "List", icon: "mdi-format-list-checks" },
              { title: "Image", icon: "mdi-image" },
            ],
          },
        ],
        tasks: [
          {
            title: "Tweet",
            icon: "mdi-comment-edit",
            subitems: [
              { title: "Single", icon: "mdi-comment-edit" },
              { title: "List", icon: "mdi-format-list-checks" },
              { title: "Search", icon: "mdi-text-box-search" },
            ],
          },
          {
            title: "Retweet",
            icon: "mdi-twitter-retweet",
            subitems: [
              { title: "Single", icon: "mdi-twitter-retweet" },
              { title: "List", icon: "mdi-format-list-checks" },
              { title: "Search", icon: "mdi-text-box-search" },
            ],
          },
          {
            title: "Reply",
            icon: "mdi-message-reply-text",
            subitems: [
              { title: "Single", icon: "mdi-message-reply-text" },
              { title: "List", icon: "mdi-format-list-checks" },
              { title: "Search", icon: "mdi-text-box-search" },
            ],
          },
          {
            title: "Like",
            icon: "mdi-thumb-up",
            subitems: [
              { title: "Single", icon: "mdi-message-reply-text" },
              { title: "List", icon: "mdi-format-list-checks" },
              { title: "Search", icon: "mdi-text-box-search" },
            ],
          },
          {
            title: "Follow",
            icon: "mdi-account-multiple-plus",
            subitems: [
              { title: "Single", icon: "mdi-message-reply-text" },
              { title: "List", icon: "mdi-format-list-checks" },
              { title: "Search", icon: "mdi-text-box-search" },
            ],
          },
          {
            title: "Unfollow",
            icon: "mdi-account-multiple-minus",
            subitems: [
              { title: "Single", icon: "mdi-message-reply-text" },
              { title: "List", icon: "mdi-format-list-checks" },
              { title: "Filter", icon: "mdi-filter" },
            ],
          },
        ],
      },
    };
  },
  props: {
    data: {
      type: Array,
      default: () => [],
      description: "Table data",
    },
    selected: {
      type: Array,
      default: () => [],
      description: "Selected items",
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
button {
  margin: 0 0.5rem 0 0;
  border: 1px solid rgb(0, 77, 128);
}
.tile {
  margin: 5px;
  border-radius: 4px;
}
.tile:hover {
  background: lightblue;
}
</style>