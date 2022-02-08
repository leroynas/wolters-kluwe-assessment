<template>
  <app-modal :title="$t('ticket')">
    <div class="form-group">
      <label>
        <strong>{{ $t('full-name') }}:</strong>
      </label>

      <p>{{ item.name }}</p>
    </div>

    <div class="form-group">
      <label>
        <strong>{{ $t('subject') }}:</strong>
      </label>

      <p>{{ $t(`subjects.${item.subject}`) }}</p>
    </div>

    <div class="form-group">
      <label>
        <strong>{{ $t('contact-by-status-change') }}</strong>
      </label>

      <p>{{ $t(`contact.${item.contact}`) }}</p>
    </div>

    <hr v-if="item.status === STATUSES.OPEN" />

    <div class="form-group">
      <label>
        <strong>{{ $t('status') }}</strong>
      </label>

      <select class="form-control" v-if="item.status === STATUSES.OPEN">
        <option :value="STATUSES.OPEN">{{ $t('open') }}</option>
        <option :value="STATUSES.CLOSED">{{ $t('closed') }}</option>
      </select>

      <p v-else>{{ $t('closed') }}</p>
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
import { Item, STATUSES, UpdateItemFunc, UpdateItemSymbol } from '@/App.vue';
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
    const updateItem = inject<UpdateItemFunc>(UpdateItemSymbol);

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
