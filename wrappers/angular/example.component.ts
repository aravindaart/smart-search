// Example usage of Angular wrapper
import { Component } from '@angular/core';
import { SearchInputEventDetail, SearchSelectEventDetail, SearchResult } from './smart-search.component';

@Component({
  selector: 'app-example',
  template: `
    <div style="padding: 20px; max-width: 600px; margin: 0 auto;">
      <h1>Smart Search Angular Wrapper Example</h1>
      
      <smart-search
        placeholder="Search accounts, transactions..."
        theme="light"
        [maxResults]="10"
        [debounceTime]="300"
        [minSearchLength]="2"
        [dataSource]="searchData"
        (searchInput)="onSearchInput($event)"
        (resultSelect)="onResultSelect($event)"
        style="margin-bottom: 20px; display: block;">
      </smart-search>
      
      <button (click)="clearSearch()" style="margin-top: 10px;">
        Clear Search
      </button>
      
      <div style="margin-top: 20px; font-size: 14px; color: #666;">
        <p>Try searching for: "checking", "savings", "account"</p>
        <p>This example demonstrates the Angular wrapper with TypeScript support.</p>
        <p *ngIf="lastSearchQuery">Last search: {{ lastSearchQuery }}</p>
        <p *ngIf="lastSelectedResult">Last selected: {{ lastSelectedResult?.title }}</p>
      </div>
    </div>
  `
})
export class ExampleComponent {
  searchData: SearchResult[] = [
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
  ];

  lastSearchQuery: string = '';
  lastSelectedResult: SearchResult | null = null;

  onSearchInput(event: SearchInputEventDetail) {
    console.log('Search input:', event.query);
    this.lastSearchQuery = event.query;
  }

  onResultSelect(event: SearchSelectEventDetail) {
    console.log('Result selected:', event.result);
    this.lastSelectedResult = event.result;
    alert(`Selected: ${event.result.title}`);
  }

  clearSearch() {
    // Implementation would depend on ViewChild reference to component
    console.log('Clear search clicked');
  }
}