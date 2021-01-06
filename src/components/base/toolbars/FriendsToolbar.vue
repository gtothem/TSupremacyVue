<template>
    <div class="center">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn rounded class="mx-2" color="primary" v-bind="attrs" v-on="on">
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

      <v-btn rounded color="primary" class="ml-2" @click="saveFile()"
        >Export</v-btn
      >
    </div>
</template>

<script>
export default {
  components: {},
  name: "friends-toolbar",
  methods: {
    saveFile: function () {
      const data = JSON.stringify(this.$store.state.friends);
      const blob = new Blob([data], { type: "text/plain" });
      const e = document.createEvent("MouseEvents"),
        a = document.createElement("a");
      a.download = "test.json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
      e.initEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      a.dispatchEvent(e);
    },
    runTask(action) {
      this.$router.push({
        name: "TaskBuilder",
        params: { taskName: action, taskMode: "Now", accounts: this.selected },
      });
    },
    runSchedule(action) {
      this.$router.push({
        name: "TaskBuilder",
        params: {
          taskName: action,
          taskMode: "Schedule",
          accounts: this.selected,
        },
      });
    },
  },
  created() {},
  data() {
    return {
      items: {
        tasks: [
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