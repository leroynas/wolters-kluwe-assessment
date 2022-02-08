<template>
  <teleport to="body">
    <div
      class="modal fade show"
      :style="{ display: 'block' }"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
          </div>

          <div class="modal-body">
            <slot />
          </div>

          <div class="modal-footer" v-if="$slots.actions">
            <slot name="actions" />
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>
