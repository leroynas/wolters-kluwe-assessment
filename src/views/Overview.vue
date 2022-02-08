<template>
  <section>
    <h1>
      {{ $t('ticket-overview') }}

      <app-button type="primary" @click="toggleAddModal">
        {{ $t('add') }}
      </app-button>
    </h1>

    <table class="table">
      <thead>
        <tr>
          <th>{{ $t('full-name') }}</th>
          <th>{{ $t('subject') }}</th>
          <th>{{ $t('status') }}</th>
          <th>{{ $t('actions') }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ $t(`subjects.${item.subject}`) }}</td>
          <td>{{ $t(item.status) }}</td>

          <td>
            <app-button type="info" @click="openItem(item)">
              {{
                item.status === STATUSES.OPEN ? $t('status-update') : $t('view')
              }}
            </app-button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>

  <AddItem v-if="addModal" @close="toggleAddModal" />
  <ViewItem v-if="openedItem" :item="openedItem" @close="closeItem" />
</template>

<script lang="ts">
import { Item, STATUSES } from '@/App.vue';
import { defineComponent, ref } from 'vue';

import AddItem from './modals/AddItem.vue';
import ViewItem from './modals/ViewItem.vue';

export default defineComponent({
  components: {
    AddItem,
    ViewItem,
  },

  props: {
    items: {
      type: Object as () => Item[],
      required: true,
    },
  },

  setup() {
    const openedItem = ref();
    const addModal = ref(false);

    const toggleAddModal = () => {
      addModal.value = !addModal.value;
    };

    const openItem = (item: Item) => {
      openedItem.value = item;
    };

    const closeItem = () => {
      openedItem.value = undefined;
    };

    return {
      STATUSES,
      openedItem,
      addModal,
      toggleAddModal,
      openItem,
      closeItem,
    };
  },
});
</script>
