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

    <v-dialog v-model="dialogWarn" max-width="300">
      <v-card>
        <v-card-title class="headline"> Activity </v-card-title>
        <v-card-text class="text-center">
          No Activity(s) selected!
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
  name: "activity-toolbar",
  methods: {
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
            title: "Undo",
            icon: "mdi-undo",
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