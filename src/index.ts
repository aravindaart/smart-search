/**
 * @fileoverview Smart Search Component Library
 *
 * A comprehensive search component library for banking applications.
 * Supports React, Angular, Vue, and Svelte with tree shaking.
 */

// Export types for TypeScript support
export * from './types';

// Export utility functions
export * from './utils/search';
export { format } from './utils/utils';

// Export TypeScript definitions
export type * from './components.d.ts';

// Export individual components for tree shaking support
export { SmartSearch } from './components/smart-search/smart-search';
export { SmartSearchInput } from './components/smart-search-input/smart-search-input';
export { SmartSearchResults } from './components/smart-search-results/smart-search-results';
