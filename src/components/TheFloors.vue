<template>
  <div v-for="i in floors" :key="i" class="floor">
    <div v-for="elevator in elevatorsInfo" :key="elevator" class="floor__cell">
      <the-elevator
        v-if="elevator.floor === i"
        :elevator="elevator"
      />
    </div>
    <div class="floor__btn">
      <span>{{ i }}</span>
      <button
        @click="selectElevator(i)"
        :style="[
          isWaiting(i) && {
            'border-color': 'var(--color-orange)'
          }
        ]"
        class="btn"
      >
        <svg class="btn__ring" width="18" height="18">
          <circle
            :style="[
              isWaiting(i) && {
                stroke: 'var(--color-orange)'
              }
            ]"
            class="btn__circle"
            stroke="var(--color-dark)"
            stroke-width="1"
            cx="9"
            cy="9"
            r="7"
            fill="transparent"
          />
        </svg>
        <div
          :style="[
            isWaiting(i) && {
              'background-color': 'var(--color-orange)'
            }
          ]"
          class="btn__inner"
        ></div>
      </button>
    </div>
  </div>
</template>

<script>
import TheElevator from '@/components/TheElevator.vue'
import { wait } from '@/helpers/wait'

export default {
  name: 'TheFloors',
  components: {
    TheElevator
  },
  props: {
    floorsCount: {
      type: Number,
      required: true
    },
    elevatorsCount: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      floors: [],
      elevatorsInfo: [],
      queueCall: [],
      perfomance: [],
      checkUpdates: false
    }
  },
  created () {
    this.floors = Array.from(Array(this.floorsCount)).map(
      (el, indx) => this.floorsCount - indx
    )
    this.elevatorsInfo = Array.from(Array(this.elevatorsCount)).map(() => {
      return { floor: 1, nextFloor: 1, moving: false, waiting: false, translate: 0, timeout: 0 }
    })
  },
  methods: {
    selectElevator (floor = null) {
      if (floor && !this.queueCall.includes(floor)) {
        this.queueCall.push(floor)
      }
      if (!this.queueCall.length) return
      const nextFloor = this.queueCall.shift()
      const elevatorsMinDifference = []
      this.perfomance.push(nextFloor)
      for (let i = 0; i < this.elevatorsCount; i++) {
        const elevator = this.elevatorsInfo[i]
        if (!elevator.moving && !elevator.waiting) {
          elevatorsMinDifference.push([i, Math.abs(elevator.floor - nextFloor)])
        }
      }
      if (!elevatorsMinDifference.length) {
        this.perfomance.shift()
        this.queueCall.unshift(nextFloor)
        return
      }
      elevatorsMinDifference.sort((a, b) => a[1] - b[1])
      let minIndex
      for (const elem of elevatorsMinDifference) {
        if (elem[1] !== 0) {
          minIndex = elem[0]
          break
        }
      }
      this.moveElevator(minIndex, nextFloor)
    },
    async moveElevator(indexElevator, floor) {
      const floorDifference = this.elevatorsInfo[indexElevator].floor - floor
      this.elevatorsInfo[indexElevator].moving = true
      this.elevatorsInfo[indexElevator].nextFloor = floor
      this.elevatorsInfo[indexElevator].timeout = Math.abs(floorDifference)
      this.elevatorsInfo[indexElevator].translate = 100 * floorDifference
      await wait(this.elevatorsInfo[indexElevator].timeout * 1000)
      this.elevatorsInfo[indexElevator].moving = false
      this.elevatorsInfo[indexElevator].waiting = true
      this.elevatorsInfo[indexElevator].floor = floor
      this.perfomance.splice(this.perfomance.indexOf(floor), 1)
      await wait(3000)
      this.elevatorsInfo[indexElevator].waiting = false
      this.checkUpdates = !this.checkUpdates
    },
    isWaiting (i) {
      return this.queueCall.includes(i) || this.perfomance.includes(i);
    }
  },
  watch: {
    checkUpdates() {
      this.selectElevator()
    },
  },
}
</script>

<style lang="scss" scoped>
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
    margin-right: 20px;
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
.btn {
  position: relative;
  width: 23px;
  height: 23px;
  background-color: transparent;
  border: 1px solid var(--color-dark);
  border-radius: 2px;
  padding: 0;
  margin: 0 auto;
  &__inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    height: 40%;
    background-color: var(--color-dark);
    border-radius: 50%;
  }
  &__ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &:hover {
    background-color: var(--color-semi-grey);
  }
}
</style>
