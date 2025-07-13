import { SearchResult, FilterMode } from '../types';

/**
 * Debounce function to limit the rate of function calls
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string | null | undefined): string {
  if (!input) return '';
  return input
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 1000); // Limit length
}

/**
 * Highlight search terms in text
 */
export function highlightText(text: string, searchTerm: string): string {
  if (!searchTerm.trim()) return text;
  
  // Escape HTML first
  const escapedText = text.replace(/[&<>"']/g, function(match) {
    const htmlEntities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return htmlEntities[match];
  });
  
  const sanitizedTerm = sanitizeInput(searchTerm).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${sanitizedTerm})`, 'gi');
  return escapedText.replace(regex, '<mark>$1</mark>');
}

/**
 * Fuzzy search algorithm
 */
export function fuzzyMatch(text: string, pattern: string): boolean {
  const textLower = text.toLowerCase();
  const patternLower = pattern.toLowerCase();
  
  let textIndex = 0;
  let patternIndex = 0;
  
  while (textIndex < textLower.length && patternIndex < patternLower.length) {
    if (textLower[textIndex] === patternLower[patternIndex]) {
      patternIndex++;
    }
    textIndex++;
  }
  
  return patternIndex === patternLower.length;
}

/**
 * Filter search results based on query and mode
 */
export function filterResults(
  results: SearchResult[],
  query: string,
  filterMode: FilterMode = 'contains',
  searchFields: string[] = ['title', 'subtitle', 'description'],
  caseSensitive = false
): SearchResult[] {
  if (!query.trim()) return results;
  
  const sanitizedQuery = sanitizeInput(query);
  const queryToMatch = caseSensitive ? sanitizedQuery : sanitizedQuery.toLowerCase();
  
  return results.filter(result => {
    return searchFields.some(field => {
      const fieldValue = result[field as keyof SearchResult] as string;
      if (!fieldValue) return false;
      
      const textToSearch = caseSensitive ? fieldValue : fieldValue.toLowerCase();
      
      switch (filterMode) {
        case 'startsWith':
          return textToSearch.startsWith(queryToMatch);
        case 'fuzzy':
          return fuzzyMatch(textToSearch, queryToMatch);
        case 'contains':
        default:
          return textToSearch.includes(queryToMatch);
      }
    });
  });
}

/**
 * Group search results by category
 */
export function groupResults(
  results: SearchResult[],
  groupBy: string = 'category'
): Record<string, SearchResult[]> {
  return results.reduce((groups, result) => {
    const key = result[groupBy as keyof SearchResult] as string || 'Other';
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(result);
    return groups;
  }, {} as Record<string, SearchResult[]>);
}

/**
 * Generate unique ID for components
 */
export function generateId(prefix: string = 'search'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: Element | null): boolean {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Scroll element into view within its container
 */
export function scrollIntoView(element: Element | null, container?: Element): void {
  if (!element) return;
  
  if (container) {
    const htmlElement = element as HTMLElement;
    const htmlContainer = container as HTMLElement;
    
    const containerTop = htmlContainer.scrollTop;
    const containerBottom = containerTop + htmlContainer.clientHeight;
    const elementTop = htmlElement.offsetTop;
    const elementBottom = elementTop + htmlElement.offsetHeight;
    
    // Check if item is above visible area
    if (elementTop < containerTop) {
      htmlContainer.scrollTop = elementTop;
    }
    // Check if item is below visible area
    else if (elementBottom > containerBottom) {
      htmlContainer.scrollTop = elementBottom - htmlContainer.clientHeight;
    }
  } else {
    element.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
}