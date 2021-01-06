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
    <div v-if="task === 'Like-Single'">
      <v-text-field
        v-model="storedItems.TaskSettings.targetid"
        label="ID"
        required
        style="width: 300px"
      ></v-text-field>
    </div>

    <!-- SINGLE USER +unfollow -->
    <div v-if="task === 'Follow-Single'">
      <v-text-field
        v-model="storedItems.TaskSettings.targetid"
        label="User"
        required
        style="width: 300px"
      ></v-text-field>
    </div>
    
    <!-- COUNT INPUT -->
    <div v-if="task === 'Unfollow-Nonfollowers'">
      <v-slider
          v-model="storedItems.TaskSettings.count"
          class="align-center"
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
  created() {
      console.log(this.task);
      if (this.task === "Sync-Update") {
      console.log('taskseize');
          this.storedItems.TaskSize = 6;
      }
  },
  data: () => ({
    storedItems: TaskStore.data,
    min: 1,
    max: 100,
    valid: false,
    firstname: "",
    lastname: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length <= 10 || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
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