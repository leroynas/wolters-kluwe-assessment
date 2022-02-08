<template>
  <app-modal :title="$t('ticket')">
    <div class="form-group">
      <label>
        <strong>{{ $t('full-name') }}</strong>
      </label>

      <input type="text" required class="form-control" v-model="name" />
    </div>

    <div class="form-group">
      <label>
        <strong>{{ $t('subject') }}</strong>
      </label>

      <select class="form-control" name="subject" v-model="subject">
        <option :value="SUBJECTS.HOW_TO_LOGIN">
          {{ $t('subjects.how-to-login') }}
        </option>
        <option :value="SUBJECTS.WHY_DOES_IE_NOT_WORK">
          {{ $t('subjects.why-does-ie-not-work') }}
        </option>
        <option :value="SUBJECTS.LOST_PASSWORD">
          {{ $t('subjects.lost-password') }}
        </option>
        <option :value="SUBJECTS.OTHER">{{ $t('subjects.other') }}</option>
      </select>
    </div>

    <div class="form-group">
      <label>
        <strong>{{ $t('contact-by-status-change') }}</strong>
      </label>

      <select class="form-control" v-model="contact">
        <option :value="CONTACT.EMAIL">{{ $t('contact.email') }}</option>
        <option :value="CONTACT.SMS">{{ $t('contact.sms') }}</option>
        <option :value="CONTACT.PHONE">{{ $t('contact.phone') }}</option>
      </select>
    </div>

    <template v-slot:actions>
      <app-button type="secondary" @click="$emit('close')">
        {{ $t('close') }}
      </app-button>

      <app-button type="primary" @click="handleSave">
        {{ $t('save') }}
      </app-button>
    </template>
  </app-modal>
</template>

<script lang="ts">
import {
  AddItemFunc,
  AddItemSymbol,
  CONTACT,
  Item,
  STATUSES,
  SUBJECTS,
} from '@/App.vue';
import { defineComponent, inject, ref } from 'vue';
import { v4 as uuid } from 'uuid';

export default defineComponent({
  emits: ['close'],

  setup(props, { emit }) {
    const addItem = inject<AddItemFunc>(AddItemSymbol);

    const name = ref();
    const subject = ref(SUBJECTS.HOW_TO_LOGIN);
    const contact = ref(CONTACT.EMAIL);

    const handleSave = () => {
      addItem?.({
        id: uuid(),
        name: name.value,
        subject: subject.value,
        status: STATUSES.OPEN,
        contact: contact.value,
      } as Item);

      emit('close');
    };

    return {
      SUBJECTS,
      CONTACT,
      name,
      subject,
      contact,
      handleSave,
    };
  },
});
</script>
