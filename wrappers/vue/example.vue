<!-- Example usage of Vue wrapper -->
<template>
  <div style="padding: 20px; max-width: 600px; margin: 0 auto;">
    <h1>Smart Search Vue Wrapper Example</h1>
    
    <SmartSearch
      ref="searchComponent"
      placeholder="Search accounts, transactions..."
      theme="light"
      :maxResults="10"
      :debounceTime="300"
      :minSearchLength="2"
      :dataSource="searchData"
      @searchInput="onSearchInput"
      @resultSelect="onResultSelect"
      style="margin-bottom: 20px;"
    />
    
    <button @click="clearSearch" style="margin-top: 10px;">
      Clear Search
    </button>
    
    <div style="margin-top: 20px; font-size: 14px; color: #666;">
      <p>Try searching for: "checking", "savings", "account"</p>
      <p>This example demonstrates the Vue wrapper with TypeScript support.</p>
      <p v-if="lastSearchQuery">Last search: {{ lastSearchQuery }}</p>
      <p v-if="lastSelectedResult">Last selected: {{ lastSelectedResult?.title }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SmartSearch from './SmartSearch.vue';
import type { SearchResult, SearchInputEventDetail, SearchSelectEventDetail } from './SmartSearch.vue';

const searchComponent = ref();

const searchData = ref<SearchResult[]>([
  {
    id: 1,
    title: 'Checking Account',
    subtitle: '****1234',
    description: 'Available Balance: $5,430.50',
    category: 'accounts'
  },
  {
    id: 2,
    title: 'Savings Account',
    subtitle: '****5678',
    description: 'Available Balance: $12,750.00',
    category: 'accounts'
  }
]);

const lastSearchQuery = ref<string>('');
const lastSelectedResult = ref<SearchResult | null>(null);

const onSearchInput = (event: SearchInputEventDetail) => {
  console.log('Search input:', event.query);
  lastSearchQuery.value = event.query;
};

const onResultSelect = (event: SearchSelectEventDetail) => {
  console.log('Result selected:', event.result);
  lastSelectedResult.value = event.result;
  alert(`Selected: ${event.result.title}`);
};

const clearSearch = () => {
  searchComponent.value?.clear();
  lastSearchQuery.value = '';
  lastSelectedResult.value = null;
};
</script>