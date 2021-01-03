/* eslint no-use-before-define: 0 */  // --> OFF
<template>
  <div>
    <base-material-alert
      v-for="item in tasks"
      :key="item.id"
      :color="primary"
      dismissible
      class="center my-2"
      width="35%"
    >
      <v-progress-circular
        :rotate="90"
        :size="30"
        :width="5"
        :value="calc(item.taskGood + '/' + item.taskSize)"
        color="white"
        class="mr-2"
      >
        <small>{{ calc(item.taskGood + '/' + item.taskSize) }}</small>
      </v-progress-circular>
      <span class="font-weight-light"
        >[{{ item.name }}] [{{ item.taskGood }}/{{ item.taskSize }}]
         - {{ item.id }}</span
      >
    </base-material-alert>
    
    <accounts :updating="updating" />
    <br />
    <console reqBody="%" :updating="updating" />
  </div>
</template>

<script>
import Accounts from "../../components/base/twittertables/AccountsTable";
import Console from "../../components/base/twittertables/ConsoleTable";
export default {
  components: { Console, Accounts },
  name: "accounts-page",
  created() {
    if (this.$route.params.tasked === true) {
      this.updating = true;
    } else {
      this.updating = false;
    }
    this.getTasks();
  },
  methods: {
    async getTasks() {
      fetch("https://localhost:44396/TwitterBot/Tasks", {
        method: "POST",
        body: "Running",
        credentials: "include",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Tasks:", data);
          console.log(Object.keys(data.data).length);
          if (Object.keys(data.data).length > 0) {
            //this.tasks = data.data;
            this.updating = true;
            setTimeout(
              function (scope) {
                scope.getTasks();
              },
              1500,
              this
            );
          } else {
            this.updating = false;
            for (let task in this.tasks) {
                task.taskGood = task.taskTotal;                
            }
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          this.updating = false;
        });
    },
    calc(status) {
      let num = status.split("/");
      return Math.round((num[0] / num[1]) * 100);
    },
  },
  data() {
    return {
      updating: false,
      value: 45,
      selected: [],
      tasks: [],      
    };
  },
};
</script>

<style scoped>
.center {
  margin: auto;
  width: 90%;
  border: 0px solid rgb(0, 77, 128);
  padding: 10px;
}
button {
  margin: 0 0.5rem 0 0;
  border: 1px solid rgb(0, 77, 128);
}
.blue {
  color: dodgerblue;
  margin-right: 0.2rem;
}
</style>