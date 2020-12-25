<template>
  <div>
    <v-row no-gutters>
      <v-col cols="4" flat color="transparent">
        <v-text-field
          v-model="storedItems.TaskSettings.searchTerm"
          color="primary"
          label="Search Term"
          prepend-icon="mdi-comment-search"
          style="width: 300px"
        />
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="3" class="pr-4">
        <v-slider
          v-model="storedItems.TaskSettings.count"
          class="align-center"
          :max="max"
          :min="min"
          hide-details
          label="Count"
          style="width: 300px"
        >
          <template v-slot:append>
            <v-text-field
              v-model="storedItems.TaskSettings.count"
              class=""
              hide-details
              single-line
              type="number"
              style="width: 50px"
            ></v-text-field>
          </template>
        </v-slider>
      </v-col>
    </v-row>
    <!--chanecs-->
    <v-row>
      <v-switch
        v-model="additonalSwitch"
        label="Additional Options"
        class="ml-4"
      ></v-switch>
    </v-row>
    <v-row v-if="additonalSwitch">
      <v-col cols="3" class="pr-4">
        <v-slider
          v-model="storedItems.TaskSettings.likeChance"
          class="align-center"
          max="100"
          min="0"
          hide-details
          label="Like Chance"
          style="width: 300px"
        >
          <template v-slot:append>
            <v-text-field
              class="mt-0 pt-0"
              hide-details
              single-line
              type="text"
              style="width: 45px"
              :value="storedItems.TaskSettings.likeChance + '%'"
            ></v-text-field>
          </template>
        </v-slider>
        <v-slider
          v-model="storedItems.TaskSettings.replyChance"
          class="align-center"
          max="100"
          min="0"
          hide-details
          label="Reply Chance"
          style="width: 300px"
        >
          <template v-slot:append>
            <v-text-field
              class="mt-0 pt-0"
              hide-details
              single-line
              type="text"
              style="width: 45px"
              :value="storedItems.TaskSettings.replyChance + '%'"
            ></v-text-field>
          </template>
        </v-slider>
        <v-slider
          v-model="storedItems.TaskSettings.followChance"
          class="align-center"
          max="100"
          min="0"
          hide-details
          label="Follow Chance"
          style="width: 300px"
        >
          <template v-slot:append>
            <v-text-field
              class="mt-0 pt-0"
              hide-details
              single-line
              type="text"
              style="width: 45px"
              :value="storedItems.TaskSettings.followChance + '%'"
            ></v-text-field>
          </template>
        </v-slider>
        <v-slider
          v-model="storedItems.TaskSettings.retweetChance"
          class="align-center"
          max="100"
          min="0"
          label="Retweet Chance"
          style="width: 300px"
        >
          <template v-slot:append>
            <v-text-field
              class="mt-0 pt-0"
              hide-details
              single-line
              type="text"
              style="width: 45px"
              :value="storedItems.TaskSettings.retweetChance + '%'"
            ></v-text-field>
          </template>
        </v-slider>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TaskStore from "./TaskStore";
export default {
  components: {},
  name: "search-input",
  methods: {},
  created() {
    this.storedItems.TaskSettings.likeChance = "0";
    this.storedItems.TaskSettings.replyChance = "0";
    this.storedItems.TaskSettings.retweetChance = "0";
    this.storedItems.TaskSettings.followChance = "0";
    switch (this.task) {
      case "Like-Search":
        this.storedItems.TaskSettings.likeChance = "100";
        break;
      case "Reply-Search":
        this.storedItems.TaskSettings.replyChance = "100";
        break;
      case "Retweet-Search":
        this.storedItems.TaskSettings.retweetChance = "100";
        break;
      case "Follow-Search":
        this.storedItems.TaskSettings.followChance = "100";
        break;
    }
  },
  data: () => ({
    storedItems: TaskStore.data,
    min: 1,
    max: 100,
    additonalSwitch: false,
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