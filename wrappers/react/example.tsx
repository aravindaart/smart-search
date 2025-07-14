// Example usage of React wrapper
import React, { useState, useRef } from 'react';
import { SmartSearch, SmartSearchRef, SearchResult } from './SmartSearch';

const ExampleApp: React.FC = () => {
  const searchRef = useRef<SmartSearchRef>(null);
  const [searchData] = useState<SearchResult[]>([
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

  const handleSearchInput = (event: any) => {
    console.log('Search input:', event.query);
  };

  const handleResultSelect = (event: any) => {
    console.log('Result selected:', event.result);
    alert(`Selected: ${event.result.title}`);
  };

  const handleClearSearch = () => {
    searchRef.current?.clear();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Smart Search React Wrapper Example</h1>
      
      <SmartSearch
        ref={searchRef}
        placeholder="Search accounts, transactions..."
        theme="light"
        maxResults={10}
        debounceTime={300}
        minSearchLength={2}
        dataSource={searchData}
        onSearchInput={handleSearchInput}
        onResultSelect={handleResultSelect}
        style={{ marginBottom: '20px' }}
      />
      
      <button onClick={handleClearSearch} style={{ marginTop: '10px' }}>
        Clear Search
      </button>
      
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p>Try searching for: "checking", "savings", "account"</p>
        <p>This example demonstrates the React wrapper with TypeScript support.</p>
      </div>
    </div>
  );
};

export default ExampleApp;