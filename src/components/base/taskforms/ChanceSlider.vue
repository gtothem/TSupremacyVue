<template>
  <div>
    <v-row v-if="mode === 'Single'">
      <v-col cols="3" class="pr-4">
        <v-slider
          v-if="task === 'Like-Search'"
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
          v-if="task === 'Reply-Search'"
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
          v-if="task === 'Follow-Search'"
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
          v-if="task === 'Retweet-Search'"
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
    <v-row v-if="mode === 'Multi'">
      <v-col cols="3" class="pr-4">
        <v-slider
          v-if="task !== 'Like-Search'"
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
          v-if="task !== 'Reply-Search'"
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
          v-if="task !== 'Follow-Search'"
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
          v-if="task !== 'Retweet-Search'"
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

        <span class="caption grey--text font-weight-light mx-2"
          >Actions to be run on the User after the main Action</span
        >
        <v-slider
          v-model="storedItems.TaskSettings.likeUserChance"
          class="align-center mt-2"
          max="100"
          min="0"
          hide-details
          label="Like Users Posts"
          style="width: 300px"
        >
          <template v-slot:append>
            <v-text-field
              class="mt-0 pt-0"
              hide-details
              single-line
              type="text"
              style="width: 45px"
              :value="storedItems.TaskSettings.likeUserChance + '%'"
            ></v-text-field>
          </template>
        </v-slider>
        <v-range-slider
          v-model="storedItems.TaskSettings.likeUserCount"
          max="10"
          min="1"
          hide-details
          class="align-center"
          style="width: 300px"
        >
          <template v-slot:prepend>
            <v-text-field
              :value="storedItems.TaskSettings.likeUserCount[0]"
              class="mt-0 pt-0 ml-6"
              hide-details
              single-line
              type="number"
              style="width: 45px"
              @change="$set(storedItems.TaskSettings.likeUserCount, 0, $event)"
            ></v-text-field>
          </template>
          <template v-slot:append>
            <v-text-field
              :value="storedItems.TaskSettings.likeUserCount[1]"
              class="mt-0 pt-0"
              hide-details
              single-line
              type="number"
              style="width: 45px"
              @change="$set(storedItems.TaskSettings.likeUserCount, 1, $event)"
            ></v-text-field>
          </template>
        </v-range-slider>
        <v-slider
          v-model="storedItems.TaskSettings.replyUserChance"
          class="align-center"
          max="100"
          min="0"
          hide-details
          label="Reply Users Posts"
          style="width: 300px"
        >
          <template v-slot:append>
            <v-text-field
              class="mt-0 pt-0"
              hide-details
              single-line
              type="text"
              style="width: 45px"
              :value="storedItems.TaskSettings.replyUserChance + '%'"
            ></v-text-field>
          </template>
        </v-slider>
        <v-range-slider
          v-model="storedItems.TaskSettings.replyUserCount"
          max="10"
          min="1"
          hide-details
          class="align-center"
          style="width: 300px"
        >
          <template v-slot:prepend>
            <v-text-field
              :value="storedItems.TaskSettings.replyUserCount[0]"
              class="mt-0 pt-0 ml-6"
              hide-details
              single-line
              type="number"
              style="width: 45px"
              @change="$set(storedItems.TaskSettings.replyUserCount, 0, $event)"
            ></v-text-field>
          </template>
          <template v-slot:append>
            <v-text-field
              :value="storedItems.TaskSettings.replyUserCount[1]"
              class="mt-0 pt-0"
              hide-details
              single-line
              type="number"
              style="width: 45px"
              @change="$set(storedItems.TaskSettings.replyUserCount, 1, $event)"
            ></v-text-field>
          </template>
        </v-range-slider>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TaskStore from "./TaskStore";
export default {
  components: {},
  name: "chance-input",
  methods: {},
  created() {},
  data: () => ({
    storedItems: TaskStore.data,
    min: 1,
    max: 100,
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