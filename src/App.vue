<template>
  <div class="container">
    <div class="row">
      <Overview :items="items" @addItem="addItem" @updateItem="updateItem" />

      <Statistics :items="items" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { v4 as uuid } from 'uuid';

enum STATUSES {
  OPEN = 'open',
  CLOSED = 'closed',
}

type Item = {
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
