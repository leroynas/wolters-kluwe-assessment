<template>
  <app-modal :title="$t('ticket')">
    <div class="form-group">
      <label>{{ $t('full-name') }}</label>

      <input type="text" required class="form-control" v-model="name" />
    </div>

    <div class="form-group">
      <label>{{ $t('subject') }}</label>

      <select class="form-control" name="subject" v-model="subject">
        <option>Hoe kan ik inloggen?</option>
        <option>Waarom werkt de site niet in Internet Explorer?</option>
        <option>Ik ben mijn wachtwoord vergeten!</option>
        <option>Overig</option>
      </select>
    </div>

    <div class="form-group">
      <label><strong>Contact bij status wijziging:</strong></label>

      <select class="form-control">
        <option>E-mail</option>
        <option>SMS</option>
        <option>Telefonisch</option>
      </select>
    </div>

    <template v-slot:actions>
      <app-button type="secondary" @click="$emit('close')">
        {{ $t('close') }}
      </app-button>

      <app-button type="primary" @click="handleSave">{{
        $t('save')
      }}</app-button>
    </template>
  </app-modal>
</template>

<script lang="ts">
import { AddItem, AddItemSymbol, Item, STATUSES } from '@/App.vue';
import { defineComponent, inject, ref } from 'vue';
import { v4 as uuid } from 'uuid';

export default defineComponent({
  emits: ['close'],

  setup(props, { emit }) {
    const addItem = inject<AddItem>(AddItemSymbol);

    const name = ref();
    const subject = ref();

    const handleSave = () => {
      addItem?.({
        id: uuid(),
        name: name.value,
        subject: subject.value,
        status: STATUSES.OPEN,
      } as Item);

      emit('close');
    };

    return {
      name,
      subject,
      handleSave,
    };
  },
});
</script>
