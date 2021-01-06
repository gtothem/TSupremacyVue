<template>
  <v-stepper v-model="e6" col vertical>
    <v-stepper-step :complete="e6 > 1" step="1"> Preview </v-stepper-step>

    <v-stepper-content step="1">
      <!-- Task Select -->
      <div class="display-2 font-weight-light">
        {{ this.$route.params.taskName }}
      </div>
      <br />
      <div class="ml-8">
        <v-list>
          <v-list-item
            v-for="(item, index) in this.$route.params.accounts"
            :key="index"
          >
            <v-icon color="primary" class="mr-1">mdi-account</v-icon>
            <v-list-item-title>{{ item.username }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
      <br />
      <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
      <v-btn @click="$router.go(-1)" text>Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 2" step="2"
      >Configure settings</v-stepper-step
    >
    <v-stepper-content step="2">
      <div class="ml-2">
        <v-text-field
          v-if="this.$route.params.taskMode === 'Schedule'"
          v-model="storedItems.TaskSettings.scheduleName"
          label="Schedule Name"
          required
          style="width: 300px"
        ></v-text-field>
        <task-form v-if="hideBind" :task="this.$route.params.taskName" />
      </div>
      <v-btn
        color="primary"
        @click="
          e6 = 3;
          hideBind = false;
        "
        >Continue</v-btn
      >
      <v-btn text @click="e6 = 1">Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 3" step="3"
      >Select a time format</v-stepper-step
    >
    <v-stepper-content step="3">
      <!-- Time Run Options -->
      <task-time-form :taskMode="this.$route.params.taskMode" />

      <v-btn color="primary" @click="summary()">Continue</v-btn>
      <v-btn
        text
        @click="
          e6 = 2;
          hideBind = true;
        "
        >Cancel</v-btn
      >
    </v-stepper-content>

    <v-stepper-step step="4">View summary</v-stepper-step>
    <!-- Confirmation -->
    <v-stepper-content step="4"
      ><vue-json-pretty
        :path="'res'"
        :data="storedItems"
        :showSelectController="true"
        :highlightMouseoverNode="true"
      >
      </vue-json-pretty>
      <br />
      <v-btn color="primary" @click="runTaskAPI()">Complete</v-btn>
      <v-btn text @click="e6 = 3">Cancel</v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
import TaskForm from "../../components/base/taskforms/TaskForm";
import TaskTimeForm from "../../components/base/taskforms/TaskTimeForm";
import TaskStore from "../../components/base/taskforms/TaskStore";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
export default {
  components: { TaskForm, TaskTimeForm, VueJsonPretty },
  name: "taskbuilder-page",
  props: {},
  created() {
    Object.assign(this.storedItems, TaskStore.resetData());
    this.storedItems.TaskMode = this.$route.params.taskMode;
    this.storedItems.TaskName = this.$route.params.taskName;
    this.storedItems.UserList = this.$route.params.accounts;
    TaskStore.stripUserList();
    TaskStore.stripUser(this.storedItems.User);
    if (this.$route.params.taskMode === "Schedule") {
      this.storedItems.TaskSettings.scheduleName =
        this.$route.params.taskName + "-" + Date.now();
    }
  },
  methods: {
    summary() {
      TaskStore.convertTaskSettings(this.storedItems.TaskSettings);
      console.log(this.storedItems.TaskSettings.count);
      console.log(this.storedItems.TaskSize);
      if (this.storedItems.TaskSettings.count != null) {
        if (Object.values(this.storedItems.TaskSettings.count).includes("-")) {
          this.storedItems.TaskSize =
            this.storedItems.TaskSettings.count.split("-")[1] *
            this.storedItems.UserList.length;
        } else {
          this.storedItems.TaskSize =
            this.storedItems.TaskSettings.count *
            this.storedItems.UserList.length;
        }
      }
      this.e6 = 4;
    },
    async runTaskAPI() {
      console.log(JSON.stringify(this.storedItems));
      fetch("https://localhost:44396/TwitterBot/RunTask", {
        method: "POST",
        body: JSON.stringify(this.storedItems),
        credentials: "include",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          console.log(this.$route.params.taskMode);

          if (this.$route.params.taskMode === "Now") {
            this.$router.push({
              name: "Accounts",
              params: {
                tasked: true,
              },
            });
          } else if (this.$route.params.taskMode === "Schedule") {
            this.$router.push({
              name: "Schedules",
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  data() {
    return {
      e6: 1,
      storedItems: TaskStore.data,
      hideBind: true,
    };
  },
};
</script>

<style scoped>
</style>