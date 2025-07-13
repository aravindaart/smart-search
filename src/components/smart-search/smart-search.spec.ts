import { newSpecPage } from '@stencil/core/testing';
import { SmartSearch } from './smart-search';

describe('SmartSearch', () => {
  const mockData = [
    {
      id: '1',
      title: 'Primary Checking',
      subtitle: 'Account ****1234',
      description: 'Available Balance: $5,430.50',
      category: 'accounts'
    },
    {
      id: '2',
      title: 'Business Savings',
      subtitle: 'Account ****5678',
      description: 'Available Balance: $12,750.00',
      category: 'accounts'
    }
  ];

  beforeEach(() => {
    // Mock fetch for API tests
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render with default props', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search></smart-search>`,
    });

    expect(page.root).toBeTruthy();
    const input = page.root.shadowRoot.querySelector('smart-search-input');
    const results = page.root.shadowRoot.querySelector('smart-search-results');
    
    expect(input).toBeTruthy();
    expect(results).toBeTruthy();
  });

  it('should pass basic props to child components', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search placeholder="Search accounts..." theme="dark"></smart-search>`,
    });

    await page.waitForChanges();

    const input = page.root.shadowRoot.querySelector('smart-search-input');
    const results = page.root.shadowRoot.querySelector('smart-search-results');

    expect(input.getAttribute('placeholder')).toBe('Search accounts...');
    expect(input.getAttribute('theme')).toBe('dark');
    expect(results.getAttribute('theme')).toBe('dark');
  });

  it('should handle data source as prop', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search></smart-search>`,
    });

    // Test that dataSource prop exists and can be read
    const component = page.rootInstance;
    expect(component.dataSource).toBeDefined();
    
    // Test with array (simulating prop setting via HTML)
    expect(typeof component.dataSource === 'string' || Array.isArray(component.dataSource)).toBe(true);
  });

  it('should respect minimum search length setting', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search min-search-length="3"></smart-search>`,
    });

    const component = page.rootInstance;
    expect(component.minSearchLength).toBe(3);
  });

  it('should handle different filter modes', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search filter-mode="startsWith"></smart-search>`,
    });

    const component = page.rootInstance;
    expect(component.filterMode).toBe('startsWith');
  });

  it('should emit searchInput event', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search></smart-search>`,
    });

    let emittedEvent = null;
    page.root.addEventListener('searchInput', (event: any) => {
      emittedEvent = event.detail;
    });

    const component = page.rootInstance;
    component.searchInput.emit({ query: 'test', value: 'test' });

    expect(emittedEvent).toEqual({ query: 'test', value: 'test' });
  });

  it('should emit resultSelect event', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search></smart-search>`,
    });

    let selectedResult = null;
    page.root.addEventListener('resultSelect', (event: any) => {
      selectedResult = event.detail.result;
    });

    const component = page.rootInstance;
    component.resultSelect.emit({ result: mockData[0], index: 0 });

    expect(selectedResult).toEqual(mockData[0]);
  });

  it('should emit searchClear event', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search></smart-search>`,
    });

    let clearEventFired = false;
    page.root.addEventListener('searchClear', () => {
      clearEventFired = true;
    });

    const component = page.rootInstance;
    component.searchClear.emit();

    expect(clearEventFired).toBe(true);
  });

  it('should handle focus and blur events', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search></smart-search>`,
    });

    let focusEventFired = false;
    let blurEventFired = false;

    page.root.addEventListener('searchFocus', () => {
      focusEventFired = true;
    });

    page.root.addEventListener('searchBlur', () => {
      blurEventFired = true;
    });

    const component = page.rootInstance;
    component.searchFocus.emit({});
    component.searchBlur.emit({});

    expect(focusEventFired).toBe(true);
    expect(blurEventFired).toBe(true);
  });

  it('should handle search fields configuration', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search search-fields="title,subtitle"></smart-search>`,
    });

    const component = page.rootInstance;
    // searchFields is parsed as an array internally
    expect(Array.isArray(component.searchFields)).toBe(true);
    expect(component.searchFields).toContain('title');
    expect(component.searchFields).toContain('subtitle');
  });

  it('should handle max results setting', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search max-results="5"></smart-search>`,
    });

    const component = page.rootInstance;
    expect(component.maxResults).toBe(5);
  });

  it('should handle group by setting', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search group-by="category"></smart-search>`,
    });

    const component = page.rootInstance;
    expect(component.groupBy).toBe('category');
  });

  it('should handle API data source URL', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search data-source="https://api.example.com/search"></smart-search>`,
    });

    const component = page.rootInstance;
    expect(component.dataSource).toBe('https://api.example.com/search');
  });

  it('should manage open state', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search></smart-search>`,
    });

    const component = page.rootInstance;
    
    // Test initial state
    expect(component.isOpen).toBe(false);
    
    // Test opening
    component.isOpen = true;
    expect(component.isOpen).toBe(true);
  });

  it('should handle loading state', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search></smart-search>`,
    });

    const component = page.rootInstance;
    
    // Test initial state
    expect(component.isLoading).toBe(false);
    
    // Test loading state
    component.isLoading = true;
    expect(component.isLoading).toBe(true);
  });

  it('should handle theme updates with watcher', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search theme="light"></smart-search>`,
    });

    const component = page.rootInstance;
    
    // Initial theme
    expect(page.root.getAttribute('data-theme')).toBe('light');
    
    // Test the updateTheme method directly
    component.updateTheme();
    expect(page.root.getAttribute('data-theme')).toBe('light');
  });

  it('should handle click outside to close results', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search></smart-search>`,
    });

    const component = page.rootInstance;
    component.isOpen = true;
    
    // Mock contains method
    component.el.contains = jest.fn().mockReturnValue(false);
    
    // Simulate click outside
    const clickEvent = new (global as any).Event('click');
    Object.defineProperty(clickEvent, 'target', { value: document.createElement('div') });
    
    component.handleClickOutside(clickEvent);
    expect(component.isOpen).toBe(false);
  });

  it('should handle focus change to close results', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search></smart-search>`,
    });

    const component = page.rootInstance;
    component.isOpen = true;
    
    // Mock contains method
    component.el.contains = jest.fn().mockReturnValue(false);
    
    // Simulate focus outside
    const focusEvent = new FocusEvent('focusin');
    Object.defineProperty(focusEvent, 'target', { value: document.createElement('div') });
    
    component.handleFocusChange(focusEvent);
    expect(component.isOpen).toBe(false);
  });

  it('should not close results when clicking inside', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search></smart-search>`,
    });

    const component = page.rootInstance;
    component.isOpen = true;
    
    // Mock contains method to return true (click inside)
    component.el.contains = jest.fn().mockReturnValue(true);
    
    // Simulate click inside
    const clickEvent = new (global as any).Event('click');
    Object.defineProperty(clickEvent, 'target', { value: document.createElement('div') });
    
    component.handleClickOutside(clickEvent);
    expect(component.isOpen).toBe(true);
  });

  it('should perform API search', async () => {
    // Mock fetch
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve([
        { id: '1', title: 'API Result 1' },
        { id: '2', title: 'API Result 2' }
      ])
    });

    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search data-source="https://api.example.com/search"></smart-search>`,
    });

    const component = page.rootInstance;
    
    const results = await component.performSearch('test');
    
    expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/search?q=test');
    expect(results).toHaveLength(2);
    expect(results[0].title).toBe('API Result 1');
  });

  it('should handle API search errors', async () => {
    // Mock fetch to throw error
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
    
    // Mock console.error to avoid test output noise
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search data-source="https://api.example.com/search"></smart-search>`,
    });

    const component = page.rootInstance;
    
    const results = await component.performSearch('test');
    
    expect(results).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith('Search API error:', expect.any(Error));
    
    consoleSpy.mockRestore();
  });

  it('should handle API response with results property', async () => {
    // Mock fetch with nested results
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({
        results: [
          { id: '1', title: 'Nested Result 1' }
        ],
        total: 1
      })
    });

    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search data-source="https://api.example.com/search"></smart-search>`,
    });

    const component = page.rootInstance;
    
    const results = await component.performSearch('test');
    
    expect(results).toHaveLength(1);
    expect(results[0].title).toBe('Nested Result 1');
  });

  it('should handle API response that returns direct array', async () => {
    // Mock fetch that returns array directly (not nested in results property)
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve([
        { id: '1', title: 'Direct Array Result 1' },
        { id: '2', title: 'Direct Array Result 2' }
      ])
    });

    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search data-source="https://api.example.com/search"></smart-search>`,
    });

    const component = page.rootInstance;
    
    const results = await component.performSearch('test');
    
    expect(results).toHaveLength(2);
    expect(results[0].title).toBe('Direct Array Result 1');
  });

  it('should handle API response with no results property fallback', async () => {
    // Mock fetch that returns object without results property (covers data.results || [] fallback)
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({
        total: 0,
        status: 'success'
        // No results property
      })
    });

    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search data-source="https://api.example.com/search"></smart-search>`,
    });

    const component = page.rootInstance;
    
    const results = await component.performSearch('test');
    
    expect(results).toEqual([]);
  });

  it('should perform local search with array data', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search></smart-search>`,
    });

    const component = page.rootInstance;
    
    const results = await component.performSearch('Local');
    
    // Since no dataSource is set, should return empty array
    expect(results).toEqual([]);
  });

  it('should update data source and parse search fields', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search search-fields="title,subtitle,description"></smart-search>`,
    });

    const component = page.rootInstance;
    
    component.updateDataSource();
    
    expect(component.searchFields).toEqual(['title', 'subtitle', 'description']);
  });

  it('should handle search input events', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search></smart-search>`,
    });

    const component = page.rootInstance;
    
    let searchEvent = null;
    page.root.addEventListener('searchInput', (event: any) => {
      searchEvent = event.detail;
    });
    
    await component.handleSearchInput({ detail: { value: 'test', query: 'test' } });
    
    expect(component.isOpen).toBe(true);
    // Without dataSource, currentResults should be empty or undefined
    expect(component.currentResults || []).toEqual([]);
    expect(searchEvent).toEqual({ value: 'test', query: 'test' });
  });

  it('should handle empty search input', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search></smart-search>`,
    });

    const component = page.rootInstance;
    component.isOpen = true;
    
    await component.handleSearchInput({ detail: { value: '', query: '' } });
    
    expect(component.isOpen).toBe(false);
    expect(component.currentResults || []).toEqual([]);
  });

  it('should handle result selection', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search></smart-search>`,
    });

    const component = page.rootInstance;
    const testResult = { id: '1', title: 'Selected Result' };
    
    let resultSelectEvent = null;
    page.root.addEventListener('resultSelect', (event: any) => {
      resultSelectEvent = event.detail;
    });
    
    component.handleResultSelect({ detail: { result: testResult, index: 0 } });
    
    expect(component.isOpen).toBe(false);
    expect(resultSelectEvent.result).toEqual(testResult);
  });

  it('should handle clear events', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search></smart-search>`,
    });

    const component = page.rootInstance;
    component.isOpen = true;
    
    let clearEvent = false;
    page.root.addEventListener('searchClear', () => {
      clearEvent = true;
    });
    
    component.handleSearchClear();
    
    expect(component.isOpen).toBe(false);
    expect(clearEvent).toBe(true);
  });

  it('should handle focus events', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search></smart-search>`,
    });

    const component = page.rootInstance;
    
    let focusEvent = null;
    
    page.root.addEventListener('searchFocus', (event: any) => {
      focusEvent = event.detail;
    });
    
    const mockFocusEvent = { type: 'focus' };
    
    component.handleSearchFocus({ detail: mockFocusEvent });
    
    expect(focusEvent).toEqual(mockFocusEvent);
  });

  it('should test filter mode setting', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search filter-mode="startsWith"></smart-search>`,
    });

    const component = page.rootInstance;
    expect(component.filterMode).toBe('startsWith');
  });

  it('should test minimum search length setting', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search min-search-length="3"></smart-search>`,
    });

    const component = page.rootInstance;
    expect(component.minSearchLength).toBe(3);
    
    // Test short query handling
    await component.handleSearchInput({ detail: { value: 'te', query: 'te' } });
    expect(component.currentResults || []).toEqual([]);
  });

  it('should close results method', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search></smart-search>`,
    });

    const component = page.rootInstance;
    component.isOpen = true;
    
    component.closeResults();
    expect(component.isOpen).toBe(false);
  });

  it('should handle component lifecycle', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search theme="dark" search-fields="title,subtitle"></smart-search>`,
    });

    const component = page.rootInstance;
    
    // Mock event listeners
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    
    // Test componentDidLoad
    component.componentDidLoad();
    expect(page.root.getAttribute('data-theme')).toBe('dark');
    expect(addEventListenerSpy).toHaveBeenCalledWith('click', component.handleClickOutside);
    expect(addEventListenerSpy).toHaveBeenCalledWith('focusin', component.handleFocusChange);
    
    // Test disconnectedCallback
    component.disconnectedCallback();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('click', component.handleClickOutside);
    expect(removeEventListenerSpy).toHaveBeenCalledWith('focusin', component.handleFocusChange);
    
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('should handle search focus with existing value', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search min-search-length="3"></smart-search>`,
    });

    const component = page.rootInstance;
    component.value = 'test query';
    
    let focusEvent = null;
    page.root.addEventListener('searchFocus', (event: any) => {
      focusEvent = event.detail;
    });
    
    const mockFocusEvent = { type: 'focus' };
    component.handleSearchFocus({ detail: mockFocusEvent });
    
    // Should open results since value length >= minSearchLength
    expect(component.isOpen).toBe(true);
    expect(focusEvent).toEqual(mockFocusEvent);
  });

  it('should handle search blur with delay', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search></smart-search>`,
    });

    const component = page.rootInstance;
    
    let blurEventReceived = false;
    page.root.addEventListener('searchBlur', () => {
      blurEventReceived = true;
    });
    
    const mockBlurEvent = { type: 'blur' };
    component.handleSearchBlur({ detail: mockBlurEvent });
    
    // Should not be immediate due to setTimeout
    expect(blurEventReceived).toBe(false);
    
    // Wait for setTimeout delay
    await new Promise(resolve => setTimeout(resolve, 200));
    expect(blurEventReceived).toBe(true);
  });

  it('should handle result hover events', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search></smart-search>`,
    });

    const component = page.rootInstance;
    
    let hoverEvent = null;
    page.root.addEventListener('resultHover', (event: any) => {
      hoverEvent = event.detail;
    });
    
    const mockHoverEvent = { result: { id: '1', title: 'Test' }, index: 0 };
    component.handleResultHover({ detail: mockHoverEvent });
    
    expect(hoverEvent).toEqual(mockHoverEvent);
  });

  it('should update input aria attributes', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search></smart-search>`,
    });

    const component = page.rootInstance;
    
    // Mock refs and DOM elements
    const mockInput = {
      setAttribute: jest.fn()
    };
    
    component.searchInputRef = {
      shadowRoot: {
        querySelector: jest.fn().mockReturnValue(mockInput)
      }
    } as any;
    
    component.searchResultsRef = {} as any;
    component.isOpen = true;
    
    component.updateInputAriaAttributes();
    
    expect(mockInput.setAttribute).toHaveBeenCalledWith('aria-expanded', 'true');
    expect(mockInput.setAttribute).toHaveBeenCalledWith('aria-owns', 'search-results-list');
  });

  it('should handle component did update', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search></smart-search>`,
    });

    const component = page.rootInstance;
    
    // Mock the updateInputAriaAttributes method
    component.updateInputAriaAttributes = jest.fn();
    
    component.componentDidUpdate();
    
    expect(component.updateInputAriaAttributes).toHaveBeenCalled();
  });

  it('should handle aria attributes when refs are not available', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search></smart-search>`,
    });

    const component = page.rootInstance;
    
    // Test when refs are null/undefined
    component.searchInputRef = null;
    component.searchResultsRef = null;
    
    // Should not throw error
    expect(() => component.updateInputAriaAttributes()).not.toThrow();
  });

  it('should handle aria attributes when input is not found', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search></smart-search>`,
    });

    const component = page.rootInstance;
    
    // Mock refs but no input element
    component.searchInputRef = {
      shadowRoot: {
        querySelector: jest.fn().mockReturnValue(null)
      }
    } as any;
    
    component.searchResultsRef = {} as any;
    
    // Should not throw error
    expect(() => component.updateInputAriaAttributes()).not.toThrow();
  });

  it('should handle aria attributes when shadowRoot is null', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search></smart-search>`,
    });

    const component = page.rootInstance;
    
    // Mock refs with null shadowRoot
    component.searchInputRef = {
      shadowRoot: null
    } as any;
    
    component.searchResultsRef = {} as any;
    
    // Should not throw error and not call querySelector
    expect(() => component.updateInputAriaAttributes()).not.toThrow();
  });
});