# Smart Search Component Library

[![npm version](https://badge.fury.io/js/%40aravindaart%2Fsmart-search.svg)](https://badge.fury.io/js/%40aravindaart%2Fsmart-search)
[![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)](https://stenciljs.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Coverage](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg)](https://github.com/aravindaart/smart-search)
[![Tests](https://img.shields.io/badge/Tests-141%20Passed-brightgreen.svg)](https://github.com/aravindaart/smart-search)

A comprehensive, accessible search component library built with StencilJS for banking applications. Works seamlessly with React, Angular, Vue, Svelte, and vanilla JavaScript with full tree shaking support.

## 🎮 Live Demo

**Demo Options:**
- 🌐 [**Live Demo**](https://aravindaart.github.io/smart-search/demo.html) - Interactive online demo
- 📱 [**CodePen Demo**](https://codepen.io) - Try it in CodePen (coming soon)
- 💻 **Local Demo:** Download [demo.html](https://raw.githubusercontent.com/aravindaart/smart-search/main/demo.html) and open in your browser

## ✨ Features

- 🚀 **Framework Agnostic**: Works with React, Angular, Vue, Svelte, and vanilla JS
- 🌳 **Tree Shaking**: Full support for optimal bundle sizes
- ♿ **Accessible**: WCAG 2.1 AA compliant with full keyboard navigation
- 📱 **Mobile Friendly**: Touch-optimized with responsive design
- 🎨 **Themeable**: Light/dark themes with CSS custom properties
- 🔍 **Advanced Search**: Fuzzy search, filtering, grouping, and highlighting
- 🏦 **Banking Focused**: Designed for financial applications
- 📦 **TypeScript**: Full type safety across all frameworks
- ⚡ **Performant**: Virtual scrolling, debounced input, lazy loading

## 🚀 Quick Start

### Installation

```bash
npm install @aravindaart/smart-search
```

### Basic Usage

#### Vanilla JavaScript / HTML

```html
<script type="module" src="https://unpkg.com/@aravindaart/smart-search/dist/smart-search/smart-search.esm.js"></script>

<smart-search
  placeholder="Search accounts, transactions..."
  theme="light"
></smart-search>

<script>
  const searchComponent = document.querySelector('smart-search');
  searchComponent.dataSource = [
    { id: 1, title: 'Checking Account', subtitle: '****1234', category: 'accounts' },
    { id: 2, title: 'Savings Account', subtitle: '****5678', category: 'accounts' }
  ];
  
  searchComponent.addEventListener('resultSelect', (event) => {
    console.log('Selected:', event.detail.result);
  });
</script>
```

#### React

```tsx
import React, { useState, useEffect } from 'react';
import { applyPolyfills, defineCustomElements } from '@aravindaart/smart-search/loader';

// Register custom elements
applyPolyfills().then(() => {
  defineCustomElements();
});

function App() {
  const [searchData] = useState([
    { id: 1, title: 'Checking Account', subtitle: '****1234', category: 'accounts' },
    { id: 2, title: 'Savings Account', subtitle: '****5678', category: 'accounts' }
  ]);

  const handleSearch = (event: any) => {
    console.log('Search query:', event.detail.query);
  };

  const handleSelect = (event: any) => {
    console.log('Selected:', event.detail.result);
  };

  return (
    <smart-search
      placeholder="Search accounts, transactions..."
      data-source={JSON.stringify(searchData)}
      onSearchInput={handleSearch}
      onResultSelect={handleSelect}
      theme="light"
      max-results={10}
    />
  );
}
```

#### Angular

```typescript
// app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}

// app.component.ts
import { Component, OnInit } from '@angular/core';
import { applyPolyfills, defineCustomElements } from '@aravindaart/smart-search/loader';

@Component({
  selector: 'app-root',
  template: `
    <smart-search
      [attr.data-source]="searchDataString"
      placeholder="Search accounts, transactions..."
      theme="light"
      (searchInput)="onSearch($event)"
      (resultSelect)="onSelect($event)">
    </smart-search>
  `
})
export class AppComponent implements OnInit {
  searchData = [
    { id: 1, title: 'Checking Account', subtitle: '****1234', category: 'accounts' },
    { id: 2, title: 'Savings Account', subtitle: '****5678', category: 'accounts' }
  ];

  searchDataString = JSON.stringify(this.searchData);

  async ngOnInit() {
    await applyPolyfills();
    defineCustomElements();
  }

  onSearch(event: any) {
    console.log('Search query:', event.detail.query);
  }

  onSelect(event: any) {
    console.log('Selected:', event.detail.result);
  }
}
```

#### Vue 3

```vue
<template>
  <smart-search
    :data-source="searchDataString"
    placeholder="Search accounts, transactions..."
    theme="light"
    @searchInput="onSearch"
    @resultSelect="onSelect"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { applyPolyfills, defineCustomElements } from '@aravindaart/smart-search/loader';

// Register custom elements
onMounted(async () => {
  await applyPolyfills();
  defineCustomElements();
});

const searchData = ref([
  { id: 1, title: 'Checking Account', subtitle: '****1234', category: 'accounts' },
  { id: 2, title: 'Savings Account', subtitle: '****5678', category: 'accounts' }
]);

const searchDataString = computed(() => JSON.stringify(searchData.value));

const onSearch = (event: any) => {
  console.log('Search query:', event.detail.query);
};

const onSelect = (event: any) => {
  console.log('Selected:', event.detail.result);
};
</script>
```

#### Svelte

```svelte
<script lang="ts">
  import { applyPolyfills, defineCustomElements } from '@aravindaart/smart-search/loader';
  import { onMount } from 'svelte';

  // Register custom elements
  onMount(async () => {
    await applyPolyfills();
    defineCustomElements();
  });

  const searchData = [
    { id: 1, title: 'Checking Account', subtitle: '****1234', category: 'accounts' },
    { id: 2, title: 'Savings Account', subtitle: '****5678', category: 'accounts' }
  ];

  $: searchDataString = JSON.stringify(searchData);

  function handleSearch(event) {
    console.log('Search query:', event.detail.query);
  }

  function handleSelect(event) {
    console.log('Selected:', event.detail.result);
  }
</script>

<smart-search
  data-source={searchDataString}
  placeholder="Search accounts, transactions..."
  theme="light"
  on:searchInput={handleSearch}
  on:resultSelect={handleSelect}
/>
```

## 📚 API Documentation

### Components

#### `<smart-search>`

Main search component that combines input and results.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `placeholder` | `string` | `'Search...'` | Input placeholder text |
| `value` | `string` | `''` | Current search value |
| `dataSource` | `SearchResult[] \| string` | `[]` | Static data array or API endpoint |
| `searchFields` | `string[]` | `['title', 'subtitle', 'description']` | Fields to search within |
| `filterMode` | `'contains' \| 'startsWith' \| 'fuzzy'` | `'contains'` | Search matching mode |
| `theme` | `'light' \| 'dark'` | `'light'` | Theme variant |
| `maxResults` | `number` | `10` | Maximum results to display |
| `debounceTime` | `number` | `300` | Debounce delay in milliseconds |
| `minSearchLength` | `number` | `2` | Minimum characters to trigger search |

#### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `searchInput` | `SearchInputEventDetail` | Fired when user types |
| `searchClear` | `void` | Fired when clear button clicked |
| `resultSelect` | `SearchSelectEventDetail` | Fired when result is selected |
| `resultHover` | `SearchSelectEventDetail` | Fired when result is hovered |

### Data Types

```typescript
interface SearchResult {
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

interface SearchInputEventDetail {
  value: string;
  query: string;
}

interface SearchSelectEventDetail {
  result: SearchResult;
  index: number;
}
```

## 🎨 Theming

Customize the appearance using CSS custom properties:

```css
:root {
  --search-primary-color: #007bff;
  --search-background: #ffffff;
  --search-border-color: #e0e0e0;
  --search-text-color: #333333;
  --search-placeholder-color: #888888;
  --search-focus-color: #0056b3;
  --search-hover-color: #f8f9fa;
  --search-border-radius: 4px;
  --search-box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  --search-font-family: inherit;
  --search-font-size: 14px;
}
```

## 🏦 Banking Examples

### Account Search

```javascript
const accountData = [
  {
    id: 'acc_001',
    title: 'Primary Checking',
    subtitle: 'Account ****1234',
    description: 'Available Balance: $5,430.50',
    category: 'accounts',
    metadata: { accountType: 'checking', balance: 5430.50 }
  }
];
```

## ♿ Accessibility

The Smart Search components are built with accessibility in mind:

- **ARIA Support**: Proper ARIA attributes for screen readers
- **Keyboard Navigation**: Full keyboard support (Arrow keys, Enter, Escape, Tab)
- **Focus Management**: Clear focus indicators and logical tab order
- **Screen Reader**: Announces search results and selections
- **High Contrast**: Supports high contrast mode
- **Touch Friendly**: 44px minimum touch targets on mobile

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `↓` / `↑` | Navigate through results |
| `Enter` | Select highlighted result |
| `Escape` | Close dropdown / clear focus |
| `Tab` | Navigate to next element |
| `Home` / `End` | Jump to first/last result |

## 🚀 Performance

- **Tree Shaking**: Import only what you need
- **Bundle Size**: < 100KB gzipped for full library
- **Lazy Loading**: Components load on demand
- **Virtual Scrolling**: Handles large result sets efficiently
- **Debounced Input**: Reduces API calls
- **Memoized Results**: Caches search results

## 🧪 Testing & Coverage

The Smart Search library maintains **100% test coverage** across all components and utilities, ensuring reliability and stability.

### Test Coverage Report

```
---------------------------------|---------|----------|---------|---------|-------------------
File                             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
---------------------------------|---------|----------|---------|---------|-------------------
All files                        |     100 |      100 |     100 |     100 |                   
 components/smart-search         |     100 |      100 |     100 |     100 |                   
  smart-search.tsx               |     100 |      100 |     100 |     100 |                   
 components/smart-search-input   |     100 |      100 |     100 |     100 |                   
  smart-search-input.tsx         |     100 |      100 |     100 |     100 |                   
 components/smart-search-results |     100 |      100 |     100 |     100 |                   
  smart-search-results.tsx       |     100 |      100 |     100 |     100 |                   
 utils                           |     100 |      100 |     100 |     100 |                   
  search.ts                      |     100 |      100 |     100 |     100 |                   
---------------------------------|---------|----------|---------|---------|-------------------
```

### Test Statistics

- **141 Tests** - Comprehensive test suite covering all functionality
- **4 Test Suites** - One for each component plus utilities
- **100% Line Coverage** - Every line of code is tested
- **100% Branch Coverage** - All conditional paths are covered
- **100% Function Coverage** - Every function is tested
- **100% Statement Coverage** - All statements are executed

### Test Categories

#### 🔍 **Component Testing**
- **Unit Tests**: Individual component behavior and props
- **Integration Tests**: Component interaction and event handling
- **Accessibility Tests**: ARIA attributes and keyboard navigation
- **Edge Cases**: Error conditions and boundary scenarios

#### ⚡ **Functionality Testing**
- **Search Logic**: Fuzzy search, filtering, and highlighting
- **Event Handling**: Input events, keyboard navigation, selections
- **Data Processing**: Result grouping, sorting, and transformation
- **Performance**: Debouncing, virtual scrolling, and optimization

#### 🎨 **UI/UX Testing**
- **Responsive Design**: Mobile and desktop layouts
- **Theme Switching**: Light and dark mode variations
- **Focus Management**: Tab order and focus indicators
- **Touch Interactions**: Mobile-friendly touch targets

#### 🔧 **Utility Testing**
- **Search Algorithms**: Pattern matching and ranking
- **Input Sanitization**: XSS prevention and validation
- **Helper Functions**: Debounce, highlighting, and viewport detection
- **Type Safety**: TypeScript interfaces and type guards

### Test Commands

```bash
# Run all tests with coverage
npm test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e

# Generate detailed coverage report
npm test -- --coverage --coverageReporters=html
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## 📦 Bundle Analysis

The library is optimized for tree shaking:

```javascript
// Import only what you need
import { SmartSearchInput } from '@aravindaart/smart-search';

// Or use the custom elements directly
import { defineCustomElements } from '@aravindaart/smart-search/loader';
defineCustomElements();
```

## 🌐 Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Android Chrome 70+

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for the banking industry**