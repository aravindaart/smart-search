import SmartSearch from './SmartSearch.vue';
import type { App } from 'vue';

export { SmartSearch };

export type {
  SearchResult,
  SearchInputEventDetail,
  SearchSelectEventDetail
} from './SmartSearch.vue';

// Plugin for global registration
export default {
  install(app: App) {
    app.component('SmartSearch', SmartSearch);
  }
};