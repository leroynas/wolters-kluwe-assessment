<template>
  <section>
    <h1>
      {{ $t('ticket-statistics') }}

      <select class="form-control" v-model="type">
        <option value="all">{{ $t('all') }}</option>
        <option value="open">{{ $t('open') }}</option>
        <option value="closed">{{ $t('closed') }}</option>
      </select>
    </h1>

    <table class="table">
      <thead>
        <tr>
          <th>{{ $t('subject') }}</th>
          <th>{{ $t('amount') }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(items, subject) in list" :key="subject">
          <td>{{ subject }}</td>
          <td>{{ items.length }}x</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { Item, STATUSES } from '@/App.vue';
import { computed, defineComponent, ref } from 'vue';
import groupBy from 'lodash.groupby';

const ALL = 'all';
type TYPES = STATUSES | 'all';

type List = {
  [key: string]: Item[];
};

export default defineComponent({
  props: {
    items: {
      type: Object as () => Item[],
      required: true,
    },
  },

  setup(props) {
    const type = ref<TYPES>(ALL);

    const list = computed<List>(() =>
      groupBy(
        props.items.filter(
          (item) => type.value === ALL || type.value === item.status,
        ),
        'subject',
      ),
    );

    return {
      type,
      list,
    };
  },
});
</script>
