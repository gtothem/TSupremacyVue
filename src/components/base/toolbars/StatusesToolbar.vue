<template>
  <div>
    <div class="center">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mx-2" color="primary" v-bind="attrs" v-on="on">
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

      <v-btn color="primary" class="ml-2" @click="runSchedule('Tweet-Single')">Export</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  name: "statuses-toolbar",
  methods: {
    runTask(action) {
      this.$router.push({
        name: "TaskBuilder",
        params: { taskName: action, taskMode: 'Now', accounts: this.selected },
      });
    },
    runSchedule(action) {
      this.$router.push({
        name: "TaskBuilder",
        params: { taskName: action, taskMode: 'Schedule', accounts: this.selected },
      });
    },
  },
  created() {},
  data() {
    return {
      items: {
        tasks: [
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
        ],
      },
    };
  },
  props: {
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