<template>
  <div>
    <div v-if="task === 'Now'" class="ml-2">
      <v-checkbox v-model="nowCheckbox" :label="`Run Now`"></v-checkbox>
    </div>
    </div>
</template>

<script>
export default {
  components: {},
  name: "task-timeforms",
  methods: {},
  data: () => ({
    valid: false,
    nowCheckbox: true,
  }),
  props: {
    task: {
      type: String,
      default: "Schedule",
      description: "Task Name",
    },
  },
};
</script>

<style scoped>
</style>