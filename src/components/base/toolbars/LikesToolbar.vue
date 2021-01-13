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
          @click="runTask(item.title)"
        >
          <v-menu offset-x right open-on-hover close-delay="50">
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-title v-bind="attrs" v-on="on">
                <v-icon color="primary" class="mr-2">{{ item.icon }}</v-icon>
                {{ item.title }}</v-list-item-title
              >
            </template>
          </v-menu>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn rounded color="primary" class="ml-2" @click="saveFile()"
      >Export</v-btn
    >

    <v-dialog v-model="dialogWarn" max-width="300">
      <v-card>
        <v-card-title class="headline"> Likes </v-card-title>
        <v-card-text class="text-center">
          No Likes(s) selected!
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialogWarn = false"> Ok </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  name: "likes-toolbar",
  methods: {
    saveFile: function () {
      let data = JSON.stringify(this.$store.state.followers);
      let blob = new Blob([data], { type: "text/plain" });
      let e = document.createEvent("MouseEvents"),
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
      if (Object.keys(this.selected).length == 0) {
        this.dialogWarn = true;
        return;
      }
      this.$router.push({
        name: "TaskBuilder",
        params: { taskName: action, taskMode: "Now", accounts: this.selected },
      });
    },
  },
  created() {},
  data() {
    return {
      dialogWarn: false,
      items: {
        tasks: [
          {
            title: "Delete",
            icon: "mdi-delete",
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
.tile {
  margin: 5px;
  border-radius: 4px;
}
.tile:hover {
  background: lightblue;
}
</style>