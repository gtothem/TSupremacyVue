<template>
  <div>
    <div v-if="taskMode === 'Now'" class="ml-2">
      <v-checkbox
        v-model="storedItems.TaskSettings.nowCheckbox"
        label="Run Now"
      ></v-checkbox>
    </div>

    <div v-if="taskMode === 'Schedule'" class="ml-2">
      <v-tabs
        v-model="tab"
        background-color="primary"
        color="white"
        dark
        icons-and-text
      >
        <v-tabs-slider></v-tabs-slider>
        <v-tab href="#tab-1" class="mx-2">
          Every
          <v-icon sm> mdi-account-group</v-icon>
        </v-tab>

        <v-tab href="#tab-2">
          Once
          <v-icon sm> mdi-account-multiple-plus </v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item :key="1" :value="'tab-1'">
          <v-container class="">
            <v-row no-gutters>
              <v-text-field
                v-model="storedItems.TaskSettings.minutes"
                type="number"
                label="Minutes"
              ></v-text-field>
              <v-text-field
                v-model="storedItems.TaskSettings.randomness"
                type="number"
                label="Randomness"
              ></v-text-field>
            </v-row>

            <v-row>
              <h3 class="ml-3">
                Run every
                {{
                  Number(storedItems.TaskSettings.minutes) -
                  Number(storedItems.TaskSettings.randomness)
                }}
                to
                {{
                  Number(storedItems.TaskSettings.minutes) +
                  Number(storedItems.TaskSettings.randomness)
                }}
                minutes
                <span v-if="storedItems.TaskSettings.betweenCheckbox">
                  between {{ storedItems.TaskSettings.startTime }} and
                  {{ storedItems.TaskSettings.endTime }}</span
                >
              </h3>
            </v-row>
            <v-row no-gutters>
              <v-checkbox
                v-model="storedItems.TaskSettings.betweenCheckbox"
                :label="`Between`"
              ></v-checkbox>
              <v-col cols="auto" :key="1">
                <v-time-picker
                  v-model="storedItems.TaskSettings.startTime"
                  ampm-in-title
                  class="ml-4"
                  :disabled="!storedItems.TaskSettings.betweenCheckbox"
                ></v-time-picker>
              </v-col>
              <v-col cols="auto" :key="2">
                <v-time-picker
                  v-model="storedItems.TaskSettings.endTime"
                  ampm-in-title
                  class="ml-4"
                  :disabled="!storedItems.TaskSettings.betweenCheckbox"
                ></v-time-picker>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
        <v-tab-item :key="2" :value="'tab-2'">
          <v-row>
            <v-date-picker
              v-model="storedItems.TaskSettings.onceDate"
              class="ml-4"
            ></v-date-picker>
            <v-time-picker
              v-model="storedItems.TaskSettings.onceTime"
              ampm-in-title
              class="ml-4"
            ></v-time-picker>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import TaskStore from "./TaskStore";
export default {
  components: {},
  name: "task-timeforms",
  methods: {},
  created() {
    if (this.taskMode === "Now") {
      this.storedItems.TaskSettings.nowCheckbox = true;
    }
  },
  watch: {
    tab: function (val) {
      if (this.taskMode === "Schedule") {
        if (val === 'tab-1') {
          this.storedItems.TaskSettings.everyCheckbox = true;
          this.storedItems.TaskSettings.onceCheckbox = false;
        } else {
          this.storedItems.TaskSettings.onceCheckbox = true;
          this.storedItems.TaskSettings.everyCheckbox = false;
        }
      }
    },
  },
  data: () => ({
    storedItems: TaskStore.data,
    tab: null,
  }),
  props: {
    taskMode: {
      type: String,
      default: "Now",
      description: "Task Mode",
    },
  },
};
</script>

<style scoped>
</style>