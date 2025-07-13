#!/usr/bin/env node

/**
 * Script to extract test count from npm test output
 * Used by version bump script to automatically update README
 */

const { execSync } = require('child_process');

function getTestCount() {
  try {
    // Run tests with coverage and capture both stdout and stderr
    const output = execSync('npm test 2>&1', { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    
    // Extract test count from Jest output with multiple patterns
    // Pattern 1: "Tests:       156 passed, 156 total"
    const testMatch = output.match(/Tests:\s+(\d+)\s+passed,\s+(\d+)\s+total/);
    
    if (testMatch) {
      const passedTests = parseInt(testMatch[1]);
      const totalTests = parseInt(testMatch[2]);
      
      return {
        passed: passedTests,
        total: totalTests,
        success: true
      };
    }
    
    // Pattern 2: Check for test suites pattern first
    const suiteMatch = output.match(/Test Suites:\s+(\d+)\s+passed.*?\nTests:\s+(\d+)\s+passed,\s+(\d+)\s+total/s);
    if (suiteMatch) {
      const passedTests = parseInt(suiteMatch[2]);
      const totalTests = parseInt(suiteMatch[3]);
      
      return {
        passed: passedTests,
        total: totalTests,
        success: true
      };
    }
    
    // Pattern 3: Look for just the numbers after Tests:
    const simpleMatch = output.match(/Tests:\s*(\d+)\s+passed/);
    if (simpleMatch) {
      const testCount = parseInt(simpleMatch[1]);
      
      return {
        passed: testCount,
        total: testCount,
        success: true
      };
    }
    
    throw new Error('Could not extract test count from output');
    
  } catch (error) {
    console.error('Error running tests:', error.message);
    return {
      passed: 0,
      total: 0,
      success: false,
      error: error.message
    };
  }
}

// Export for use in other scripts
module.exports = { getTestCount };

// CLI usage
if (require.main === module) {
  const result = getTestCount();
  
  if (result.success) {
    console.log(`Test Count: ${result.total}`);
    console.log(`Passed: ${result.passed}`);
    console.log(`Total: ${result.total}`);
  } else {
    console.error('Failed to get test count:', result.error);
    process.exit(1);
  }
}