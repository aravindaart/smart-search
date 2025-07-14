import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  ElementRef, 
  ViewChild, 
  AfterViewInit, 
  OnDestroy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
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

@Component({
  selector: 'smart-search',
  template: `
    <smart-search
      #searchElement
      [attr.placeholder]="placeholder"
      [attr.value]="value"
      [attr.disabled]="disabled"
      [attr.loading]="loading"
      [attr.clearable]="clearable"
      [attr.debounce-time]="debounceTime"
      [attr.min-search-length]="minSearchLength"
      [attr.max-results]="maxResults"
      [attr.theme]="theme"
      [attr.auto-focus]="autoFocus"
      [attr.filter-mode]="filterMode"
      [attr.case-sensitive]="caseSensitive"
      [attr.group-by]="groupBy"
      [attr.no-results-message]="noResultsMessage">
    </smart-search>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class SmartSearchComponent implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('searchElement', { static: false }) searchElement!: ElementRef;

  @Input() placeholder: string = 'Search...';
  @Input() value: string = '';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() clearable: boolean = true;
  @Input() debounceTime: number = 300;
  @Input() minSearchLength: number = 2;
  @Input() maxResults: number = 10;
  @Input() theme: 'light' | 'dark' = 'light';
  @Input() autoFocus: boolean = false;
  @Input() dataSource: SearchResult[] | string = [];
  @Input() searchFields: string[] = ['title', 'subtitle', 'description'];
  @Input() filterMode: 'contains' | 'startsWith' | 'fuzzy' = 'contains';
  @Input() caseSensitive: boolean = false;
  @Input() groupBy: string = '';
  @Input() noResultsMessage: string = 'No results found';

  @Output() searchInput = new EventEmitter<SearchInputEventDetail>();
  @Output() searchClear = new EventEmitter<void>();
  @Output() searchFocus = new EventEmitter<FocusEvent>();
  @Output() searchBlur = new EventEmitter<FocusEvent>();
  @Output() resultSelect = new EventEmitter<SearchSelectEventDetail>();
  @Output() resultHover = new EventEmitter<SearchSelectEventDetail>();

  private isComponentReady = false;

  constructor() {
    this.initializeComponent();
  }

  private async initializeComponent() {
    try {
      await defineCustomElements();
      await customElements.whenDefined('smart-search');
      this.isComponentReady = true;
    } catch (error) {
      console.error('Failed to initialize SmartSearch component:', error);
    }
  }

  ngAfterViewInit() {
    if (this.isComponentReady) {
      this.setupComponent();
    } else {
      // Wait for component to be ready
      const checkReady = () => {
        if (this.isComponentReady) {
          this.setupComponent();
        } else {
          setTimeout(checkReady, 100);
        }
      };
      checkReady();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isComponentReady && this.searchElement?.nativeElement) {
      if (changes['dataSource']) {
        this.searchElement.nativeElement.dataSource = this.dataSource;
      }
      if (changes['searchFields']) {
        this.searchElement.nativeElement.searchFields = this.searchFields;
      }
    }
  }

  private setupComponent() {
    if (!this.searchElement?.nativeElement) return;

    const element = this.searchElement.nativeElement;

    // Set properties
    element.dataSource = this.dataSource;
    element.searchFields = this.searchFields;

    // Add event listeners
    element.addEventListener('searchInput', (event: CustomEvent<SearchInputEventDetail>) => {
      this.searchInput.emit(event.detail);
    });

    element.addEventListener('searchClear', () => {
      this.searchClear.emit();
    });

    element.addEventListener('searchFocus', (event: CustomEvent<FocusEvent>) => {
      this.searchFocus.emit(event.detail);
    });

    element.addEventListener('searchBlur', (event: CustomEvent<FocusEvent>) => {
      this.searchBlur.emit(event.detail);
    });

    element.addEventListener('resultSelect', (event: CustomEvent<SearchSelectEventDetail>) => {
      this.resultSelect.emit(event.detail);
    });

    element.addEventListener('resultHover', (event: CustomEvent<SearchSelectEventDetail>) => {
      this.resultHover.emit(event.detail);
    });
  }

  ngOnDestroy() {
    // Event listeners are automatically cleaned up when the element is destroyed
  }

  // Public methods
  focus() {
    if (this.searchElement?.nativeElement) {
      const input = this.searchElement.nativeElement.shadowRoot?.querySelector('smart-search-input')?.shadowRoot?.querySelector('input');
      input?.focus();
    }
  }

  blur() {
    if (this.searchElement?.nativeElement) {
      const input = this.searchElement.nativeElement.shadowRoot?.querySelector('smart-search-input')?.shadowRoot?.querySelector('input');
      input?.blur();
    }
  }

  clear() {
    if (this.searchElement?.nativeElement) {
      this.searchElement.nativeElement.value = '';
    }
  }

  setValue(newValue: string) {
    if (this.searchElement?.nativeElement) {
      this.searchElement.nativeElement.value = newValue;
    }
  }

  getValue(): string {
    return this.searchElement?.nativeElement?.value || '';
  }
}