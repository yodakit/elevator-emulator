<template>
  <the-floors :floorsCount="floorsCount" :elevatorsCount="elevatorsCount"/>
</template>

<script>
import TheFloors from "@/components/TheFloors.vue"
export default {
  name: 'App',
  components: {
    TheFloors
  },
  data() {
    return {
      floorsCount: 7,
      elevatorsCount: 5,
    }
  },
}
</script>

<style lang="scss">
@import './styles/global.scss';

</style>
