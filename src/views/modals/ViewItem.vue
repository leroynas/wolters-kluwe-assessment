<template>
  <app-modal :title="$t('ticket')">
    <div class="form-group">
      <label><strong>Volledige naam:</strong></label>
      <p>Jan willem</p>
    </div>

    <div class="form-group">
      <label><strong>Onderwerp:</strong></label>
      <p>Hoe kan ik inloggen?</p>
    </div>

    <div class="form-group">
      <label><strong>Contact bij status wijziging:</strong></label>
      <p>SMS</p>
    </div>

    <hr />

    <div class="form-group">
      <label>Status:</label>

      <select class="form-control" v-if="item.status === STATUSES.OPEN">
        <option>open</option>
        <option>gesloten</option>
      </select>

      <p v-else>gesloten</p>
    </div>

    <template v-slot:actions>
      <app-button type="secondary" @click="$emit('close')">
        {{ $t('close') }}
      </app-button>

      <app-button type="primary" @click="handleUpdate">
        {{ $t('save') }}
      </app-button>
    </template>
  </app-modal>
</template>

<script lang="ts">
import { Item, STATUSES, UpdateItem, UpdateItemSymbol } from '@/App.vue';
import { defineComponent, inject, ref } from 'vue';

export default defineComponent({
  props: {
    item: {
      type: Object as () => Item,
      required: true,
    },
  },

  emits: ['close'],

  setup(props, { emit }) {
    const status = ref(props.item.status);
    const updateItem = inject<UpdateItem>(UpdateItemSymbol);

    const handleUpdate = () => {
      updateItem?.({
        ...props.item,
        status: STATUSES.CLOSED,
      } as Item);

      emit('close');
    };

    return {
      STATUSES,
      handleUpdate,
      status,
    };
  },
});
</script>
