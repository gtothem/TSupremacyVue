<template>
  <div>
    <v-row no-gutters>
      <v-col cols="auto">
        <v-text-field
          v-model="storedItems.TaskSettings.searchTerm"
          color="primary"
          label="Search Term"
          prepend-icon="mdi-comment-search"
          style="width: 300px"
        />
      </v-col>
      <v-col cols="auto">
        <v-combobox
          v-model="storedItems.TaskSettings.searchType"
          :items="items"
          solo
          dense
          class="ml-2 mt-2"
          style="width: 80px"
        ></v-combobox>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="auto" class="pr-4">
        <v-slider
          v-if="rangeCount === false"
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
      <v-col cols="auto">
        <v-checkbox
          v-model="rangeCount"
          hide-details
          label="Range"
        ></v-checkbox>
      </v-col>
    </v-row>
    <chance-slider :task="task" mode="Single" />
    <v-row>
      <v-col cols="auto">
        <v-switch
          v-model="additonalSwitch"
          label="Additional Options"
          class="ml-4"
        ></v-switch>
      </v-col>
      <v-col cols="auto">
        <v-switch
          v-model="searchFilter"
          label="Filters"
          class="ml-4"
        ></v-switch>
      </v-col>
      <v-col cols="auto">
        <v-switch
          v-if="storedItems.UserList.length > 1"
          name="splitSwitch"
          v-model="storedItems.TaskSettings.listSplit"
          label="Split"
          class="ml-4"
        ></v-switch
      ></v-col>
    </v-row>
    <div v-if="additonalSwitch" class="ml-4">
      <chance-slider :task="task" mode="Multi" class="mb-2" />
    </div>
    <div v-if="searchFilter" class="ml-4">
      <search-filters :task="task" mode="Multi" />
    </div>
  </div>
</template>

<script>
import TaskStore from "./TaskStore";
import ChanceSlider from "./ChanceSlider";
import SearchFilters from "./SearchFilters";
export default {
  components: { ChanceSlider, SearchFilters },
  name: "search-input",
  methods: {},
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
    additonalSwitch: {
      handler: function () {
        if (this.additonalSwitch === true) {
          this.storedItems.TaskSettings.likeUserCount = [1, 3];
          this.storedItems.TaskSettings.replyUserCount = [1, 2];
        } else {
          this.storedItems.TaskSettings.likeUserCount = null;
          this.storedItems.TaskSettings.replyUserCount = null;
        }
      },
      deep: true,
    },
  },
  created() {
    this.storedItems.TaskSettings.searchType = "Top";
    this.storedItems.TaskSettings.likeChance = "0";
    this.storedItems.TaskSettings.replyChance = "0";
    this.storedItems.TaskSettings.retweetChance = "0";
    this.storedItems.TaskSettings.followChance = "0";
    this.storedItems.TaskSettings.likeUserChance = "0";
    this.storedItems.TaskSettings.replyUserChance = "0";
    switch (this.task) {
      case "Like-Search":
        this.storedItems.TaskSettings.likeChance = "75";
        break;
      case "Reply-Search":
        this.storedItems.TaskSettings.replyChance = "75";
        break;
      case "Retweet-Search":
        this.storedItems.TaskSettings.retweetChance = "75";
        break;
      case "Follow-Search":
        this.storedItems.TaskSettings.followChance = "75";
        break;
    }
  },
  data: () => ({
    storedItems: TaskStore.data,
    min: 1,
    max: 100,
    additonalSwitch: false,
    rangeCount: false,
    searchFilter: false,
    items: ["Top", "All"],
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