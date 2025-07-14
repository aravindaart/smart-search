import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
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

export interface SmartSearchProps {
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
  onSearchInput?: (event: SearchInputEventDetail) => void;
  onSearchClear?: () => void;
  onSearchFocus?: (event: FocusEvent) => void;
  onSearchBlur?: (event: FocusEvent) => void;
  onResultSelect?: (event: SearchSelectEventDetail) => void;
  onResultHover?: (event: SearchSelectEventDetail) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface SmartSearchRef {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  setValue: (value: string) => void;
  getValue: () => string;
}

export const SmartSearch = forwardRef<SmartSearchRef, SmartSearchProps>(({
  placeholder = 'Search...',
  value = '',
  disabled = false,
  loading = false,
  clearable = true,
  debounceTime = 300,
  minSearchLength = 2,
  maxResults = 10,
  theme = 'light',
  autoFocus = false,
  dataSource = [],
  searchFields = ['title', 'subtitle', 'description'],
  filterMode = 'contains',
  caseSensitive = false,
  groupBy = '',
  noResultsMessage = 'No results found',
  onSearchInput,
  onSearchClear,
  onSearchFocus,
  onSearchBlur,
  onResultSelect,
  onResultHover,
  className,
  style,
  ...props
}, ref) => {
  const elementRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);

  // Expose imperative methods
  useImperativeHandle(ref, () => ({
    focus: () => {
      if (elementRef.current) {
        const input = elementRef.current.shadowRoot?.querySelector('smart-search-input')?.shadowRoot?.querySelector('input');
        input?.focus();
      }
    },
    blur: () => {
      if (elementRef.current) {
        const input = elementRef.current.shadowRoot?.querySelector('smart-search-input')?.shadowRoot?.querySelector('input');
        input?.blur();
      }
    },
    clear: () => {
      if (elementRef.current) {
        elementRef.current.value = '';
      }
    },
    setValue: (newValue: string) => {
      if (elementRef.current) {
        elementRef.current.value = newValue;
      }
    },
    getValue: () => {
      return elementRef.current?.value || '';
    }
  }), []);

  // Initialize custom elements
  useEffect(() => {
    const initializeComponent = async () => {
      try {
        await defineCustomElements();
        await customElements.whenDefined('smart-search');
        setIsReady(true);
      } catch (error) {
        console.error('Failed to initialize SmartSearch component:', error);
      }
    };

    initializeComponent();
  }, []);

  // Set data source when component is ready
  useEffect(() => {
    if (isReady && elementRef.current && dataSource) {
      elementRef.current.dataSource = dataSource;
    }
  }, [isReady, dataSource]);

  // Set search fields when component is ready
  useEffect(() => {
    if (isReady && elementRef.current && searchFields) {
      elementRef.current.searchFields = searchFields;
    }
  }, [isReady, searchFields]);

  // Add event listeners when component is ready
  useEffect(() => {
    if (!isReady || !elementRef.current) return;

    const element = elementRef.current;

    const handleSearchInput = (event: CustomEvent<SearchInputEventDetail>) => {
      onSearchInput?.(event.detail);
    };

    const handleSearchClear = () => {
      onSearchClear?.();
    };

    const handleSearchFocus = (event: CustomEvent<FocusEvent>) => {
      onSearchFocus?.(event.detail);
    };

    const handleSearchBlur = (event: CustomEvent<FocusEvent>) => {
      onSearchBlur?.(event.detail);
    };

    const handleResultSelect = (event: CustomEvent<SearchSelectEventDetail>) => {
      onResultSelect?.(event.detail);
    };

    const handleResultHover = (event: CustomEvent<SearchSelectEventDetail>) => {
      onResultHover?.(event.detail);
    };

    // Add event listeners
    element.addEventListener('searchInput', handleSearchInput);
    element.addEventListener('searchClear', handleSearchClear);
    element.addEventListener('searchFocus', handleSearchFocus);
    element.addEventListener('searchBlur', handleSearchBlur);
    element.addEventListener('resultSelect', handleResultSelect);
    element.addEventListener('resultHover', handleResultHover);

    // Cleanup
    return () => {
      element.removeEventListener('searchInput', handleSearchInput);
      element.removeEventListener('searchClear', handleSearchClear);
      element.removeEventListener('searchFocus', handleSearchFocus);
      element.removeEventListener('searchBlur', handleSearchBlur);
      element.removeEventListener('resultSelect', handleResultSelect);
      element.removeEventListener('resultHover', handleResultHover);
    };
  }, [isReady, onSearchInput, onSearchClear, onSearchFocus, onSearchBlur, onResultSelect, onResultHover]);

  if (!isReady) {
    return <div className={className} style={style}>Loading...</div>;
  }

  return (
    <smart-search
      ref={elementRef}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      loading={loading}
      clearable={clearable}
      debounce-time={debounceTime}
      min-search-length={minSearchLength}
      max-results={maxResults}
      theme={theme}
      auto-focus={autoFocus}
      filter-mode={filterMode}
      case-sensitive={caseSensitive}
      group-by={groupBy}
      no-results-message={noResultsMessage}
      className={className}
      style={style}
      {...props}
    />
  );
});

SmartSearch.displayName = 'SmartSearch';

export default SmartSearch;