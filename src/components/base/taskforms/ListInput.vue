<template>
  <div>
    <v-row no-gutters>
      <v-col cols="auto">
        <v-btn @click.stop="dialog = true" small class="primary mt-4"
          >Add</v-btn
        >
      </v-col>
      <v-col cols="2">
        <v-file-input
          accept=".txt"
          label="File input"
          @change="onFileChange"
        ></v-file-input>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="auto">
        <v-data-table
          :items="myItemsTransformed"
          :headers="headers"
          class="elevation-1"
          dense
        >
          <template v-slot:[`item.item`]="{ item }">
            <v-icon sm color="error" @click="itemDelete(item.item)">
              mdi-close
            </v-icon>
            {{ item.item }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row no-gutters class="mx-2 mt-4">
      <v-col cols="auto">
        <v-slider
          v-model="storedItems.TaskSettings.count"
          class="align-center"
          :max="myItemsLength"
          min="0"
          hide-details
          label="Count"
          style="width: 300px"
        >
          <template v-slot:append>
            <v-text-field
              class="mt-0 pt-0"
              hide-details
              single-line
              type="text"
              style="width: 45px"
              :value="storedItems.TaskSettings.count"
            ></v-text-field>
          </template>
        </v-slider>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="auto">
        <v-switch
          name="randomSwitch"
          v-model="storedItems.TaskSettings.listRandom"
          label="Randomize"
          class="ml-4"
        ></v-switch></v-col
      ><v-col>
        <v-switch
          v-if="storedItems.UserList.length > 1"
          name="splitSwitch"
          v-model="storedItems.TaskSettings.listSplit"
          label="Split"
          class="ml-4"
        ></v-switch></v-col
    ></v-row>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline"> Enter Item </v-card-title>
        <v-card-text>
          <v-container class="">
            <v-text-field
              v-model="inputItem"
              type="text"
              label="Item"
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
              itemAdd('Add');
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
import TaskStore from "./TaskStore";
export default {
  components: {},
  name: "list-input",
  methods: {
    itemAdd() {
      this.storedItems.DataList.push(this.inputItem);
      this.inputItem = "";
    },
    itemDelete(item) {
      this.storedItems.DataList.splice(
        this.storedItems.DataList.indexOf(item),
        1
      );
    },
    onFileChange(file) {
      if (!file) {
        return;
      }
      const reader = new FileReader();
      let results;
      reader.onload = (e) => {
        results = e.target.result.split("\n");
        this.storedItems.DataList.push(...results);
      };
      reader.readAsText(file);
    },
  },
  created() {},
  data: () => ({
    storedItems: TaskStore.data,
    inputItem: null,
    dialog: false,
    headers: [
      {
        text: "ITEMS",
        value: "item",
      },
    ],
  }),
  computed: {
    myItemsTransformed() {
      return this.storedItems.DataList.map((item) => ({ item }));
    },
    myItemsLength() {
      return this.storedItems.DataList.length;
    },
  },
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