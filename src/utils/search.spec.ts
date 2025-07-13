import { 
  debounce, 
  sanitizeInput, 
  generateId, 
  fuzzyMatch, 
  filterResults, 
  groupResults, 
  highlightText, 
  isInViewport, 
  scrollIntoView 
} from './search';

describe('Search Utilities', () => {
  describe('debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should delay function execution', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);
      
      debouncedFn();
      expect(mockFn).not.toHaveBeenCalled();
      
      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should cancel previous calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);
      
      debouncedFn();
      debouncedFn();
      debouncedFn();
      
      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('sanitizeInput', () => {
    it('should handle null and undefined', () => {
      expect(sanitizeInput(null)).toBe('');
      expect(sanitizeInput(undefined)).toBe('');
    });

    it('should trim whitespace', () => {
      expect(sanitizeInput('  hello  ')).toBe('hello');
    });

    it('should normalize multiple spaces', () => {
      expect(sanitizeInput('hello   world')).toBe('hello world');
    });

    it('should remove dangerous characters', () => {
      expect(sanitizeInput('hello<script>world')).toBe('helloscriptworld');
    });

    it('should limit length', () => {
      const longString = 'a'.repeat(2000);
      expect(sanitizeInput(longString)).toHaveLength(1000);
    });
  });

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });

    it('should include prefix when provided', () => {
      const id = generateId('test');
      expect(id).toMatch(/^test-/);
    });

    it('should generate random ID with default prefix', () => {
      const id = generateId();
      expect(id).toMatch(/^search-[a-z0-9]+$/);
    });
  });

  describe('fuzzyMatch', () => {
    it('should handle empty patterns', () => {
      expect(fuzzyMatch('hello', '')).toBe(true);
    });

    it('should handle empty text', () => {
      expect(fuzzyMatch('', 'hello')).toBe(false);
    });

    it('should match exact strings', () => {
      expect(fuzzyMatch('hello', 'hello')).toBe(true);
    });

    it('should be case insensitive', () => {
      expect(fuzzyMatch('Hello', 'hello')).toBe(true);
      expect(fuzzyMatch('WORLD', 'world')).toBe(true);
    });

    it('should match subsequences', () => {
      expect(fuzzyMatch('hello world', 'hlo')).toBe(true);
      expect(fuzzyMatch('javascript', 'jvs')).toBe(true);
    });

    it('should not match unrelated patterns', () => {
      expect(fuzzyMatch('hello', 'xyz')).toBe(false);
    });
  });

  describe('filterResults', () => {
    const mockResults = [
      { id: '1', title: 'Apple iPhone', subtitle: 'Smartphone', description: 'Latest iPhone model' },
      { id: '2', title: 'Samsung Galaxy', subtitle: 'Android Phone', description: 'Popular Android device' },
      { id: '3', title: 'MacBook Pro', subtitle: 'Laptop', description: 'Apple laptop computer' }
    ];

    it('should return all results for empty query', () => {
      const results = filterResults(mockResults, '');
      expect(results).toEqual(mockResults);
    });

    it('should filter by contains mode (default)', () => {
      const results = filterResults(mockResults, 'iPhone');
      expect(results).toHaveLength(1);
      expect(results[0].title).toBe('Apple iPhone');
    });

    it('should filter by startsWith mode', () => {
      const results = filterResults(mockResults, 'Apple', 'startsWith');
      expect(results.length).toBeGreaterThanOrEqual(1);
      expect(results.some(r => r.title === 'Apple iPhone')).toBe(true);
    });

    it('should filter by fuzzy mode', () => {
      const results = filterResults(mockResults, 'ppl', 'fuzzy');
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(r => r.title.includes('Apple'))).toBe(true);
    });

    it('should search multiple fields', () => {
      const results = filterResults(mockResults, 'Android', 'contains', ['subtitle', 'description']);
      expect(results).toHaveLength(1);
      expect(results[0].title).toBe('Samsung Galaxy');
    });

    it('should respect case sensitivity', () => {
      const results1 = filterResults(mockResults, 'apple', 'contains', ['title'], true);
      expect(results1).toHaveLength(0);

      const results2 = filterResults(mockResults, 'apple', 'contains', ['title'], false);
      expect(results2).toHaveLength(1);
    });

    it('should handle results with missing field values', () => {
      const resultsWithMissingFields = [
        { id: '1', title: 'Complete Item', subtitle: 'Has subtitle', description: 'Has description' },
        { id: '2', title: 'Missing Subtitle' }, // No subtitle or description
        { id: '3', title: 'Missing Description', subtitle: 'Has subtitle' } // No description
      ];

      // Search for something that would be in subtitle - should only find items with subtitle
      const results = filterResults(resultsWithMissingFields, 'subtitle', 'contains', ['subtitle']);
      expect(results).toHaveLength(2);
      expect(results.every(r => r.subtitle)).toBe(true);
    });
  });

  describe('groupResults', () => {
    const mockResults = [
      { id: '1', title: 'iPhone', category: 'phones' },
      { id: '2', title: 'Galaxy', category: 'phones' },
      { id: '3', title: 'MacBook', category: 'laptops' },
      { id: '4', title: 'iPad', category: undefined }
    ];

    it('should group by specified field', () => {
      const grouped = groupResults(mockResults, 'category');
      expect(grouped.phones).toHaveLength(2);
      expect(grouped.laptops).toHaveLength(1);
      expect(grouped.Other).toHaveLength(1);
    });

    it('should handle missing grouping field', () => {
      const grouped = groupResults(mockResults, 'nonexistent');
      expect(grouped.Other).toHaveLength(4);
    });

    it('should use default groupBy parameter when not specified', () => {
      // Test default parameter by not passing groupBy argument
      const grouped = groupResults(mockResults);
      expect(grouped.phones).toHaveLength(2);
      expect(grouped.laptops).toHaveLength(1);
      expect(grouped.Other).toHaveLength(1);
    });
  });

  describe('highlightText', () => {
    it('should return original text for empty search term', () => {
      const result = highlightText('Hello World', '');
      expect(result).toBe('Hello World');
    });

    it('should highlight matching text', () => {
      const result = highlightText('Hello World', 'World');
      expect(result).toBe('Hello <mark>World</mark>');
    });

    it('should be case insensitive', () => {
      const result = highlightText('Hello World', 'world');
      expect(result).toBe('Hello <mark>World</mark>');
    });

    it('should escape HTML characters', () => {
      const result = highlightText('<script>alert("test")</script>', 'script');
      expect(result).toContain('&lt;');
      expect(result).toContain('&gt;');
      expect(result).not.toContain('<script>');
    });

    it('should handle multiple matches', () => {
      const result = highlightText('test test test', 'test');
      const matches = (result.match(/<mark>/g) || []).length;
      expect(matches).toBe(3);
    });
  });

  describe('isInViewport', () => {
    it('should return false for null element', () => {
      expect(isInViewport(null)).toBe(false);
    });

    it('should return false for undefined element', () => {
      expect(isInViewport(undefined as any)).toBe(false);
    });

    it('should check element position (mocked)', () => {
      const mockElement = {
        getBoundingClientRect: jest.fn().mockReturnValue({
          top: 100,
          left: 100,
          bottom: 200,
          right: 200
        })
      } as any;

      // Mock window dimensions
      Object.defineProperty(window, 'innerHeight', { value: 800, writable: true });
      Object.defineProperty(window, 'innerWidth', { value: 1200, writable: true });

      const result = isInViewport(mockElement);
      expect(result).toBe(true);
    });

    it('should return false when element is out of viewport', () => {
      const mockElement = {
        getBoundingClientRect: jest.fn().mockReturnValue({
          top: 1000,
          left: 1000,
          bottom: 1100,
          right: 1100
        })
      } as any;

      // Mock window dimensions - smaller than element position
      Object.defineProperty(window, 'innerHeight', { value: 800, writable: true });
      Object.defineProperty(window, 'innerWidth', { value: 800, writable: true });

      const result = isInViewport(mockElement);
      expect(result).toBe(false);
    });

    it('should use document.documentElement dimensions when window dimensions not available', () => {
      const mockElement = {
        getBoundingClientRect: jest.fn().mockReturnValue({
          top: 100,
          left: 100,
          bottom: 200,
          right: 200
        })
      } as any;

      // Mock window dimensions as undefined
      Object.defineProperty(window, 'innerHeight', { value: undefined, writable: true });
      Object.defineProperty(window, 'innerWidth', { value: undefined, writable: true });
      
      // Mock document.documentElement dimensions
      Object.defineProperty(document.documentElement, 'clientHeight', { value: 800, writable: true });
      Object.defineProperty(document.documentElement, 'clientWidth', { value: 1200, writable: true });

      const result = isInViewport(mockElement);
      expect(result).toBe(true);
    });
  });

  describe('scrollIntoView', () => {
    it('should handle null element gracefully', () => {
      expect(() => scrollIntoView(null)).not.toThrow();
    });

    it('should call scrollIntoView on element', () => {
      const mockElement = {
        scrollIntoView: jest.fn()
      } as any;

      scrollIntoView(mockElement);
      expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
        block: 'nearest',
        behavior: 'smooth'
      });
    });

    it('should handle container scrolling when element is above visible area', () => {
      const mockContainer = {
        scrollTop: 150,
        clientHeight: 200
      };

      const mockElement = {
        offsetTop: 100,
        offsetHeight: 50
      } as any;

      scrollIntoView(mockElement, mockContainer as any);
      // Element is above visible area (offsetTop 100 < scrollTop 150), so scrollTop should be set to elementTop
      expect(mockContainer.scrollTop).toBe(100);
    });

    it('should handle container scrolling when element is below visible area', () => {
      const mockContainer = {
        scrollTop: 0,
        clientHeight: 200
      };

      const mockElement = {
        offsetTop: 300,
        offsetHeight: 50
      } as any;

      scrollIntoView(mockElement, mockContainer as any);
      // Element is below visible area (elementBottom 350 > containerBottom 200)
      // scrollTop should be set to elementBottom - clientHeight = 350 - 200 = 150
      expect(mockContainer.scrollTop).toBe(150);
    });
  });
});