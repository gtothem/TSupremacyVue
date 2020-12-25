<template>
  <div>
    <proxies :selected="selected" />
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
    };
  },
};
</script>

<style scoped>
</style>