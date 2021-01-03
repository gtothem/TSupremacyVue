<template>
  <v-container>
    <hr class="style-two" />
    <br />
    <v-row align="center" no-gutters>
      <v-col class="text-center mb-sm-0 mb-5" cols="auto"> </v-col>

      <v-spacer class="hidden-sm-and-down" />

      <v-col cols="12" md="auto">
        <div class="body-1 font-weight-light pr-4 pt-6 pt-md-0 text-center">
          &copy; {{ year }}
          <a href="https://www.tsupremacy.com">TSupremacy</a>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DashboardCoreFooter",

  data: () => ({
    year: new Date().getFullYear(),
  }),
};
</script>

<style scoped>
a {
  text-decoration: none;
}
/* Gradient transparent - color - transparent */

hr.style-two {
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0));
}
</style>
