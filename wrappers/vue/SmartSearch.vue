<template>
  <smart-search
    ref="searchElement"
    :placeholder="placeholder"
    :value="value"
    :disabled="disabled"
    :loading="loading"
    :clearable="clearable"
    :debounce-time="debounceTime"
    :min-search-length="minSearchLength"
    :max-results="maxResults"
    :theme="theme"
    :auto-focus="autoFocus"
    :filter-mode="filterMode"
    :case-sensitive="caseSensitive"
    :group-by="groupBy"
    :no-results-message="noResultsMessage"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';
import { defineCustomElements } from '@aravindaart/smart-search/loader';

export interface SearchResult {
  id: string | number;
  title: string;
  subtitle?: string;
  description?: string;
  category?: string;
  metadata?: Record<string, unknown>;
  icon?: string;
  url?: string;
  disabled?: boolean;
}

export interface SearchInputEventDetail {
  value: string;
  query: string;
}

export interface SearchSelectEventDetail {
  result: SearchResult;
  index: number;
}

interface Props {
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  loading?: boolean;
  clearable?: boolean;
  debounceTime?: number;
  minSearchLength?: number;
  maxResults?: number;
  theme?: 'light' | 'dark';
  autoFocus?: boolean;
  dataSource?: SearchResult[] | string;
  searchFields?: string[];
  filterMode?: 'contains' | 'startsWith' | 'fuzzy';
  caseSensitive?: boolean;
  groupBy?: string;
  noResultsMessage?: string;
}

interface Emits {
  searchInput: [event: SearchInputEventDetail];
  searchClear: [];
  searchFocus: [event: FocusEvent];
  searchBlur: [event: FocusEvent];
  resultSelect: [event: SearchSelectEventDetail];
  resultHover: [event: SearchSelectEventDetail];
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search...',
  value: '',
  disabled: false,
  loading: false,
  clearable: true,
  debounceTime: 300,
  minSearchLength: 2,
  maxResults: 10,
  theme: 'light',
  autoFocus: false,
  dataSource: () => [],
  searchFields: () => ['title', 'subtitle', 'description'],
  filterMode: 'contains',
  caseSensitive: false,
  groupBy: '',
  noResultsMessage: 'No results found'
});

const emit = defineEmits<Emits>();

const searchElement = ref<any>(null);
const isComponentReady = ref(false);

// Initialize custom elements
onMounted(async () => {
  try {
    await defineCustomElements();
    await customElements.whenDefined('smart-search');
    isComponentReady.value = true;
    
    await nextTick();
    setupComponent();
  } catch (error) {
    console.error('Failed to initialize SmartSearch component:', error);
  }
});

// Watch for data source changes
watch(() => props.dataSource, (newDataSource) => {
  if (isComponentReady.value && searchElement.value) {
    searchElement.value.dataSource = newDataSource;
  }
}, { deep: true });

// Watch for search fields changes
watch(() => props.searchFields, (newSearchFields) => {
  if (isComponentReady.value && searchElement.value) {
    searchElement.value.searchFields = newSearchFields;
  }
}, { deep: true });

function setupComponent() {
  if (!searchElement.value) return;

  const element = searchElement.value;

  // Set properties
  element.dataSource = props.dataSource;
  element.searchFields = props.searchFields;

  // Add event listeners
  element.addEventListener('searchInput', (event: CustomEvent<SearchInputEventDetail>) => {
    emit('searchInput', event.detail);
  });

  element.addEventListener('searchClear', () => {
    emit('searchClear');
  });

  element.addEventListener('searchFocus', (event: CustomEvent<FocusEvent>) => {
    emit('searchFocus', event.detail);
  });

  element.addEventListener('searchBlur', (event: CustomEvent<FocusEvent>) => {
    emit('searchBlur', event.detail);
  });

  element.addEventListener('resultSelect', (event: CustomEvent<SearchSelectEventDetail>) => {
    emit('resultSelect', event.detail);
  });

  element.addEventListener('resultHover', (event: CustomEvent<SearchSelectEventDetail>) => {
    emit('resultHover', event.detail);
  });
}

// Expose methods to parent
defineExpose({
  focus: () => {
    if (searchElement.value) {
      const input = searchElement.value.shadowRoot?.querySelector('smart-search-input')?.shadowRoot?.querySelector('input');
      input?.focus();
    }
  },
  blur: () => {
    if (searchElement.value) {
      const input = searchElement.value.shadowRoot?.querySelector('smart-search-input')?.shadowRoot?.querySelector('input');
      input?.blur();
    }
  },
  clear: () => {
    if (searchElement.value) {
      searchElement.value.value = '';
    }
  },
  setValue: (newValue: string) => {
    if (searchElement.value) {
      searchElement.value.value = newValue;
    }
  },
  getValue: () => {
    return searchElement.value?.value || '';
  }
});
</script>

<style scoped>
/* Component styles are handled by the web component itself */
</style>