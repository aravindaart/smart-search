import { Component, Prop, Event, EventEmitter, State, Watch, Element, Host, h } from '@stencil/core';
import { debounce, sanitizeInput, generateId } from '../../utils/search';
import { SearchInputEventDetail, Theme } from '../../types';

@Component({
  tag: 'smart-search-input',
  styleUrl: 'smart-search-input.css',
  shadow: true,
})
export class SmartSearchInput {
  @Element() el!: HTMLElement;

  // Props
  @Prop() placeholder: string = 'Search...';
  @Prop({ mutable: true }) value: string = '';
  @Prop() disabled: boolean = false;
  @Prop() loading: boolean = false;
  @Prop() clearable: boolean = true;
  @Prop() debounceTime: number = 300;
  @Prop() minSearchLength: number = 2;
  @Prop() theme: Theme = 'light';
  @Prop() autoFocus: boolean = false;
  @Prop() maxLength: number = 100;

  // Events
  @Event() searchInput!: EventEmitter<SearchInputEventDetail>;
  @Event() searchClear!: EventEmitter<void>;
  @Event() searchFocus!: EventEmitter<FocusEvent>;
  @Event() searchBlur!: EventEmitter<FocusEvent>;

  // State
  @State() focused: boolean = false;
  @State() inputId: string = generateId('search-input');

  private inputRef!: HTMLInputElement;
  private debouncedSearch: (value: string) => void;

  constructor() {
    this.debouncedSearch = debounce((value: string) => {
      this.emitSearchInput(value);
    }, this.debounceTime);
  }

  @Watch('debounceTime')
  updateDebounce() {
    this.debouncedSearch = debounce((value: string) => {
      this.emitSearchInput(value);
    }, this.debounceTime);
  }

  @Watch('theme')
  updateTheme() {
    this.el.setAttribute('data-theme', this.theme);
  }

  componentDidLoad() {
    this.el.setAttribute('data-theme', this.theme);
    if (this.autoFocus) {
      this.inputRef?.focus();
    }
  }

  private emitSearchInput(value: string) {
    const sanitizedValue = sanitizeInput(value);
    if (sanitizedValue.length >= this.minSearchLength || sanitizedValue.length === 0) {
      this.searchInput.emit({
        value: sanitizedValue,
        query: sanitizedValue,
      });
    }
  }

  private handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.debouncedSearch(this.value);
  };

  private handleFocus = (event: FocusEvent) => {
    this.focused = true;
    this.searchFocus.emit(event);
  };

  private handleBlur = (event: FocusEvent) => {
    this.focused = false;
    this.searchBlur.emit(event);
  };

  private handleClear = () => {
    this.value = '';
    this.inputRef.focus();
    this.searchClear.emit();
    this.emitSearchInput('');
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    // Allow parent components to handle arrow keys, enter, escape
    if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(event.key)) {
      event.stopPropagation();
      // Dispatch custom keyboard event
      const customEvent = new CustomEvent('searchKeyDown', {
        detail: { key: event.key, originalEvent: event },
        bubbles: true,
      });
      this.el.dispatchEvent(customEvent);
    }
  };

  render() {
    const showClearButton = this.clearable && this.value && !this.disabled;
    const inputClasses = {
      'search-input': true,
      'search-input--focused': this.focused,
      'search-input--loading': this.loading,
      'search-input--disabled': this.disabled,
    };

    return (
      <Host>
        <div class="search-input-container">
          <div class="search-input-wrapper">
            <svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            
            <input
              ref={el => this.inputRef = el}
              id={this.inputId}
              type="text"
              class={inputClasses}
              placeholder={this.placeholder}
              value={this.value}
              disabled={this.disabled}
              maxLength={this.maxLength}
              onInput={this.handleInput}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onKeyDown={this.handleKeyDown}
              role="combobox"
              aria-autocomplete="list"
              aria-expanded="false"
              aria-haspopup="listbox"
              aria-label={this.placeholder}
            />

            {this.loading && (
              <div class="loading-spinner" aria-label="Loading">
                <svg class="spinner" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-dasharray="32" stroke-dashoffset="32">
                    <animate attributeName="stroke-dashoffset" dur="1s" values="32;0;32" repeatCount="indefinite"/>
                  </circle>
                </svg>
              </div>
            )}

            {showClearButton && (
              <button
                type="button"
                class="clear-button"
                onClick={this.handleClear}
                aria-label="Clear search"
                tabIndex={-1}
              >
                <svg class="clear-icon" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" fill="none">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 6l12 12M6 18L18 6"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </Host>
    );
  }
}