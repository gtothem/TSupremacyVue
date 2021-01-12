<template>
  <div class="pb-4">
    <span class="grey--text font-weight-light">Tweet Filter options</span>
    <v-row class="ml-4 pb-2">
      <v-checkbox
        v-model="rangeCount"
        hide-details
        label="Original Tweets Only"
      ></v-checkbox>
    </v-row>
    <v-row class="ml-4" no-gutters>
      <v-col cols="auto">
        <v-slider
          v-model="storedItems.TaskSettings.followChance"
          class="align-center"
          max="1000"
          min="0"
          label="Minimum Likes"
          hide-details
          style="width: 300px"
        >
          <template v-slot:append>
            <v-text-field
              class="mt-0 pt-0"
              hide-details
              single-line
              type="number"
              style="width: 60px"
              :value="storedItems.TaskSettings.followChance"
            ></v-text-field>
          </template>
        </v-slider>
      </v-col>
    </v-row>
    <v-row class="ml-4" no-gutters>
      <v-col cols="auto">
        <v-slider
          v-model="storedItems.TaskSettings.followChance"
          class="align-center"
          max="1000"
          min="0"
          label="Minimum Replies"
          hide-details
          style="width: 300px"
        >
          <template v-slot:append>
            <v-text-field
              class="mt-0 pt-0"
              hide-details
              single-line
              type="number"
              style="width: 60px"
              :value="storedItems.TaskSettings.followChance"
            ></v-text-field>
          </template>
        </v-slider>
      </v-col>
    </v-row>
    <v-row class="ml-4 mb-4" no-gutters>
      <v-col cols="auto">
        <v-slider
          v-model="storedItems.TaskSettings.followChance"
          class="align-center"
          max="1000"
          min="0"
          label="Minimum Retweets"
          hide-details
          style="width: 300px"
        >
          <template v-slot:append>
            <v-text-field
              class="mt-0 pt-0"
              hide-details
              single-line
              type="number"
              style="width: 60px"
              :value="storedItems.TaskSettings.followChance"
            ></v-text-field>
          </template>
        </v-slider>
      </v-col>
    </v-row>
    <span class="grey--text font-weight-light"
      >User Filter options</span
    >
    <v-row class="ml-4 pb-2" no-gutters>
      <v-checkbox
        v-model="rangeCount"
        hide-details
        label="Profile Picture"
      ></v-checkbox>
    </v-row>
    <v-row class="ml-4" no-gutters>
      <v-col cols="auto">
        <v-slider
          v-model="storedItems.TaskSettings.followChance"
          class="align-center"
          max="1000"
          min="0"
          label="Minimum Tweets"
          hide-details
          style="width: 300px"
        >
          <template v-slot:append>
            <v-text-field
              class="mt-0 pt-0"
              hide-details
              single-line
              type="number"
              style="width: 60px"
              :value="storedItems.TaskSettings.followChance"
            ></v-text-field>
          </template>
        </v-slider>
      </v-col>
    </v-row>
    <v-row class="ml-4" no-gutters>
      <v-col cols="auto">
        <v-slider
          v-model="storedItems.TaskSettings.followChance"
          class="align-center"
          max="30"
          min="0"
          label="Last Tweet"
          hide-details
          style="width: 300px"
        >
          <template v-slot:append>
            <v-text-field
              class="mt-0 pt-0"
              hide-details
              single-line
              type="text"
              style="width: 60px"
              :value="storedItems.TaskSettings.followChance + ' days'"
            ></v-text-field>
          </template>
        </v-slider>
      </v-col>
    </v-row>
    <v-row class="ml-4" no-gutters>
      <v-col cols="auto">
        <v-slider
          v-model="storedItems.TaskSettings.followChance"
          class="align-center"
          max="1000"
          min="0"
          label="Minimum Friends"
          hide-details
          style="width: 300px"
        >
          <template v-slot:append>
            <v-text-field
              class="mt-0 pt-0"
              hide-details
              single-line
              type="number"
              style="width: 60px"
              :value="storedItems.TaskSettings.followChance"
            ></v-text-field>
          </template>
        </v-slider>
      </v-col> </v-row
    ><v-row class="ml-4" no-gutters>
      <v-col cols="auto">
        <v-slider
          v-model="storedItems.TaskSettings.followChance"
          class="align-center"
          max="1000"
          min="0"
          label="Minimum Followers"
          hide-details
          style="width: 300px"
        >
          <template v-slot:append>
            <v-text-field
              class="mt-0 pt-0"
              hide-details
              single-line
              type="number"
              style="width: 60px"
              :value="storedItems.TaskSettings.followChance"
            ></v-text-field>
          </template>
        </v-slider>
      </v-col> </v-row
    ><v-row class="ml-4" no-gutters>
      <v-col cols="auto">
        <v-slider
          v-model="storedItems.TaskSettings.followChance"
          class="align-center"
          max="1000"
          min="0"
          label="Follow Ratio Greater Than"
          hide-details
          style="width: 300px"
        >
          <template v-slot:append>
            <v-text-field
              class="mt-0 pt-0"
              hide-details
              single-line
              type="number"
              style="width: 60px"
              :value="storedItems.TaskSettings.followChance"
            ></v-text-field>
          </template>
        </v-slider>
      </v-col> </v-row
    ><v-row class="ml-4" no-gutters>
      <v-col cols="auto">
        <v-slider
          v-model="storedItems.TaskSettings.followChance"
          class="align-center"
          max="1000"
          min="0"
          label="Follow Ratio Smaller Than"
          hide-details
          style="width: 300px"
        >
          <template v-slot:append>
            <v-text-field
              class="mt-0 pt-0"
              hide-details
              single-line
              type="number"
              style="width: 60px"
              :value="storedItems.TaskSettings.followChance"
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
  name: "filter-input",
  methods: {},
  created() {},
  data: () => ({
    storedItems: TaskStore.data,
    min: 1,
    max: 100,
    filterMinLikes: false,
  }),
  props: {
    task: {
      type: String,
      default: "",
      description: "Task Name",
    },
    mode: {
      type: String,
      default: "Single",
      description: "Single or multi",
    },
  },
};
</script>

<style scoped>
</style>