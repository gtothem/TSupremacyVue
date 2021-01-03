/* eslint no-use-before-define: 0 */  // --> OFF
<template>
  <div>
    <console reqBody="%" tableHeight="720px" />
  </div>
</template>

<script>
import Console from "../../components/base/twittertables/ConsoleTable";
export default {
  components: { Console },
  name: "console-page",
  data() {
    return {
      singleSelect: false,
      selected: [],      
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
</style>