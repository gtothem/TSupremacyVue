<template>
  <div>
    <proxies :data="proxies" :selected="selected" />
  </div>
</template>

<script>
import Proxies from "../../components/base/twittertables/ProxiesTable.vue";
export default {
  components: { Proxies },
  name: "proxies-page",
  data() {
    return {
      singleSelect: false,
      selected: [],
      proxies: [
        {
          id: "1-12-12-12-12",
          owner: 1,
          proxy: "12.12.12.12",
          status: "",
          user: "",
          pass: "",
          twitter: "",
          latency: "",
          country: "US",
        },
        {
          id: "1-Real",
          owner: 1,
          proxy: "Real",
          status: "Good",
          user: "",
          pass: "",
          twitter: "Good",
          latency: "322",
          country: "GB",
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>