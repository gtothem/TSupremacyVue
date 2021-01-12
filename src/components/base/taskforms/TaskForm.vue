<template>
  <div>
    <!-- TWEET -->
    <div v-if="task === 'Tweet-Single'">
      <v-textarea
        v-model="storedItems.TaskSettings.message"
        color="primary"
        label="Tweet Message"
      />
    </div>

    <!-- SEARCH -->
    <div v-if="itemContains('Search')">
      <search-input :task="task" />
    </div>

    <!-- LIST -->
    <div v-if="itemContains('List')">
      <list-input />
    </div>

    <!-- SINGLE ID +retweet -->
    <div v-if="task === 'Like-Single' || task === 'Retweet-Single'">
      <v-text-field
        v-model="storedItems.TaskSettings.targetid"
        label="ID"
        required
        style="width: 300px"
      ></v-text-field>
    </div>

    <!-- SINGLE USER +unfollow -->
    <div v-if="task === 'Follow-Single' || task === 'Unfollow-Single'">
      <v-text-field
        v-model="storedItems.TaskSettings.targetid"
        label="User"
        required
        style="width: 300px"
      ></v-text-field>
    </div>

    <!-- COUNT INPUT -->
    <div v-if="task === 'Unfollow-Nonfollowers' || task === 'Like-Delete'">
      <v-row>
        <v-col cols="auto">
          <v-slider
            v-if="rangeCount !== true"
            v-model="storedItems.TaskSettings.count"
            class="align-center mt-2"
            max="100"
            min="0"
            label="Amount"
            style="width: 300px"
          >
            <template v-slot:append>
              <v-text-field
                v-model="storedItems.TaskSettings.count"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                style="width: 45px"
              ></v-text-field>
            </template>
          </v-slider>
          <v-range-slider
            v-if="rangeCount === true"
            v-model="storedItems.TaskSettings.countRange"
            :max="max"
            :min="min"
            hide-details
            class="align-center mt-2"
            style="width: 300px"
          >
            <template v-slot:prepend>
              <v-text-field
                :value="storedItems.TaskSettings.countRange[0]"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                style="width: 60px"
                @change="$set(storedItems.TaskSettings.countRange, 0, $event)"
              ></v-text-field>
            </template>
            <template v-slot:append>
              <v-text-field
                :value="storedItems.TaskSettings.countRange[1]"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                style="width: 60px"
                @change="$set(storedItems.TaskSettings.countRange, 1, $event)"
              ></v-text-field>
            </template>
          </v-range-slider>
        </v-col>
        <v-col>
          <v-checkbox
            v-model="rangeCount"
            hide-details
            label="Range"
          ></v-checkbox>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import TaskStore from "./TaskStore";
import SearchInput from "./SearchInput";
import ListInput from "./ListInput";
export default {
  components: { SearchInput, ListInput },
  name: "task-forms",
  methods: {
    itemContains(item) {
      return this.task.includes(item);
    },
  },
  watch: {
    rangeCount: {
      handler: function () {
        if (this.rangeCount === true) {
          this.storedItems.TaskSettings.countRange = [1, 10];
        } else {
          this.storedItems.TaskSettings.countRange = null;
        }
      },
      deep: true,
    },
  },
  created() {
    console.log(this.task);
    if (this.task === "Sync-Update") {
      console.log("taskseize");
      this.storedItems.TaskSize = 6;
    }
  },
  data: () => ({
    storedItems: TaskStore.data,
    min: 1,
    max: 100,
    rangeCount: false,
  }),
  props: {
    task: {
      type: String,
      default: "",
      description: "Task Name",
    },
  },
};
</script>

<style scoped>
</style>