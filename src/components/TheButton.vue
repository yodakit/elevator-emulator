<template>
  <button
    :style="[
      isWaiting && {
        'border-color': 'var(--color-orange)',
      },
    ]"
    class="btn"
  >
    <svg class="btn__ring" width="18" height="18">
      <circle
        :style="[
          isWaiting && {
            stroke: 'var(--color-orange)',
          },
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
        isWaiting && {
          'background-color': 'var(--color-orange)',
        },
      ]"
      class="btn__inner"
    ></div>
  </button>
</template>

<script>
export default {
  name: "TheButton",
  props: {
    isWaiting: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
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
