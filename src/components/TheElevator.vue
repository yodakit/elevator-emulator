<template>
  <div
    :class="['elevator', { waiting: elevator.waiting }]"
    :style="[
      elevator.moving && {
        transition: `all ${elevator.timeout}s linear`,
        transform: `translate(0, ${elevator.translate}px`
      }
    ]"
  >
    <div v-if="elevator.moving || elevator.waiting" class="elevator__inner">
      <svg
        :style="elevator.translate < 0 && { transform: 'rotate(180deg)' }"
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
      <span>{{ elevator.nextFloor }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheElevator',
  props: {
    elevator: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.elevator {
  width: 100%;
  height: 100%;
  background-color: var(--color-blue);
  padding-top: 5px;
  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 5px;
    height: 25px;
    width: 45px;
    background-color: rgba($color: #000000, $alpha: 0.5);
    border-radius: 3px;
    margin: 0 auto;
    svg {
      fill: white;
      width: 40%;
    }
    span {
      color: white;
    }
  }
}
.waiting {
  animation-name: waiting;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(1, 0, 3, 1);
  animation-duration: 0.7s;
  -webkit-animation-name: waiting;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: cubic-bezier(1, 0, 3, 1);
  -webkit-animation-duration: 0.7s;
}

@keyframes waiting {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.3;
  }
}

@-webkit-keyframes waiting {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.3;
  }
}
</style>
