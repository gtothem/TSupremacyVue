<template>
  <div>
    <schedule :data="schedules" />
  </div>
</template>

<script>
import Schedule from "../../components/base/twittertables/ScheduleTable.vue";
export default {
  components: { Schedule },
  name: "schedule-page",
  data() {
    return {
      schedules: [
        {
          owner: 0,
          id: "1-follow-search-1605369785981",
          name: "follow-search-1605369785981",
          task: "Follow Search",
          setting: "",
          time: "12/14/2020 6:04:13 PM",
          timer: "",
          status: "Active",
        },
        {
          owner: 0,
          id: "1-like-search-1605369736019",
          name: "like-search-1605369736019",
          task: "Like Search",
          setting: "",
          time: "12/14/2020 4:48:19 PM",
          timer: "",
          status: "Paused",
        },
        {
          owner: 0,
          id: "1-tweet-single-1605025252090",
          name: "tweet-single-1605025252090",
          task: "Tweet Single",
          setting: "",
          time: "12/13/2020 9:25:00 AM",
          timer: "",
          status: "Paused",
        },
      ]
    };
  },
};
</script>

<style scoped>
</style>