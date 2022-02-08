<template>
  <div class="container">
    <h1>Helpdesk v1.0</h1>

    <div class="row">
      <div class="col-lg-6">
        <Overview :items="items" />
      </div>

      <div class="col-lg-6">
        <Statistics :items="items" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from 'vue';
import { v4 as uuid } from 'uuid';

import Overview from './views/Overview.vue';
import Statistics from './views/Statistics.vue';

export enum SUBJECTS {
  HOW_TO_LOGIN = 'how-to-login',
  WHY_DOES_IE_NOT_WORK = 'why-does-ie-not-work',
  LOST_PASSWORD = 'lost-password',
  OTHER = 'other',
}

export enum CONTACT {
  EMAIL = 'email',
  SMS = 'sms',
  PHONE = 'phone',
}

export enum STATUSES {
  OPEN = 'open',
  CLOSED = 'closed',
}

export type Item = {
  id: string;
  name: string;
  subject: string;
  status: STATUSES;
  contact?: string;
};

export type UpdateItemFunc = (item: Item) => void;
export type AddItemFunc = (item: Item) => void;

const INIT_ITEMS: Item[] = [
  {
    id: uuid(),
    name: 'Jan Willem',
    subject: SUBJECTS.HOW_TO_LOGIN,
    status: STATUSES.OPEN,
  },
  {
    id: uuid(),
    name: 'Jan Willem',
    subject: SUBJECTS.HOW_TO_LOGIN,
    status: STATUSES.CLOSED,
  },
];

export const AddItemSymbol = Symbol('AddItemSymbol');
export const UpdateItemSymbol = Symbol('UpdateItemSymbol');

export default defineComponent({
  components: {
    Overview,
    Statistics,
  },

  setup() {
    const items = ref(INIT_ITEMS);

    const addItem: AddItemFunc = (item: Item) => {
      items.value = [item, ...items.value];
    };

    const updateItem: UpdateItemFunc = (item: Item) => {
      items.value = items.value.map((stateItem) =>
        stateItem.id === item.id ? item : stateItem,
      );
    };

    provide(AddItemSymbol, addItem);
    provide(UpdateItemSymbol, updateItem);

    return {
      items,
      addItem,
      updateItem,
    };
  },
});
</script>

<style>
body {
  padding: 16px;
}

h1 {
  font-size: 1.5rem;
  margin: 8px;
}

.container {
  max-width: 100%;
}

section {
  border: 1px solid #ccc;
  background-color: #efefef;
  border-radius: 4px;
}

h1 select.form-control {
  max-width: 150px;
  display: inline-block;
}

.help-block {
  color: red;
}
</style>
