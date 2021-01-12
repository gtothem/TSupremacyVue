<template>
  <div>
    <div class="center">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mx-2" color="primary" v-bind="attrs" v-on="on">
            Accounts
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items.accounts"
            :key="index"
            @click="runAccounts(item.title)"
            class="tile"
          >
            <v-list-item-title>
              <v-icon color="primary" class="mr-2">{{ item.icon }}</v-icon
              >{{ item.title }}</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mx-2" color="primary" v-bind="attrs" v-on="on">
            Tasks
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items.tasks"
            :key="index"
            @click.stop="-1"
            class="tile pr-5"
          >
            <v-menu offset-x right open-on-hover close-delay="50">
              <template v-slot:activator="{ on, attrs }">
                <v-list-item-title @click.stop.prevent v-bind="attrs" v-on="on">
                  <v-icon color="primary" class="mr-2">{{ item.icon }}</v-icon>
                  {{ item.title }}</v-list-item-title
                >
              </template>
              <v-list>
                <v-list-item
                  v-for="(subitem, index) in item.subitems"
                  :key="index"
                  class="tile"
                  @click="runTask(item.title + '-' + subitem.title)"
                >
                  <v-icon color="primary" class="mr-2">{{
                    subitem.icon
                  }}</v-icon>
                  <v-list-item-title>{{ subitem.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mx-2" color="primary" v-bind="attrs" v-on="on">
            Schedules
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items.schedules"
            :key="index"
            @click.stop="event.preventDefault()"
            class="tile"
          >
            <v-menu offset-x right open-on-hover close-delay="50">
              <template v-slot:activator="{ on, attrs }">
                <v-list-item-title @click.stop.prevent v-bind="attrs" v-on="on">
                  <v-icon color="primary" class="mr-2">{{ item.icon }}</v-icon>
                  {{ item.title }}</v-list-item-title
                >
              </template>
              <v-list>
                <v-list-item
                  v-for="(subitem, index) in item.subitems"
                  :key="index"
                  class="tile"
                  @click="runSchedule(item.title + '-' + subitem.title)"
                >
                  <v-icon color="primary" class="mr-2">{{
                    subitem.icon
                  }}</v-icon>
                  <v-list-item-title>{{ subitem.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <v-dialog v-model="dialog" max-width="380">
      <v-card>
        <v-card-title class="headline"> Enter Account </v-card-title>
        <v-card-text>
          <v-container class="">
            <v-text-field
              v-model="storedItems.User.username"
              type="text"
              label="Username"
            ></v-text-field>
            <v-text-field
              v-model="storedItems.User.password"
              type="text"
              label="Password"
            ></v-text-field>
            <v-text-field
              v-model="storedItems.User.email"
              type="text"
              label="Email"
            ></v-text-field>
            <v-text-field
              v-model="storedItems.User.emailpass"
              type="text"
              label="Email Pass"
            ></v-text-field>
            <v-text-field
              v-model="storedItems.User.phone"
              type="text"
              label="Phone"
            ></v-text-field>
            <v-text-field
              v-model="storedItems.User.proxy"
              type="text"
              label="Proxy"
            ></v-text-field>
            <v-text-field
              v-model="storedItems.User.proxyuser"
              type="text"
              label="Proxy User (optional)"
            ></v-text-field>
            <v-text-field
              v-model="storedItems.User.proxypass"
              type="text"
              label="Proxy Pass (optional)"
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
              runAccounts('Send');
            "
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogWarn" max-width="300">
      <v-card>
        <v-card-title class="headline"> Accounts </v-card-title>
        <v-card-text> No account(s) selected! </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialogWarn = false"> Ok </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import TaskStore from "../taskforms/TaskStore";
export default {
  components: {},
  name: "accounts-toolbar",
  methods: {
    runTask(action) {
      if (Object.keys(this.selected).length > 0) {
        this.$router.push({
          name: "TaskBuilder",
          params: {
            taskName: action,
            taskMode: "Now",
            accounts: this.selected,
          },
        });
      } else {
        this.dialogWarn = true;
      }
    },
    runSchedule(action) {
      if (Object.keys(this.selected).length > 0) {
        this.$router.push({
          name: "TaskBuilder",
          params: {
            taskName: action,
            taskMode: "Schedule",
            accounts: this.selected,
          },
        });
      } else {
        this.dialogWarn = true;
      }
    },
    runAccounts(task) {
      switch (task) {
        case "Add":
          this.dialog = true;
          break;
        case "Delete":
          if (Object.keys(this.selected).length > 0) {
            this.storedItems.TaskMode = "Account";
            TaskStore.convertTaskSettings(this.storedItems.TaskSettings);
            this.storedItems.TaskName = "accountDelete";
            this.storedItems.UserList = this.selected;
            TaskStore.stripUserList();
            TaskStore.stripUser(this.storedItems.User);
            this.$emit("delete:account", this.storedItems);
            Object.assign(this.storedItems, TaskStore.resetData());
          } else {
            this.dialogWarn = true;
          }
          break;
        case "Send":
          this.storedItems.User.userid = "0";
          this.storedItems.TaskMode = "Account";
          TaskStore.convertTaskSettings(this.storedItems.TaskSettings);
          this.storedItems.TaskName = "accountAdd";
          this.$emit("add:account", this.storedItems);
          Object.assign(this.storedItems, TaskStore.resetData());
          break;
      }
    },
  },
  created() {},
  data() {
    return {
      storedItems: TaskStore.data,
      accounts: this.data,
      dialog: false,
      dialogWarn: false,
      items: {
        accounts: [
          {
            title: "Add",
            icon: "mdi-account-plus",
          },
          {
            title: "Delete",
            icon: "mdi-delete",
          },
        ],
        tasks: [
          {
            title: "Tweet",
            icon: "mdi-comment-edit",
            subitems: [
              { title: "Single", icon: "mdi-comment-edit" },
              { title: "List", icon: "mdi-format-list-checks" },
              { title: "Image", icon: "mdi-text-box-search" },
              /*{ title: "Poll", icon: "mdi-text-box-search" },
              { title: "Delete", icon: "mdi-text-box-search" },
              { title: "Report", icon: "mdi-text-box-search" },*/
            ],
          },
          {
            title: "Retweet",
            icon: "mdi-twitter-retweet",
            subitems: [
              { title: "Single", icon: "mdi-twitter-retweet" },
              { title: "List", icon: "mdi-format-list-checks" },
              { title: "Search", icon: "mdi-text-box-search" },
            ],
          },
          /*{
            title: "Message",
            icon: "mdi-message",
            subitems: [{ title: "Followers", icon: "mdi-comment-edit" }],
          },*/
          {
            title: "Reply",
            icon: "mdi-message-reply-text",
            subitems: [
              { title: "Single", icon: "mdi-message-reply-text" },
              { title: "List", icon: "mdi-format-list-checks" },
              { title: "Search", icon: "mdi-text-box-search" },
            ],
          },
          {
            title: "Like",
            icon: "mdi-thumb-up",
            subitems: [
              { title: "Single", icon: "mdi-message-reply-text" },
              { title: "List", icon: "mdi-format-list-checks" },
              { title: "Search", icon: "mdi-text-box-search" },
              { title: "Delete", icon: "mdi-delete" },
            ],
          },
          {
            title: "Follow",
            icon: "mdi-account-multiple-plus",
            subitems: [
              { title: "Single", icon: "mdi-message-reply-text" },
              { title: "List", icon: "mdi-format-list-checks" },
              { title: "Search", icon: "mdi-text-box-search" },
              /*{ title: "My Followers", icon: "mdi-heart" },
              { title: "My Recommended", icon: "mdi-heart" },*/
              { title: "Users Followers", icon: "mdi-account-heart" },
              { title: "Users Friends", icon: "mdi-account-heart" },
            ],
          },
          {
            title: "Unfollow",
            icon: "mdi-account-multiple-minus",
            subitems: [
              { title: "Single", icon: "mdi-message-reply-text" },
              { title: "List", icon: "mdi-format-list-checks" },
              { title: "Filter", icon: "mdi-filter-off-outline" },
              { title: "Nonfollowers", icon: "mdi-account-alert-outline" },
            ],
          },
          {
            title: "Sync",
            icon: "mdi-battlenet",
            subitems: [
              { title: "Update", icon: "mdi-battlenet" },
              { title: "Delete", icon: "mdi-delete" },
            ],
          },
        ],
        schedules: [
          {
            title: "Tweet",
            icon: "mdi-comment-edit",
            subitems: [
              { title: "Single", icon: "mdi-comment-edit" },
              { title: "List", icon: "mdi-format-list-checks" },
              { title: "Search", icon: "mdi-text-box-search" },
            ],
          },
          {
            title: "Retweet",
            icon: "mdi-twitter-retweet",
            subitems: [
              { title: "Single", icon: "mdi-twitter-retweet" },
              { title: "List", icon: "mdi-format-list-checks" },
              { title: "Search", icon: "mdi-text-box-search" },
            ],
          },
          {
            title: "Reply",
            icon: "mdi-message-reply-text",
            subitems: [
              { title: "Single", icon: "mdi-message-reply-text" },
              { title: "List", icon: "mdi-format-list-checks" },
              { title: "Search", icon: "mdi-text-box-search" },
            ],
          },
          {
            title: "Like",
            icon: "mdi-thumb-up",
            subitems: [
              { title: "Single", icon: "mdi-message-reply-text" },
              { title: "List", icon: "mdi-format-list-checks" },
              { title: "Search", icon: "mdi-text-box-search" },
            ],
          },
          {
            title: "Follow",
            icon: "mdi-account-multiple-plus",
            subitems: [
              { title: "Single", icon: "mdi-message-reply-text" },
              { title: "List", icon: "mdi-format-list-checks" },
              { title: "Search", icon: "mdi-text-box-search" },
            ],
          },
          {
            title: "Unfollow",
            icon: "mdi-account-multiple-minus",
            subitems: [
              { title: "Single", icon: "mdi-message-reply-text" },
              { title: "List", icon: "mdi-format-list-checks" },
              { title: "Filter", icon: "mdi-filter-off" },
            ],
          },
        ],
      },
    };
  },
  props: {
    data: {
      type: Array,
      default: () => [],
      description: "Table data",
    },
    selected: {
      type: Array,
      default: () => [],
      description: "Selected items",
    },
  },
};
</script>

<style scoped>
.center {
  margin: auto;
  width: 90%;
  padding: 10px;
}
.tile {
  margin: 4px;
  border-radius: 2px;
}
.tile:hover {
  background: lightblue;
}
</style>