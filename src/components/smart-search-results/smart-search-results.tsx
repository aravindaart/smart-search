import { Component, Prop, Event, EventEmitter, State, Element, Watch, Host, h } from '@stencil/core';
import { SearchResult, SearchSelectEventDetail, Theme } from '../../types';
import { highlightText, groupResults, generateId, scrollIntoView } from '../../utils/search';

@Component({
  tag: 'smart-search-results',
  styleUrl: 'smart-search-results.css',
  shadow: true,
})
export class SmartSearchResults {
  @Element() el!: HTMLElement;

  // Props
  @Prop() results: SearchResult[] = [];
  @Prop() loading: boolean = false;
  @Prop() visible: boolean = false;
  @Prop() maxResults: number = 10;
  @Prop() groupBy: string = '';
  @Prop() highlightTerm: string = '';
  @Prop() noResultsMessage: string = 'No results found';
  @Prop() theme: Theme = 'light';
  @Prop() virtualScrolling: boolean = false;

  // Events
  @Event() resultSelect!: EventEmitter<SearchSelectEventDetail>;
  @Event() resultHover!: EventEmitter<SearchSelectEventDetail>;

  // State
  @State() activeIndex: number = -1;
  @State() listId: string = generateId('search-results');

  private resultsContainerRef!: HTMLElement;
  private flatResults: SearchResult[] = [];

  @Watch('results')
  @Watch('maxResults')
  updateFlatResults() {
    this.flatResults = this.results.slice(0, this.maxResults);
    this.activeIndex = -1;
  }

  @Watch('theme')
  updateTheme() {
    this.el.setAttribute('data-theme', this.theme);
  }

  componentDidLoad() {
    this.el.setAttribute('data-theme', this.theme);
    this.updateFlatResults();
    
    // Listen for keyboard events from parent
    document.addEventListener('searchKeyDown', this.handleKeyDown);
  }

  disconnectedCallback() {
    document.removeEventListener('searchKeyDown', this.handleKeyDown);
  }

  private handleKeyDown = (event: CustomEvent) => {
    if (!this.visible || this.flatResults.length === 0) return;

    const { key } = event.detail;

    switch (key) {
      case 'ArrowDown':
        event.detail.originalEvent?.preventDefault();
        this.navigateDown();
        break;
      case 'ArrowUp':
        event.detail.originalEvent?.preventDefault();
        this.navigateUp();
        break;
      case 'Enter':
        event.detail.originalEvent?.preventDefault();
        this.selectActive();
        break;
      case 'Escape':
        this.activeIndex = -1;
        break;
      case 'Home':
        event.detail.originalEvent?.preventDefault();
        this.setActiveIndex(0);
        break;
      case 'End':
        event.detail.originalEvent?.preventDefault();
        this.setActiveIndex(this.flatResults.length - 1);
        break;
    }
  };

  private navigateDown() {
    const newIndex = this.activeIndex < this.flatResults.length - 1 ? this.activeIndex + 1 : 0;
    this.setActiveIndex(newIndex);
  }

  private navigateUp() {
    const newIndex = this.activeIndex > 0 ? this.activeIndex - 1 : this.flatResults.length - 1;
    this.setActiveIndex(newIndex);
  }

  private setActiveIndex(index: number) {
    this.activeIndex = index;
    
    // Scroll active item into view
    const activeElement = this.resultsContainerRef?.querySelector(`[data-index="${index}"]`);
    if (activeElement) {
      scrollIntoView(activeElement, this.resultsContainerRef);
    }
  }

  private selectActive() {
    if (this.activeIndex >= 0 && this.activeIndex < this.flatResults.length) {
      this.selectResult(this.flatResults[this.activeIndex], this.activeIndex);
    }
  }

  private selectResult(result: SearchResult, index: number) {
    this.resultSelect.emit({ result, index });
  }

  private handleResultClick = (result: SearchResult, index: number) => {
    this.selectResult(result, index);
  };

  private handleResultHover = (result: SearchResult, index: number) => {
    this.activeIndex = index;
    this.resultHover.emit({ result, index });
  };

  private renderResult(result: SearchResult, index: number) {
    const isActive = index === this.activeIndex;
    const resultClasses = {
      'result-item': true,
      'result-item--active': isActive,
      'result-item--disabled': result.disabled,
    };

    return (
      <div
        key={result.id}
        class={resultClasses}
        data-index={index}
        role="option"
        aria-selected={isActive}
        aria-disabled={result.disabled}
        onClick={() => !result.disabled && this.handleResultClick(result, index)}
        onMouseEnter={() => !result.disabled && this.handleResultHover(result, index)}
      >
        {result.icon && (
          <div class="result-icon">
            <img src={result.icon} alt="" aria-hidden="true" />
          </div>
        )}
        
        <div class="result-content">
          <div 
            class="result-title"
            innerHTML={this.highlightTerm ? highlightText(result.title, this.highlightTerm) : result.title}
          />
          
          {result.subtitle && (
            <div 
              class="result-subtitle"
              innerHTML={this.highlightTerm ? highlightText(result.subtitle, this.highlightTerm) : result.subtitle}
            />
          )}
          
          {result.description && (
            <div 
              class="result-description"
              innerHTML={this.highlightTerm ? highlightText(result.description, this.highlightTerm) : result.description}
            />
          )}
        </div>
        
        {result.category && (
          <div class="result-category">
            {result.category}
          </div>
        )}
      </div>
    );
  }

  private renderGroupedResults() {
    const grouped = groupResults(this.flatResults, this.groupBy);
    let currentIndex = 0;

    return Object.entries(grouped).map(([category, results]) => (
      <div class="result-group" key={category}>
        <div class="result-group-header" role="presentation">
          {category}
        </div>
        <div class="result-group-items" role="group" aria-label={category}>
          {results.map(result => {
            const resultElement = this.renderResult(result, currentIndex);
            currentIndex++;
            return resultElement;
          })}
        </div>
      </div>
    ));
  }

  private renderLoadingState() {
    return (
      <div class="loading-state" role="status" aria-live="polite">
        <div class="loading-spinner">
          <svg class="spinner" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-dasharray="32" stroke-dashoffset="32">
              <animate attributeName="stroke-dashoffset" dur="1s" values="32;0;32" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
        <span class="loading-text">Searching...</span>
      </div>
    );
  }

  private renderEmptyState() {
    return (
      <div class="empty-state" role="status" aria-live="polite">
        <div class="empty-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>
        <span class="empty-text">{this.noResultsMessage}</span>
      </div>
    );
  }

  render() {
    if (!this.visible) {
      return <Host style={{ display: 'none' }} />;
    }

    const containerClasses = {
      'results-container': true,
      'results-container--loading': this.loading,
      'results-container--empty': !this.loading && this.flatResults.length === 0,
    };

    return (
      <Host>
        <div
          class={containerClasses}
          ref={el => this.resultsContainerRef = el}
          role="listbox"
          id={this.listId}
          aria-label="Search results"
        >
          {this.loading ? (
            this.renderLoadingState()
          ) : this.flatResults.length === 0 ? (
            this.renderEmptyState()
          ) : (
            <div class="results-list">
              {this.groupBy ? (
                this.renderGroupedResults()
              ) : (
                this.flatResults.map((result, index) => this.renderResult(result, index))
              )}
            </div>
          )}
        </div>
      </Host>
    );
  }
}