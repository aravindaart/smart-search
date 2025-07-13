import { Component, Prop, Event, EventEmitter, State, Element, Watch, h, Host } from '@stencil/core';
import { SearchResult, FilterMode, Theme, SearchInputEventDetail, SearchSelectEventDetail } from '../../types';
import { filterResults, generateId } from '../../utils/search';

@Component({
  tag: 'smart-search',
  styleUrl: 'smart-search.css',
  shadow: true,
})
export class SmartSearch {
  @Element() el!: HTMLElement;

  // Props - Inherit from both input and results components
  @Prop() placeholder: string = 'Search...';
  @Prop({ mutable: true }) value: string = '';
  @Prop() disabled: boolean = false;
  @Prop() loading: boolean = false;
  @Prop() clearable: boolean = true;
  @Prop() debounceTime: number = 300;
  @Prop() minSearchLength: number = 2;
  @Prop() maxResults: number = 10;
  @Prop() theme: Theme = 'light';
  @Prop() autoFocus: boolean = false;

  // Search specific props
  @Prop() dataSource: SearchResult[] | string = [];
  @Prop() searchFields: string[] = ['title', 'subtitle', 'description'];
  @Prop() filterMode: FilterMode = 'contains';
  @Prop() caseSensitive: boolean = false;
  @Prop() groupBy: string = '';
  @Prop() noResultsMessage: string = 'No results found';

  // Events
  @Event() searchInput!: EventEmitter<SearchInputEventDetail>;
  @Event() searchClear!: EventEmitter<void>;
  @Event() searchFocus!: EventEmitter<FocusEvent>;
  @Event() searchBlur!: EventEmitter<FocusEvent>;
  @Event() resultSelect!: EventEmitter<SearchSelectEventDetail>;
  @Event() resultHover!: EventEmitter<SearchSelectEventDetail>;

  // State
  @State() isOpen: boolean = false;
  @State() filteredResults: SearchResult[] = [];
  @State() isLoading: boolean = false;
  @State() searchId: string = generateId('smart-search');

  private searchInputRef!: HTMLSmartSearchInputElement;
  private searchResultsRef!: HTMLSmartSearchResultsElement;
  private staticDataSource: SearchResult[] = [];

  @Watch('dataSource')
  updateDataSource() {
    if (Array.isArray(this.dataSource)) {
      this.staticDataSource = this.dataSource;
    } else if (typeof this.dataSource === 'string') {
      // API endpoint - we'll implement this later
      this.staticDataSource = [];
    }
  }

  @Watch('theme')
  updateTheme() {
    this.el.setAttribute('data-theme', this.theme);
  }

  componentWillLoad() {
    this.updateDataSource();
  }

  componentDidLoad() {
    this.el.setAttribute('data-theme', this.theme);
    
    // Add click outside listener
    document.addEventListener('click', this.handleClickOutside);
    document.addEventListener('focusin', this.handleFocusChange);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleClickOutside);
    document.removeEventListener('focusin', this.handleFocusChange);
  }

  private handleClickOutside = (event: Event) => {
    if (!this.el.contains(event.target as Node)) {
      this.closeResults();
    }
  };

  private handleFocusChange = (event: FocusEvent) => {
    if (!this.el.contains(event.target as Node)) {
      this.closeResults();
    }
  };

  private async performSearch(query: string): Promise<SearchResult[]> {
    if (typeof this.dataSource === 'string') {
      // API search
      try {
        this.isLoading = true;
        const response = await fetch(`${this.dataSource}?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        return Array.isArray(data) ? data : data.results || [];
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Search API error:', error);
        return [];
      } finally {
        this.isLoading = false;
      }
    } else {
      // Static data search
      return filterResults(
        this.staticDataSource,
        query,
        this.filterMode,
        this.searchFields,
        this.caseSensitive
      );
    }
  }

  private handleSearchInput = async (event: CustomEvent<SearchInputEventDetail>) => {
    const { query } = event.detail;
    this.value = query;

    // Emit the search input event
    this.searchInput.emit(event.detail);

    if (query.length >= this.minSearchLength) {
      this.isOpen = true;
      this.filteredResults = await this.performSearch(query);
    } else if (query.length === 0) {
      this.isOpen = false;
      this.filteredResults = [];
    }
  };

  private handleSearchClear = () => {
    this.value = '';
    this.isOpen = false;
    this.filteredResults = [];
    this.searchClear.emit();
  };

  private handleSearchFocus = (event: CustomEvent<FocusEvent>) => {
    this.searchFocus.emit(event.detail);
    
    // Show results if we have a search value
    if (this.value.length >= this.minSearchLength) {
      this.isOpen = true;
    }
  };

  private handleSearchBlur = (event: CustomEvent<FocusEvent>) => {
    // Delay closing to allow for result selection
    setTimeout(() => {
      this.searchBlur.emit(event.detail);
    }, 150);
  };

  private handleResultSelect = (event: CustomEvent<SearchSelectEventDetail>) => {
    const { result } = event.detail;
    
    // Update input value with selected result
    this.value = result.title;
    this.closeResults();
    
    // Emit the selection event
    this.resultSelect.emit(event.detail);
    
    // Update input component value
    if (this.searchInputRef) {
      this.searchInputRef.value = result.title;
    }
  };

  private handleResultHover = (event: CustomEvent<SearchSelectEventDetail>) => {
    this.resultHover.emit(event.detail);
  };

  private closeResults() {
    this.isOpen = false;
  }

  private updateInputAriaAttributes() {
    if (this.searchInputRef && this.searchResultsRef) {
      const input = this.searchInputRef.shadowRoot?.querySelector('input');
      if (input) {
        input.setAttribute('aria-expanded', this.isOpen.toString());
        input.setAttribute('aria-owns', 'search-results-list');
      }
    }
  }

  componentDidUpdate() {
    this.updateInputAriaAttributes();
  }

  render() {
    const containerClasses = {
      'smart-search-container': true,
      'smart-search-container--open': this.isOpen,
      'smart-search-container--loading': this.isLoading || this.loading,
    };

    return (
      <Host>
        <div class={containerClasses}>
          <smart-search-input
            ref={el => this.searchInputRef = el}
            placeholder={this.placeholder}
            value={this.value}
            disabled={this.disabled}
            loading={this.isLoading || this.loading}
            clearable={this.clearable}
            debounceTime={this.debounceTime}
            minSearchLength={this.minSearchLength}
            theme={this.theme}
            autoFocus={this.autoFocus}
            onSearchInput={this.handleSearchInput}
            onSearchClear={this.handleSearchClear}
            onSearchFocus={this.handleSearchFocus}
            onSearchBlur={this.handleSearchBlur}
          />

          {h('smart-search-results', {
            ref: el => this.searchResultsRef = el,
            results: this.filteredResults,
            loading: this.isLoading,
            visible: this.isOpen,
            maxResults: this.maxResults,
            groupBy: this.groupBy,
            highlightTerm: this.value,
            noResultsMessage: this.noResultsMessage,
            theme: this.theme,
            onResultSelect: this.handleResultSelect,
            onResultHover: this.handleResultHover,
          })}
        </div>
      </Host>
    );
  }
}