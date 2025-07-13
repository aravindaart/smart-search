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

export interface SearchConfig {
  placeholder?: string;
  debounceTime?: number;
  minSearchLength?: number;
  maxResults?: number;
  caseSensitive?: boolean;
  filterMode?: 'contains' | 'startsWith' | 'fuzzy';
  groupBy?: string;
  searchFields?: string[];
  theme?: 'light' | 'dark';
}

export interface SearchError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface SearchEventDetail {
  query: string;
  results?: SearchResult[];
  error?: SearchError;
}

export interface SearchInputEventDetail {
  value: string;
  query: string;
}

export interface SearchSelectEventDetail {
  result: SearchResult;
  index: number;
}

export type FilterMode = 'contains' | 'startsWith' | 'fuzzy';
export type Theme = 'light' | 'dark';