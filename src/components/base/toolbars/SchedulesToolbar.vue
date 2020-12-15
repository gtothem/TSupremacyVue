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
  </div>
</template>

<script>
import TaskStore from "../taskforms/TaskStore";
export default {
  components: {},
  name: "schedules-toolbar",
  methods: {
    scheduleRun(task) {
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