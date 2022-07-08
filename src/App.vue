<template>
  <div v-for="i in floors" :key="i" class="floor">
    <div class="floor__cell">
      <div
        v-if="floor === i"
        class="elevator"
        :style="[moving && {'transform': `translate(0, ${-100 * (floor-i)}px`}]"
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
export default {
  name: 'App',
  components: {},
  data () {
    return {
      floors: [6, 5, 4, 3, 2, 1],
      floor: 1,
      moving: false
    }
  },
  methods: {
    moveElevator (floor) {
      this.floor = floor;
      this.moving = true
      console.log(this.floor);
      // while(this.floor !== floor) {

      // }
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
  transition: all 1s linear;
  &-move {
    transform: translate(0, -100px);
  }
}
</style>
