<template>
  <div v-if="user">
    <base-material-card color="primary" class="px-5 py-3">
      <template v-slot:heading>
        <v-row no-gutters>
          <v-col cols="auto" :key="1">
            <h2 class="mt-5">zhakary12121</h2>
          </v-col>
          <v-col cols="auto" :key="2">
            <v-tabs
              v-model="tab"
              background-color="primary"
              color="white"
              dark
              icons-and-text
            >
              <v-tabs-slider></v-tabs-slider>

              <v-tab href="#tab-1" class="mx-2">
                Activity
                <v-icon sm> mdi-bell-ring</v-icon>
              </v-tab>

              <v-tab href="#tab-2">
                Friends
                <v-icon sm> mdi-account-group </v-icon>
              </v-tab>

              <v-tab href="#tab-3">
                Followers
                <v-icon sm> mdi-account-multiple-plus </v-icon>
              </v-tab>

              <v-tab href="#tab-4">
                Statuses
                <v-icon sm> mdi-comment-edit </v-icon>
              </v-tab>
            </v-tabs>
          </v-col>
        </v-row>
      </template>
      <v-tabs-items v-model="tab">
        <v-tab-item :key="1" :value="'tab-1'">
            <activity />          
        </v-tab-item>
        <v-tab-item :key="2" :value="'tab-2'">
          <followers :data="friends" />
        </v-tab-item>
        <v-tab-item :key="3" :value="'tab-3'">
          <friends :data="friends" />
        </v-tab-item>
        <v-tab-item :key="4" :value="'tab-4'">
          <friends :data="friends" />
        </v-tab-item>
      </v-tabs-items>
    </base-material-card>
  </div>
</template>

<script>
import Friends from "../../components/base/twittertables/FriendsTable.vue";
import Followers from "../../components/base/twittertables/FollowersTable.vue";
import Activity from "../../components/base/twittertables/ActivityTable.vue";
export default {
  components: { Friends, Followers, Activity },
  name: "profiles-page",
  data() {
    return {
      user: "jelp",
      tab: null,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      singleSelect: false,
      selected: [],
      friends: [
        {
          id: "1028445825435758592",
          name: "\u304A\u3063\u3072\u30FC\u3055\u307E",
          user: "ohisamakeyaki",
          description: "",
          statuses: 2868,
          likes: 19144,
          friends: 695,
          followers: 651,
          verified: "False",
          since: "Sun Aug 12 00:59:27 \u002B0000 2018",
          followBack: "False",
        },
        {
          id: "104665482",
          name: "Allison Moll",
          user: "allisonmoll",
          description:
            "worship leading, church planting, PK, PW, 4 babes, singer, music, loving Jesus. Trying to figure out who i am and what I\u2019m doing and how to love everyone.",
          statuses: 18253,
          likes: 7459,
          friends: 523,
          followers: 716,
          verified: "False",
          since: "Thu Jan 14 01:06:04 \u002B0000 2010",
          followBack: "False",
        },
        {
          id: "1054715361235558400",
          name: "AFarCloud",
          user: "AfarCloud",
          description:
            "Aggregate Farming in the Cloud is European Union\u2019s Horizon 2020 project, grant agreement No 783221, funded by @ECSEL_JU. It reflects only the authors\u0027 view.",
          statuses: 569,
          likes: 22,
          friends: 36,
          followers: 186,
          verified: "False",
          since: "Tue Oct 23 12:45:12 \u002B0000 2018",
          followBack: "False",
        },
        {
          id: "1055335195434463233",
          name: "ShopDeWorld",
          user: "ShopDeWorld",
          description:
            "Get the best Deals, surprising Offers and the ultramodern Styles at online shopping website \u0022Shop De World\u0022",
          statuses: 1016,
          likes: 0,
          friends: 927,
          followers: 295,
          verified: "False",
          since: "Thu Oct 25 05:48:12 \u002B0000 2018",
          followBack: "True",
        },
        {
          id: "1058727069503254528",
          name: "Waqas - Dipstar \u2764 HBD KKV \uD83C\uDF89",
          user: "ms_dipika_Fc",
          description: "Biggest fan of @ms_dipika \u2764 #Shoaika \u2764",
          statuses: 24266,
          likes: 23339,
          friends: 208,
          followers: 417,
          verified: "False",
          since: "Sat Nov 03 14:26:18 \u002B0000 2018",
          followBack: "False",
        },
        {
          id: "1059191496694472704",
          name: "MMA664",
          user: "MMA664MX",
          description:
            "Noticias \u002B Debate \u002B Foro \u002B Opiniones \u002B \nEventos \u002B Videos \u002B Apoyo al MMA Local \u002B Nacional \u002B Internacional \u002B",
          statuses: 1876,
          likes: 1098,
          friends: 177,
          followers: 45,
          verified: "False",
          since: "Sun Nov 04 21:11:46 \u002B0000 2018",
          followBack: "False",
        },
        {
          id: "1059806312664576001",
          name: "Kloppo",
          user: "kokobet2",
          description:
            "Football Index trader since Feb 2019 ..... and addicted to it \uD83D\uDE0E",
          statuses: 1893,
          likes: 1550,
          friends: 953,
          followers: 166,
          verified: "False",
          since: "Tue Nov 06 13:54:50 \u002B0000 2018",
          followBack: "True",
        },
      ],
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
}
.blue {
  color: dodgerblue;
  margin-right: 0.2rem;
}
.pause {
  text-decoration: none;
  color: dodgerblue;
}
p {
  display: inline;
}
</style>