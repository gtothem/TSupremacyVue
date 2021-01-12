<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12" lg="4">
        <base-material-chart-card
          :data="dailyTasksChart.data"
          :options="dailyTasksChart.options"
          color="primary darken-2"
          hover-reveal
          type="Line"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" color="info" icon v-on="on">
                  <v-icon color="info"> mdi-refresh </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" light icon v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">
            <a click="">Daily Tasks</a> ({{ dailyTasksTotal }})
          </h4>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            <v-icon v-if="dailyChange >= 0" color="green" small> mdi-arrow-up </v-icon>
            <v-icon v-if="dailyChange < 0" color="green" small> mdi-arrow-down </v-icon>
            <span class="green--text mr-1">{{ dailyChange }}%</span>&nbsp;
            increase in today's tasks
          </p>

          <template v-slot:actions>
            <v-icon class="mr-1" small> mdi-clock-outline </v-icon>
            <span class="caption grey--text font-weight-light"
              >updated 15 minutes ago</span
            >
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col cols="12" lg="4">
        <base-material-chart-card
          :data="totalTasksChart.data"
          :options="totalTasksChart.options"
          :responsive-options="totalTasksChart.responsiveOptions"
          color="primary"
          hover-reveal
          type="Bar"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" color="info" icon v-on="on">
                  <v-icon color="info"> mdi-refresh </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" light icon v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">
            <a click="">Total Tasks</a> ({{ this.totalTasks }})
          </h4>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            <v-icon v-if="monthlyChange >= 0" color="green" small> mdi-arrow-up </v-icon>
            <v-icon v-if="monthlyChange < 0" color="green" small> mdi-arrow-down </v-icon>
            <span class="green--text mr-1">{{ monthlyChange }}%</span>&nbsp;
            increase in this month's tasks
          </p>

          <template v-slot:actions>
            <v-icon class="mr-1" small> mdi-clock-outline </v-icon>
            <span class="caption grey--text font-weight-light"
              >updated 15 minutes ago</span
            >
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col cols="12" lg="4">
        <base-material-chart-card
          :data="totalActionsChart.data"
          :options="totalActionsChart.options"
          hover-reveal
          color="primary lighten-2"
          type="Line"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" color="info" icon v-on="on">
                  <v-icon color="info"> mdi-refresh </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" light icon v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h3 class="card-title font-weight-light mt-2 ml-2">
            <a click="">Daily Actions</a> ({{ dailyActions }})
          </h3>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            Your total actions: <a click="" class="ml-1">{{ this.totalActions }}</a>
          </p>

          <template v-slot:actions>
            <v-icon class="mr-1" small> mdi-clock-outline </v-icon>
            <span class="caption grey--text font-weight-light"
              >updated 15 minutes ago</span
            >
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="primary darken-2"
          icon="mdi-account-group"
          title="Friends"
          :value="'+' + friends"
          sub-icon="mdi-clock"
          sub-text="So far today"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="primary"
          icon="mdi-account-multiple-plus"
          title="Followers"
          :value="'+' + followers"
          sub-icon="mdi-clock"
          sub-text="So far today"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="primary lighten-2"
          icon="mdi-thumb-up"
          title="Likes"
          :value="'+' + likes"
          sub-icon="mdi-clock"
          sub-text="So far today"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="primary darken-2"
          icon="mdi-thumb-up-outline"
          title="Liked"
          :value="'+' + liked"
          sub-icon="mdi-clock"
          sub-text="So far today"
        />
      </v-col>

      <v-col cols="12" sm="12" lg="6">
        <reports :itemsPerPage="10" />
      </v-col>

      <v-col cols="12" sm="12" lg="6">
          <activity-full-table :user="$store.state.accounts[0]"  :itemsPerPage=10 />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Reports from "../../components/base/twittertables/ReportsTable";
import ActivityFullTable from '../../components/base/twittertables/ActivityFullTable.vue';
export default {
  name: "DashboardDashboard",
  components: { Reports, ActivityFullTable },
  created() {
    this.$store.commit("GET_LOCAL");
    this.getDash();
  },
  computed: {
    dailyChange() {
      let o = this.dailyTasksChart.data.series[0].length - 1;
      let decreaseValue =
        this.dailyTasksChart.data.series[0][o] -
        this.dailyTasksChart.data.series[0][o - 1];
      return Math.round(
        (decreaseValue / this.dailyTasksChart.data.series[0][o - 1]) * 100
      );
    },
    monthlyChange() {
      let o = this.totalTasksChart.data.series[0].length - 1;
      let decreaseValue =
        this.totalTasksChart.data.series[0][o] -
        this.totalTasksChart.data.series[0][o - 1];
      return Math.round(
        (decreaseValue / this.totalTasksChart.data.series[0][o - 1]) * 100
      );
    },
    dailyTasksTotal() {
      if (this.dailyTasksChart.data.series[0][6] == null) {
        return this.dailyTasksChart.data.series[0][5];
      }

      return this.dailyTasksChart.data.series[0][6];
    },
    dailyActionChange() {
      let o = 6;
      let off = 5;
      if (this.totalActionsChart.data.series[0][o] == null) {
        o = 5;
        off = 4;
      }
      let decreaseValue =
        this.totalActionsChart.data.series[0][o] -
        this.totalActionsChart.data.series[0][off];
      return Math.round(
        (decreaseValue / this.totalActionsChart.data.series[0][5]) * 100
      );
    },
    dailyActions() {
      if (this.totalActionsChart.data.series[0][6] == null) {
        return this.totalActionsChart.data.series[0][5];
      }

      return this.totalActionsChart.data.series[0][6];
    },
  },
  methods: {
    async getDash() {
      fetch("https://localhost:44396/TwitterBot/Dash", {
        method: "POST",
        body: "",
        credentials: "include",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Dash:", data);
          
          this.dailyTasksChart.data = data.dailyTasks;
          this.dailyTasksChart.options.high =
            Math.max(...data.dailyTasks.series[0]) + 5;
          this.dailyTasks = data.dailyTasks.series[6];

          this.totalTasksChart.data = data.monthlyTasks;
          this.totalTasksChart.options.high =
            Math.max(...data.monthlyTasks.series[0]) + 5;
          this.totalTasks = data.totalTasks;

          this.totalActionsChart.data = data.dailyActions;
          this.totalActionsChart.options.high =
            Math.max(...data.dailyActions.series[0]) + 5;
          this.totalActions = data.totalActions;

          this.friends = data.friends;
          this.followers = data.followers;
          this.likes = data.likes;
          this.liked = data.liked;
        })

        .catch((error) => {
          console.error("Error:", error);
          this.updating = false;
        });
    },
  },
  data() {
    return {
      totalTasks: 0,
      totalActions: 0,
      friends: 0,
      followers: 0,
      likes: 0,
      liked: 0,
      dailyTasksChart: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[12, 17, 7, 17, 23, 18, 38]],
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 50,
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      totalActionsChart: {
        data: {
          labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
          series: [[532, 433, 323, 380, 453, 753, 326, 434]],
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      totalTasksChart: {
        data: {
          labels: [
            "Ja",
            "Fe",
            "Ma",
            "Ap",
            "Mai",
            "Ju",
            "Jul",
            "Au",
            "Se",
            "Oc",
            "No",
            "De",
          ],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
          ],
        },
        options: {
          axisX: {
            showGrid: false,
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                },
              },
            },
          ],
        ],
      },
    };
  },
};
</script>
