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
- 💻 **Local Demo:** [Download demo.html](https://github.com/aravindaart/smart-search/raw/main/demo.html) and open in your browser

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

**Core Library:**
```bash
npm install @aravindaart/smart-search
```

**Framework Wrappers (Recommended):**
```bash
# All wrappers are included in the main package
npm install @aravindaart/smart-search
```

### Basic Usage

**🎯 Recommended Approach: Use Framework Wrappers**

The framework wrappers provide native component APIs and eliminate the common issues with custom element integration. They handle initialization, event binding, and data management automatically.

- **React users**: Use `@aravindaart/smart-search/react`
- **Angular users**: Use `@aravindaart/smart-search/angular` 
- **Vue users**: Use `@aravindaart/smart-search/vue`
- **Vanilla JS/HTML users**: Use the core library directly

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

**Option 1: Using the React Wrapper (Recommended)**

```tsx
import React, { useState } from 'react';
import { SmartSearch } from '@aravindaart/smart-search/react';

function App() {
  const [searchData] = useState([
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
  ]);

  const handleSearch = (event) => {
    console.log('Search query:', event.query);
  };

  const handleSelect = (event) => {
    console.log('Selected:', event.result);
  };

  return (
    <SmartSearch
      placeholder="Search accounts, transactions..."
      theme="light"
      maxResults={10}
      debounceTime={300}
      minSearchLength={2}
      dataSource={searchData}
      onSearchInput={handleSearch}
      onResultSelect={handleSelect}
    />
  );
}
```

**Installation:**
```bash
npm install @aravindaart/smart-search
```

**Option 2: Direct Custom Element Usage**

```tsx
import React, { useState, useEffect, useRef } from 'react';
import { defineCustomElements } from '@aravindaart/smart-search/loader';

// TypeScript declaration for custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'smart-search': any;
    }
  }
}

function App() {
  const searchRef = useRef<any>(null);
  const [isComponentReady, setIsComponentReady] = useState(false);
  const [searchData] = useState([
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
  ]);

  useEffect(() => {
    // Register custom elements and wait for them to be defined
    const initializeComponent = async () => {
      await defineCustomElements();
      // Wait for the component to be fully defined
      await customElements.whenDefined('smart-search');
      setIsComponentReady(true);
    };
    
    initializeComponent();
  }, []);

  useEffect(() => {
    // Set data source only after component is ready
    if (isComponentReady && searchRef.current) {
      searchRef.current.dataSource = searchData;
    }
  }, [isComponentReady, searchData]);

  useEffect(() => {
    if (!isComponentReady) return;
    
    const searchElement = searchRef.current;
    if (!searchElement) return;

    const handleSearch = (event: CustomEvent) => {
      console.log('Search query:', event.detail.query);
    };

    const handleSelect = (event: CustomEvent) => {
      console.log('Selected:', event.detail.result);
    };

    // Add event listeners
    searchElement.addEventListener('searchInput', handleSearch);
    searchElement.addEventListener('resultSelect', handleSelect);

    // Cleanup
    return () => {
      searchElement.removeEventListener('searchInput', handleSearch);
      searchElement.removeEventListener('resultSelect', handleSelect);
    };
  }, [isComponentReady]);

  return (
    <smart-search
      ref={searchRef}
      placeholder="Search accounts, transactions..."
      theme="light"
      max-results="10"
      debounce-time="300"
      min-search-length="2"
    />
  );
}
```

**Recommended Vite Configuration (vite.config.js):**

For React Wrapper (Recommended):
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['@aravindaart/smart-search/react'],
    exclude: ['@aravindaart/smart-search/loader']
  }
})
```

For Direct Custom Element Usage:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    exclude: [
      '@aravindaart/smart-search/loader',
      '@aravindaart/smart-search/dist/custom-elements'
    ]
  },
  build: {
    rollupOptions: {
      external: [],
      output: {
        manualChunks: undefined
      }
    }
  }
})
```

**TypeScript Support (src/vite-env.d.ts):**
```typescript
/// <reference types="vite/client" />

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'smart-search': any;
      'smart-search-input': any;
      'smart-search-results': any;
    }
  }
}

export {};
```

#### Angular

**Option 1: Using the Angular Wrapper (Recommended)**

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SmartSearchModule } from '@aravindaart/smart-search/angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SmartSearchModule],
  bootstrap: [AppComponent]
})
export class AppModule {}

// app.component.ts
import { Component } from '@angular/core';
import { SearchInputEventDetail, SearchSelectEventDetail } from '@aravindaart/smart-search/angular';

@Component({
  selector: 'app-root',
  template: `
    <smart-search
      placeholder="Search accounts, transactions..."
      theme="light"
      [maxResults]="10"
      [dataSource]="searchData"
      (searchInput)="onSearchInput($event)"
      (resultSelect)="onResultSelect($event)">
    </smart-search>
  `
})
export class AppComponent {
  searchData = [
    { id: 1, title: 'Checking Account', subtitle: '****1234', category: 'accounts' },
    { id: 2, title: 'Savings Account', subtitle: '****5678', category: 'accounts' }
  ];

  onSearchInput(event: SearchInputEventDetail) {
    console.log('Search query:', event.query);
  }

  onResultSelect(event: SearchSelectEventDetail) {
    console.log('Selected:', event.result);
  }
}
```

**Installation:**
```bash
npm install @aravindaart/smart-search
```

**Option 2: Direct Custom Element Usage**

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
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { defineCustomElements } from '@aravindaart/smart-search/loader';

@Component({
  selector: 'app-root',
  template: `
    <smart-search
      #searchElement
      placeholder="Search accounts, transactions..."
      theme="light"
      [maxResults]="10">
    </smart-search>
  `
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('searchElement', { static: false }) searchElement!: ElementRef;

  searchData = [
    { id: 1, title: 'Checking Account', subtitle: '****1234', category: 'accounts' },
    { id: 2, title: 'Savings Account', subtitle: '****5678', category: 'accounts' }
  ];

  async ngOnInit() {
    // Register custom elements
    await defineCustomElements();
  }

  ngAfterViewInit() {
    // Set data source after view init
    if (this.searchElement?.nativeElement) {
      this.searchElement.nativeElement.dataSource = this.searchData;
      
      // Add event listeners
      this.searchElement.nativeElement.addEventListener('searchInput', (event: CustomEvent) => {
        console.log('Search query:', event.detail.query);
      });

      this.searchElement.nativeElement.addEventListener('resultSelect', (event: CustomEvent) => {
        console.log('Selected:', event.detail.result);
      });
    }
  }
}
```

#### Vue 3

**Option 1: Using the Vue Wrapper (Recommended)**

```vue
<template>
  <SmartSearch
    placeholder="Search accounts, transactions..."
    theme="light"
    :maxResults="10"
    :dataSource="searchData"
    @searchInput="onSearchInput"
    @resultSelect="onResultSelect"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SmartSearch } from '@aravindaart/smart-search/vue';

const searchData = ref([
  { id: 1, title: 'Checking Account', subtitle: '****1234', category: 'accounts' },
  { id: 2, title: 'Savings Account', subtitle: '****5678', category: 'accounts' }
]);

const onSearchInput = (event) => {
  console.log('Search query:', event.query);
};

const onResultSelect = (event) => {
  console.log('Selected:', event.result);
};
</script>
```

**Installation:**
```bash
npm install @aravindaart/smart-search
```

**Option 2: Direct Custom Element Usage**

```vue
<template>
  <smart-search
    ref="searchElement"
    placeholder="Search accounts, transactions..."
    theme="light"
    :maxResults="10"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { defineCustomElements } from '@aravindaart/smart-search/loader';

const searchElement = ref<any>(null);

const searchData = ref([
  { id: 1, title: 'Checking Account', subtitle: '****1234', category: 'accounts' },
  { id: 2, title: 'Savings Account', subtitle: '****5678', category: 'accounts' }
]);

onMounted(async () => {
  // Register custom elements
  await defineCustomElements();
  
  // Wait for next tick to ensure element is rendered
  await nextTick();
  
  if (searchElement.value) {
    // Set data source
    searchElement.value.dataSource = searchData.value;
    
    // Add event listeners
    searchElement.value.addEventListener('searchInput', (event: CustomEvent) => {
      console.log('Search query:', event.detail.query);
    });

    searchElement.value.addEventListener('resultSelect', (event: CustomEvent) => {
      console.log('Selected:', event.detail.result);
    });
  }
});
</script>
```

#### Svelte

```svelte
<script lang="ts">
  import { defineCustomElements } from '@aravindaart/smart-search/loader';
  import { onMount } from 'svelte';

  let searchElement: any;

  const searchData = [
    { id: 1, title: 'Checking Account', subtitle: '****1234', category: 'accounts' },
    { id: 2, title: 'Savings Account', subtitle: '****5678', category: 'accounts' }
  ];

  onMount(async () => {
    // Register custom elements
    await defineCustomElements();

    if (searchElement) {
      // Set data source
      searchElement.dataSource = searchData;
      
      // Add event listeners
      searchElement.addEventListener('searchInput', (event: CustomEvent) => {
        console.log('Search query:', event.detail.query);
      });

      searchElement.addEventListener('resultSelect', (event: CustomEvent) => {
        console.log('Selected:', event.detail.result);
      });
    }
  });
</script>

<smart-search
  bind:this={searchElement}
  placeholder="Search accounts, transactions..."
  theme="light"
  maxResults={10}
/>
```

## 🔧 Troubleshooting

### Framework Wrapper Issues

#### React Wrapper: Component not rendering
- **Issue**: `<SmartSearch>` component doesn't appear
- **Solution**: Ensure you're importing from `@aravindaart/smart-search/react`
- **Check**: Make sure the main package is installed: `npm list @aravindaart/smart-search`

#### Angular Wrapper: Module not found
- **Issue**: `Cannot find module '@aravindaart/smart-search/angular'`
- **Solution**: Import `SmartSearchModule` in your app module
- **Check**: Verify installation: `npm list @aravindaart/smart-search`

#### Vue Wrapper: Component not registered
- **Issue**: `Unknown custom element: <SmartSearch>`
- **Solution**: Import the component: `import { SmartSearch } from '@aravindaart/smart-search/vue'`
- **Check**: Use PascalCase component name in template

#### Framework Wrapper Benefits
✅ **No manual component registration**  
✅ **No custom element timing issues**  
✅ **Native TypeScript support**  
✅ **Framework-specific event handling**  
✅ **Proper prop/attribute binding**

### Common Issues (Direct Custom Element Usage)

#### React: Component not rendering
- **Issue**: `<smart-search>` doesn't appear
- **Solution**: Wait for `customElements.whenDefined('smart-search')` before setting data
- **Check**: Use kebab-case attributes (`max-results` not `maxResults`)
- **Fix**: Add TypeScript declarations for custom elements

#### Angular: Property binding errors  
- **Issue**: `Can't bind to 'dataSource'`
- **Solution**: Set properties programmatically in `ngAfterViewInit()`
- **Check**: Use `CUSTOM_ELEMENTS_SCHEMA` in your module

#### Vue: Events not firing
- **Issue**: `@searchInput` not working
- **Solution**: Use `addEventListener` instead of Vue event binding
- **Check**: Register elements in `onMounted()`

#### TypeScript Errors
- **Issue**: `Property 'dataSource' does not exist`
- **Solution**: 
```typescript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'smart-search': any;
    }
  }
}
```

#### React: Attributes not working
- **Issue**: Component props like `maxResults` not working
- **Solution**: Use kebab-case HTML attributes instead of camelCase props
- **Examples**: 
  - ✅ `max-results="10"` 
  - ❌ `maxResults={10}`
  - ✅ `debounce-time="300"`
  - ❌ `debounceTime={300}`

#### React: Data not loading
- **Issue**: `dataSource` set but no results show
- **Solution**: Ensure proper timing and data format
```tsx
// Wait for component to be ready
useEffect(() => {
  const init = async () => {
    await defineCustomElements();
    await customElements.whenDefined('smart-search');
    setIsReady(true);
  };
  init();
}, []);

// Set data after component is ready
useEffect(() => {
  if (isReady && searchRef.current) {
    searchRef.current.dataSource = data;
  }
}, [isReady, data]);
```

#### Data not showing
- **Issue**: Search results not appearing
- **Solution**: Ensure `dataSource` is set after component registration
- **Check**: Data format matches `SearchResult[]` interface

#### Vite: Module resolution issues
- **Issue**: `global is not defined` or module resolution errors
- **Solution**: Add proper Vite configuration in `vite.config.js`
```javascript
export default defineConfig({
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    exclude: ['@aravindaart/smart-search/loader']
  }
})
```

#### Vite: "smart-search.entry.js" file not found error
- **Issue**: `The file does not exist at "node_modules/.vite/deps/smart-search.entry.js"`
- **Solution**: Exclude StencilJS components from Vite optimization
```javascript
export default defineConfig({
  optimizeDeps: {
    exclude: [
      '@aravindaart/smart-search/loader',
      '@aravindaart/smart-search/dist/custom-elements'
    ]
  }
})
```
- **Better Solution**: Use the React wrapper instead: `import { SmartSearch } from '@aravindaart/smart-search/react'`

#### Vite: Build errors with StencilJS components
- **Issue**: Build fails with StencilJS component imports
- **Solution**: Configure Vite to handle the loader properly
- **Check**: Use `/loader` import path, not `/dist/custom-elements`
- **Recommended**: Switch to framework wrappers to avoid these issues entirely

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

The library is optimized for tree shaking and offers multiple installation options:

**Framework Wrappers (Recommended):**
```javascript
// React - Native React component
import { SmartSearch } from '@aravindaart/smart-search/react';

// Angular - Native Angular component
import { SmartSearchModule } from '@aravindaart/smart-search/angular';

// Vue - Native Vue component  
import { SmartSearch } from '@aravindaart/smart-search/vue';
```

**Direct Custom Elements:**
```javascript
// Import only what you need
import { SmartSearchInput } from '@aravindaart/smart-search';

// Or use the custom elements directly
import { defineCustomElements } from '@aravindaart/smart-search/loader';
defineCustomElements();
```

**Bundle Sizes:**
- Core library: ~85KB gzipped
- React wrapper: ~5KB additional
- Angular wrapper: ~7KB additional  
- Vue wrapper: ~4KB additional

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