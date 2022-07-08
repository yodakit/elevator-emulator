<template>
  <div v-for="i in floors" :key="i" class="floor">
    <div class="floor__cell">
      <div
        v-if="floor === i"
        :class="['elevator', {'waiting': waiting}]"
        :style="[
          moving && {
            transition: `all ${timeout}s linear`,
            transform: `translate(0, ${translate}px`
          }
        ]"
      >
        <div class="elevator__inner"></div>
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
      translate: 0,
      timeout: 0,
      moving: false,
      waiting: false
    }
  },
  methods: {
    async moveElevator (floor) {
      const floorDifference = this.floor - floor
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
}
.waiting { 
  animation-name: waiting; 
  animation-iteration-count: infinite; 
  animation-timing-function: cubic-bezier(1.0,0,3,1.0); 
  animation-duration: 0.7s; 
  -webkit-animation-name: waiting; 
  -webkit-animation-iteration-count: infinite; 
  -webkit-animation-timing-function: cubic-bezier(1.0,0,3,1.0); 
  -webkit-animation-duration: 0.7s; 
} 

@keyframes waiting { 
  from { opacity: 1.0; } 
  to { opacity: 0.3; } 
}

@-webkit-keyframes waiting { 
  from { opacity: 1.0; } 
  to { opacity: 0.3; } 
}
</style>
