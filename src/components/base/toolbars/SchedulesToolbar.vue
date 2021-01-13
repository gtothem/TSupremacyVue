<template>
  <div>
    <div class="center">
      <v-btn @click="scheduleRun('Run')" class="mx-2" color="primary"
        >Run</v-btn
      >
      <v-btn @click="scheduleRun('Pause')" class="mx-2" color="primary"
        >Pause</v-btn
      >
      <v-btn @click="scheduleRun('Delete')" class="mx-2" color="primary"
        >Delete</v-btn
      >
    </div>
    <v-dialog v-model="dialogWarn" max-width="300">
      <v-card>
        <v-card-title class="headline"> Schedules </v-card-title>
        <v-card-text class="text-center"> No Schedules(s) selected! </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialogWarn = false"> Ok </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import TaskStore from "../taskforms/TaskStore";
export default {
  components: {},
  name: "schedules-toolbar",
  methods: {
    scheduleRun(task) {
      if (Object.keys(this.selected).length == 0) {
        this.dialogWarn = true;
        return;
      }
      this.storedItems.TaskMode = "Schedule";
      this.storedItems.DataList = this.selected;
      TaskStore.stripDataList();
      TaskStore.convertTaskSettings(this.storedItems.TaskSettings);
      TaskStore.stripUser(this.storedItems.User);
      this.storedItems.TaskName = task;
      this.$emit("run:schedule", this.storedItems);
      Object.assign(this.storedItems, TaskStore.resetData());
    },
  },
  created() {},
  data: () => ({
    storedItems: TaskStore.data,
    dialogWarn: false,
  }),
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
</style>