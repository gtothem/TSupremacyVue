<template>
  <div>
    <div class="center">
      <v-btn @click.stop="dialog = true" class="mx-2" color="primary"
        >Add</v-btn
      >
      <v-btn @click="proxyRun('Proxy-Test')" class="mx-2" color="primary"
        >Test</v-btn
      >
      <v-btn @click="proxyAdd('proxyDelete')" class="mx-2" color="primary"
        >Delete</v-btn
      >
    </div>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline"> Enter Proxy Info </v-card-title>
        <v-card-text>
          <v-container class="">
            <v-text-field
              v-model="storedItems.TaskSettings.proxyProxy"
              type="text"
              label="Proxy"
            ></v-text-field>
            <v-text-field
              v-model="storedItems.TaskSettings.proxyUser"
              type="text"
              label="User (optional)"
            ></v-text-field>
            <v-text-field
              v-model="storedItems.TaskSettings.proxyPass"
              type="text"
              label="Pass (optional)"
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false"> Cancel </v-btn>
          <v-btn
            color="primary"
            @click="
              dialog = false;
              proxyAdd('proxyAdd');
            "
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import TaskStore from "../taskforms/TaskStore";
export default {
  components: {},
  name: "proxies-toolbar",
  methods: {
    proxyRun(task) {
      this.selected.forEach((value, index) => {          
        console.log(value.id);
        this.$store.state.proxies.find(x => x.id === value.id).status = "Testing";
      });
      this.storedItems.TaskMode = "Proxy";
      this.storedItems.DataList = this.selected;
      TaskStore.stripDataListProxy();
      TaskStore.convertTaskSettings(this.storedItems.TaskSettings);
      TaskStore.stripUser(this.storedItems.User);
      this.storedItems.TaskName = task;
      this.$emit("run:proxy", this.storedItems);
      Object.assign(this.storedItems, TaskStore.resetData());
    },
    proxyAdd(task) {
      this.storedItems.TaskMode = "Proxy";
      this.storedItems.DataList = this.selected;
      TaskStore.stripDataList();
      TaskStore.convertTaskSettings(this.storedItems.TaskSettings);
      TaskStore.stripUser(this.storedItems.User);
      this.storedItems.TaskName = task;
      this.$emit("add:proxy", this.storedItems);
      Object.assign(this.storedItems, TaskStore.resetData());
    },
  },
  created() {},
  data: () => ({
    storedItems: TaskStore.data,
    dialog: false,
    proxyProxy: null,
    proxyUser: null,
    proxyPass: null,
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