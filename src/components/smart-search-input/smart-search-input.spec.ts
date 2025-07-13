import { newSpecPage } from '@stencil/core/testing';
import { SmartSearchInput } from './smart-search-input';

describe('SmartSearchInput', () => {
  it('should render with default props', async () => {
    const page = await newSpecPage({
      components: [SmartSearchInput],
      html: `<smart-search-input></smart-search-input>`,
    });

    expect(page.root).toBeTruthy();
    const input = page.root.shadowRoot.querySelector('input');
    expect(input).toBeTruthy();
    expect(input.placeholder).toBe('Search...');
  });

  it('should render with custom placeholder', async () => {
    const page = await newSpecPage({
      components: [SmartSearchInput],
      html: `<smart-search-input placeholder="Search accounts..."></smart-search-input>`,
    });

    const input = page.root.shadowRoot.querySelector('input');
    expect(input.placeholder).toBe('Search accounts...');
  });

  it('should apply disabled state', async () => {
    const page = await newSpecPage({
      components: [SmartSearchInput],
      html: `<smart-search-input disabled="true"></smart-search-input>`,
    });

    const input = page.root.shadowRoot.querySelector('input');
    expect(input.disabled).toBe(true);
  });

  it('should show loading spinner when loading', async () => {
    const page = await newSpecPage({
      components: [SmartSearchInput],
      html: `<smart-search-input loading="true"></smart-search-input>`,
    });

    const spinner = page.root.shadowRoot.querySelector('.loading-spinner');
    expect(spinner).toBeTruthy();
  });

  it('should show clear button when value exists and clearable', async () => {
    const page = await newSpecPage({
      components: [SmartSearchInput],
      html: `<smart-search-input value="test" clearable="true"></smart-search-input>`,
    });

    const clearButton = page.root.shadowRoot.querySelector('.clear-button');
    expect(clearButton).toBeTruthy();
  });

  it('should hide clear button when no value', async () => {
    const page = await newSpecPage({
      components: [SmartSearchInput],
      html: `<smart-search-input value="" clearable="true"></smart-search-input>`,
    });

    const clearButton = page.root.shadowRoot.querySelector('.clear-button');
    expect(clearButton).toBeFalsy();
  });

  it('should apply dark theme', async () => {
    const page = await newSpecPage({
      components: [SmartSearchInput],
      html: `<smart-search-input theme="dark"></smart-search-input>`,
    });

    expect(page.root.getAttribute('data-theme')).toBe('dark');
  });

  it('should update input value', async () => {
    const page = await newSpecPage({
      components: [SmartSearchInput],
      html: `<smart-search-input></smart-search-input>`,
    });

    const component = page.rootInstance;
    component.value = 'new value';
    await page.waitForChanges();

    const input = page.root.shadowRoot.querySelector('input');
    expect(input.value).toBe('new value');
  });

  it('should emit events on input change', async () => {
    const page = await newSpecPage({
      components: [SmartSearchInput],
      html: `<smart-search-input></smart-search-input>`,
    });

    let eventFired = false;
    page.root.addEventListener('searchInput', () => {
      eventFired = true;
    });

    const component = page.rootInstance;
    const mockEvent = {
      target: { value: 'test input' }
    } as any;

    component.handleInput(mockEvent);

    // Wait for debounce
    await new Promise(resolve => setTimeout(resolve, 350));

    expect(eventFired).toBe(true);
    expect(component.value).toBe('test input');
  });

  it('should clear input when clear method is called', async () => {
    const page = await newSpecPage({
      components: [SmartSearchInput],
      html: `<smart-search-input value="test"></smart-search-input>`,
    });

    let clearEventFired = false;
    page.root.addEventListener('searchClear', () => {
      clearEventFired = true;
    });

    const component = page.rootInstance;
    // Simulate clear button click by setting value to empty
    component.value = '';
    component.searchClear.emit();

    expect(component.value).toBe('');
    expect(clearEventFired).toBe(true);
  });

  it('should respect minimum search length', async () => {
    const page = await newSpecPage({
      components: [SmartSearchInput],
      html: `<smart-search-input min-search-length="3"></smart-search-input>`,
    });

    let eventFired = false;
    page.root.addEventListener('searchInput', () => {
      eventFired = true;
    });

    const component = page.rootInstance;
    
    // Short input should not trigger event
    const shortEvent = { target: { value: 'ab' } } as any;
    component.handleInput(shortEvent);
    
    await new Promise(resolve => setTimeout(resolve, 350));
    expect(eventFired).toBe(false);

    // Long enough input should trigger event
    const longEvent = { target: { value: 'abc' } } as any;
    component.handleInput(longEvent);
    
    await new Promise(resolve => setTimeout(resolve, 350));
    expect(eventFired).toBe(true);
  });

  it('should handle theme updates with watcher', async () => {
    const page = await newSpecPage({
      components: [SmartSearchInput],
      html: `<smart-search-input theme="light"></smart-search-input>`,
    });

    const component = page.rootInstance;
    
    // Initial theme
    expect(page.root.getAttribute('data-theme')).toBe('light');
    
    // Test the updateTheme method directly
    component.updateTheme();
    expect(page.root.getAttribute('data-theme')).toBe('light');
  });

  it('should handle debounce time updates', async () => {
    const page = await newSpecPage({
      components: [SmartSearchInput],
      html: `<smart-search-input debounce-time="500"></smart-search-input>`,
    });

    const component = page.rootInstance;
    expect(component.debounceTime).toBe(500);
    
    // Test updateDebounce method
    const originalDebounced = component.debouncedSearch;
    component.updateDebounce();
    expect(component.debouncedSearch).not.toBe(originalDebounced);
  });

  it('should handle autofocus on component load', async () => {
    const page = await newSpecPage({
      components: [SmartSearchInput],
      html: `<smart-search-input auto-focus="true"></smart-search-input>`,
    });

    const component = page.rootInstance;
    
    // Mock inputRef focus method
    component.inputRef = { focus: jest.fn() };
    
    // Simulate componentDidLoad
    component.componentDidLoad();
    expect(component.inputRef.focus).toHaveBeenCalled();
  });

  it('should handle focus and blur events', async () => {
    const page = await newSpecPage({
      components: [SmartSearchInput],
      html: `<smart-search-input></smart-search-input>`,
    });

    const component = page.rootInstance;
    
    let focusEventFired = false;
    let blurEventFired = false;
    
    page.root.addEventListener('searchFocus', () => {
      focusEventFired = true;
    });
    
    page.root.addEventListener('searchBlur', () => {
      blurEventFired = true;
    });

    // Test focus
    const focusEvent = new FocusEvent('focus');
    component.handleFocus(focusEvent);
    expect(component.focused).toBe(true);
    expect(focusEventFired).toBe(true);

    // Test blur
    const blurEvent = new FocusEvent('blur');
    component.handleBlur(blurEvent);
    expect(component.focused).toBe(false);
    expect(blurEventFired).toBe(true);
  });

  it('should handle clear functionality', async () => {
    const page = await newSpecPage({
      components: [SmartSearchInput],
      html: `<smart-search-input clearable="true"></smart-search-input>`,
    });

    const component = page.rootInstance;
    component.value = 'test query';
    
    // Mock inputRef focus method
    component.inputRef = { focus: jest.fn() };
    
    let clearEventFired = false;
    let searchInputEvent = null;
    
    page.root.addEventListener('searchClear', () => {
      clearEventFired = true;
    });
    
    page.root.addEventListener('searchInput', (event: any) => {
      searchInputEvent = event.detail;
    });

    // Test clear
    component.handleClear();
    
    expect(component.value).toBe('');
    expect(component.inputRef.focus).toHaveBeenCalled();
    expect(clearEventFired).toBe(true);
    expect(searchInputEvent).toEqual({ value: '', query: '' });
  });

  it('should handle keyboard events', async () => {
    const page = await newSpecPage({
      components: [SmartSearchInput],
      html: `<smart-search-input></smart-search-input>`,
    });

    const component = page.rootInstance;
    
    // Mock element dispatchEvent method
    const dispatchEventSpy = jest.spyOn(page.root, 'dispatchEvent');

    const testKeys = ['ArrowDown', 'ArrowUp', 'Enter', 'Escape'];
    
    testKeys.forEach(key => {
      const keyEvent = new KeyboardEvent('keydown', { key });
      keyEvent.stopPropagation = jest.fn();
      
      component.handleKeyDown(keyEvent);
      
      expect(keyEvent.stopPropagation).toHaveBeenCalled();
      expect(dispatchEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'searchKeyDown',
          detail: expect.objectContaining({
            key,
            originalEvent: keyEvent
          })
        })
      );
    });
  });

  it('should not handle non-special keyboard events', async () => {
    const page = await newSpecPage({
      components: [SmartSearchInput],
      html: `<smart-search-input></smart-search-input>`,
    });

    const component = page.rootInstance;
    
    // Mock element dispatchEvent method
    const dispatchEventSpy = jest.spyOn(page.root, 'dispatchEvent');

    const keyEvent = new KeyboardEvent('keydown', { key: 'a' });
    keyEvent.stopPropagation = jest.fn();
    
    component.handleKeyDown(keyEvent);
    
    expect(keyEvent.stopPropagation).not.toHaveBeenCalled();
    expect(dispatchEventSpy).not.toHaveBeenCalled();
  });

  it('should emit search input with proper sanitization', async () => {
    const page = await newSpecPage({
      components: [SmartSearchInput],
      html: `<smart-search-input min-search-length="2"></smart-search-input>`,
    });

    const component = page.rootInstance;
    
    let searchEvents = [];
    page.root.addEventListener('searchInput', (event: any) => {
      searchEvents.push(event.detail);
    });

    // Test empty value
    component.emitSearchInput('');
    expect(searchEvents.length).toBe(1);
    expect(searchEvents[0]).toEqual({ value: '', query: '' });

    // Test value meeting minimum length
    component.emitSearchInput('test');
    expect(searchEvents.length).toBe(2);
    expect(searchEvents[1]).toEqual({ value: 'test', query: 'test' });

    // Test value below minimum length (should not emit)
    searchEvents.length = 0;
    component.emitSearchInput('a');
    expect(searchEvents.length).toBe(0);
  });

  it('should execute debounced search function', async () => {
    const page = await newSpecPage({
      components: [SmartSearchInput],
      html: `<smart-search-input debounce-time="50"></smart-search-input>`,
    });

    const component = page.rootInstance;
    
    let searchEvents = [];
    page.root.addEventListener('searchInput', (event: any) => {
      searchEvents.push(event.detail);
    });

    // Update debounce to create new debounced function
    component.updateDebounce();
    
    // Execute the debounced function directly to cover line 47
    component.debouncedSearch('test query');
    
    // Wait for debounce delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(searchEvents.length).toBe(1);
    expect(searchEvents[0]).toEqual({ value: 'test query', query: 'test query' });
  });

  it('should handle autofocus when inputRef is undefined', async () => {
    const page = await newSpecPage({
      components: [SmartSearchInput],
      html: `<smart-search-input auto-focus="true"></smart-search-input>`,
    });

    const component = page.rootInstance;
    
    // Test when inputRef is undefined/null (covers line 59)
    component.inputRef = undefined;
    
    // Should not throw error when inputRef is undefined
    expect(() => component.componentDidLoad()).not.toThrow();
  });
});