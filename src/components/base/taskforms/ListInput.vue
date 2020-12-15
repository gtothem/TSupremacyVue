<template>
  <div>
    <v-container>
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
    </v-container>

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