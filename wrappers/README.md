# Smart Search Framework Wrappers

This directory contains framework-specific wrapper components that provide native APIs for React, Angular, and Vue. These wrappers eliminate common integration issues and provide better developer experience compared to using custom elements directly.

## Available Wrappers

### React Wrapper (`@aravindaart/smart-search-react`)
- **Location**: `./react/`
- **Features**: Native React props, TypeScript support, imperative methods via ref
- **Installation**: `npm install @aravindaart/smart-search-react`

### Angular Wrapper (`@aravindaart/smart-search-angular`)
- **Location**: `./angular/`
- **Features**: Angular module, Input/Output decorators, lifecycle hooks
- **Installation**: `npm install @aravindaart/smart-search-angular`

### Vue Wrapper (`@aravindaart/smart-search-vue`)
- **Location**: `./vue/`
- **Features**: Vue 3 composition API, reactive props, expose methods
- **Installation**: `npm install @aravindaart/smart-search-vue`

## Benefits of Using Wrappers

✅ **No manual component registration** - Wrappers handle `defineCustomElements()` automatically  
✅ **No timing issues** - Proper initialization and data setting  
✅ **Native TypeScript support** - Full type safety with framework-specific types  
✅ **Framework-specific event handling** - Use native event binding patterns  
✅ **Proper prop/attribute binding** - Automatic conversion between frameworks  
✅ **Better developer experience** - IntelliSense, autocomplete, and error checking  

## Development Notes

### Building Wrappers

These wrappers are currently provided as source code. To publish them as separate packages:

1. **React Wrapper**:
   ```bash
   cd wrappers/react
   npm run build  # Would need build script
   npm publish
   ```

2. **Angular Wrapper**:
   ```bash
   cd wrappers/angular
   ng build  # Would need Angular build setup
   npm publish
   ```

3. **Vue Wrapper**:
   ```bash
   cd wrappers/vue
   npm run build  # Would need Vue build setup
   npm publish
   ```

### Testing Wrappers

Each wrapper should be tested with:
- Component mounting/unmounting
- Data binding and updates
- Event emission and handling
- TypeScript type checking
- Performance with large datasets

## Contributing

When updating the core library, ensure wrapper compatibility:

1. Update wrapper TypeScript interfaces if core types change
2. Test wrapper functionality with new features
3. Update wrapper documentation and examples
4. Maintain backward compatibility where possible

## Framework Integration Examples

See the main README.md for detailed usage examples of each wrapper in their respective frameworks.