<template>
  <span>
    {{ countDown }}
  </span>
</template>

<script>
export default {
  methods: {
    countDownTimer() {
      this.now = new Date().getTime();
      this.distance = this.countDownDate - this.now;

      let days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor(
        (this.distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      let seconds = Math.floor((this.distance % (1000 * 60)) / 1000);

      this.countDown = "";
      if (days > 0) {
        this.countDown = days + "d ";
      }
      if (hours > 0) {
        this.countDown += hours + "h ";
      }
      if (minutes > 0) {
        this.countDown += minutes + "m ";
      }
      this.countDown += seconds + "s";

      if (this.distance > 0) {
        this.timer = setTimeout(() => {
          this.distance -= 1;
          this.countDownTimer();
        }, 1000);
      }
    },
  },
  created() {
    this.countDownDate = new Date(this.time).getTime();
    this.countDownTimer();
  },
  data() {
    return {
      countDownDate: "",
      now: "",
      distance: "",
      countDown: "",
      timer: null,
    };
  },
  props: {
    time: {
      type: String,
      default: () => [],
      description: "Input time",
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>