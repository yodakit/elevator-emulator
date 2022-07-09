<template>
  <div v-for="i in floors" :key="i" class="floor">
    <div v-for="elevator in elevatorsInfo" :key="elevator" class="floor__cell">
      <the-elevator v-if="elevator.floor === i" :elevator="elevator" />
    </div>
    <div class="floor__btn">
      <span>{{ i }}</span>
      <the-button
        @click="selectElevator(i)"
        :isWaiting="waitingButtons[i - 1]"
      />
    </div>
  </div>
</template>

<script>
import TheElevator from "@/components/TheElevator.vue";
import TheButton from "@/components/TheButton.vue";
import { wait } from "@/helpers/wait";

export default {
  name: "TheFloors",
  components: {
    TheElevator,
    TheButton,
  },
  props: {
    floorsCount: {
      type: Number,
      required: true,
    },
    elevatorsCount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      floors: [],
      elevatorsInfo: [],
      queueCall: [],
      waitingButtons: [],
      checkUpdates: false,
    };
  },
  created() {
    this.floors = Array.from(Array(this.floorsCount)).map(
      (el, indx) => this.floorsCount - indx
    );
    this.elevatorsInfo = Array.from(Array(this.elevatorsCount)).map(() => {
      return {
        floor: 1,
        nextFloor: 1,
        moving: false,
        waiting: false,
        translate: 0,
        timeout: 0,
      };
    });
    this.waitingButtons = Array(this.floorsCount).fill(false);
  },
  methods: {
    selectElevator(floor = null) {
      if (
        this.elevatorsInfo.some(
          (elevator) =>
            (elevator.floor === floor && !elevator.moving) ||
            (elevator.nextFloor === floor && elevator.moving)
        )
      )
        return;
      if (floor) {
        this.queueCall.push(floor);
      }
      if (!this.queueCall.length) return;
      this.waitingButtons[floor - 1] = true;
      if (
        !this.elevatorsInfo.some(
          (elevator) => !elevator.moving && !elevator.waiting
        )
      )
        return;
      const nextFloor = this.queueCall.shift();
      const elevatorsMinDifference = [];
      for (let i = 0; i < this.elevatorsCount; i++) {
        const elevator = this.elevatorsInfo[i];
        if (!elevator.moving && !elevator.waiting) {
          elevatorsMinDifference.push([
            i,
            Math.abs(elevator.floor - nextFloor),
          ]);
        }
      }
      let minIndex = elevatorsMinDifference.sort((a, b) => a[1] - b[1])[0][0];
      this.moveElevator(minIndex, nextFloor);
    },
    async moveElevator(indexElevator, floor) {
      const floorDifference = this.elevatorsInfo[indexElevator].floor - floor;
      this.elevatorsInfo[indexElevator].moving = true;
      this.elevatorsInfo[indexElevator].nextFloor = floor;
      this.elevatorsInfo[indexElevator].timeout = Math.abs(floorDifference);
      this.elevatorsInfo[indexElevator].translate = 100 * floorDifference;
      await wait(this.elevatorsInfo[indexElevator].timeout * 1000);
      this.waitingButtons[floor - 1] = false;
      this.elevatorsInfo[indexElevator].moving = false;
      this.elevatorsInfo[indexElevator].waiting = true;
      this.elevatorsInfo[indexElevator].floor = floor;
      await wait(3000);
      this.elevatorsInfo[indexElevator].waiting = false;
      this.checkUpdates = !this.checkUpdates;
    },
  },
  watch: {
    checkUpdates() {
      this.selectElevator();
    },
  },
};
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
</style>
