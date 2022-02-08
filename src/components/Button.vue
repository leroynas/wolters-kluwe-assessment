<template>
  <button class="btn btn-sm" :class="`btn-${type}`" @click="$emit('click')">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

enum TYPES {
  PRIMARY = 'primary',
  INFO = 'info',
}

export default defineComponent({
  props: {
    type: {
      type: String as () => TYPES,
      required: true,
      validator: (value: TYPES) => Object.values(TYPES).includes(value),
    },
  },
});
</script>
