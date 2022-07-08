<template>
  <div v-for="i in floors" :key="i" class="floor">
    <div class="floor__cell">
      <div
        v-if="floor === i"
        :class="['elevator', { waiting: waiting }]"
        :style="[
          moving && {
            transition: `all ${timeout}s linear`,
            transform: `translate(0, ${translate}px`
          }
        ]"
      >
        <div v-if="moving || waiting" class="elevator__inner">
          <svg
            :style="translate < 0 && { transform: 'rotate(180deg)' }"
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
          <span>{{ nextFloor }}</span>
        </div>
      </div>
    </div>
    <div class="floor__btn">
      <span>{{ i }}</span>
      <button @click="moveElevator(i)" class="btn">0</button>
    </div>
  </div>
</template>

<script>
import { wait } from './helpers/wait'
export default {
  name: 'App',
  components: {},
  data () {
    return {
      floors: [6, 5, 4, 3, 2, 1],
      floor: 1,
      nextFloor: 1,
      translate: 0,
      timeout: 0,
      moving: false,
      waiting: false,
    }
  },
  methods: {
    async moveElevator (floor) {
      if (this.floor !== floor) {
        const floorDifference = this.floor - floor
        this.nextFloor = floor
        this.moving = true
        this.translate = 100 * floorDifference
        this.timeout = Math.abs(floorDifference)
        await wait(this.timeout * 1000)
        this.moving = false
        this.waiting = true
        this.floor = floor
        await wait(3000)
        this.waiting = false
      }
    }
  },
}
</script>

<style lang="scss">
@import './styles/global.scss';

.floor {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  border-top: 1px solid var(--color-grey);
  &:last-child {
    border-bottom: 1px solid var(--color-grey);
  }
  &__cell {
    width: 100px;
    height: 100%;
    border-right: 3px solid var(--color-grey);
    border-left: 3px solid var(--color-grey);
  }
  &__btn {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
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
