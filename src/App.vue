<template>
  <div class="container">
    <h1>Helpdesk v1.0</h1>

    <div class="row">
      <div class="col-lg-6">
        <Overview :items="items" @addItem="addItem" @updateItem="updateItem" />
      </div>

      <div class="col-lg-6">
        <Statistics :items="items" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { v4 as uuid } from 'uuid';

import Overview from './views/Overview.vue';
import Statistics from './views/Statistics.vue';

export enum STATUSES {
  OPEN = 'open',
  CLOSED = 'closed',
}

export type Item = {
  id: string;
  name: string;
  subject: string;
  status: STATUSES;
};

const INIT_ITEMS: Item[] = [
  {
    id: uuid(),
    name: 'Jan Willem',
    subject: 'Hoe kan ik inloggen?',
    status: STATUSES.OPEN,
  },
  {
    id: uuid(),
    name: 'Jan Willem',
    subject: 'Hoe kan ik inloggen?',
    status: STATUSES.CLOSED,
  },
];

export default defineComponent({
  components: {
    Overview,
    Statistics,
  },

  setup() {
    const items = ref(INIT_ITEMS);

    const addItem = (item: Item) => {
      items.value = [item, ...items.value];
    };

    const updateItem = (item: Item) => {
      items.value = items.value.map((stateItem) =>
        stateItem.id === item.id ? item : stateItem,
      );
    };

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
