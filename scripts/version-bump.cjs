#!/usr/bin/env node

/**
 * Version bump script that:
 * 1. Updates package.json version
 * 2. Gets current test count from test runner
 * 3. Updates README with new test count
 * 4. Commits changes with version tag
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { getTestCount } = require('./get-test-count.cjs');

const PACKAGE_JSON_PATH = path.join(__dirname, '..', 'package.json');
const README_PATH = path.join(__dirname, '..', 'readme.md');

function getCurrentVersion() {
  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
  return packageJson.version;
}

function updatePackageVersion(bumpType = 'patch') {
  console.log(`🔄 Bumping ${bumpType} version...`);
  
  try {
    execSync(`npm version ${bumpType} --no-git-tag-version`, { stdio: 'pipe' });
    const newVersion = getCurrentVersion();
    console.log(`✅ Version updated to: ${newVersion}`);
    return newVersion;
  } catch (error) {
    console.error('❌ Error updating version:', error.message);
    process.exit(1);
  }
}

function updateReadmeTestCount(testCount) {
  console.log(`🔄 Updating README test count to ${testCount}...`);
  
  try {
    let readmeContent = fs.readFileSync(README_PATH, 'utf8');
    
    // Update test badge (line 7)
    readmeContent = readmeContent.replace(
      /\[!\[Tests\]\(https:\/\/img\.shields\.io\/badge\/Tests-\d+%20Passed-brightgreen\.svg\)\]/g,
      `[![Tests](https://img.shields.io/badge/Tests-${testCount}%20Passed-brightgreen.svg)]`
    );
    
    // Update test statistics section (line 555)
    readmeContent = readmeContent.replace(
      /- \*\*\d+ Tests\*\* - Comprehensive test suite covering all functionality/g,
      `- **${testCount} Tests** - Comprehensive test suite covering all functionality`
    );
    
    fs.writeFileSync(README_PATH, readmeContent, 'utf8');
    console.log(`✅ README updated with test count: ${testCount}`);
    
  } catch (error) {
    console.error('❌ Error updating README:', error.message);
    process.exit(1);
  }
}

function commitChanges(version, testCount) {
  console.log(`🔄 Committing changes for version ${version}...`);
  
  try {
    // Add changed files
    execSync('git add package.json readme.md', { stdio: 'pipe' });
    
    // Create commit with version and test count info
    const commitMessage = `chore: bump version to ${version} and update test count to ${testCount}

- Update package.json version to ${version}
- Update README test count to ${testCount}
- Automated via version-bump script`;

    execSync(`git commit -m "${commitMessage}"`, { stdio: 'pipe' });
    
    // Create version tag
    execSync(`git tag v${version}`, { stdio: 'pipe' });
    
    console.log(`✅ Changes committed and tagged as v${version}`);
    
  } catch (error) {
    console.error('❌ Error committing changes:', error.message);
    process.exit(1);
  }
}

function main() {
  const args = process.argv.slice(2);
  const bumpType = args[0] || 'patch'; // patch, minor, major
  
  console.log('🚀 Starting version bump process...');
  console.log(`📦 Bump type: ${bumpType}`);
  
  // Step 1: Get current test count
  console.log('🧪 Running tests to get current count...');
  const testResult = getTestCount();
  
  if (!testResult.success) {
    console.error('❌ Tests failed, aborting version bump');
    process.exit(1);
  }
  
  const testCount = testResult.total;
  console.log(`✅ Tests passed: ${testResult.passed}/${testCount}`);
  
  // Step 2: Update package version
  const newVersion = updatePackageVersion(bumpType);
  
  // Step 3: Update README with test count
  updateReadmeTestCount(testCount);
  
  // Step 4: Commit changes
  commitChanges(newVersion, testCount);
  
  console.log('🎉 Version bump completed successfully!');
  console.log(`📋 Summary:`);
  console.log(`   - New version: ${newVersion}`);
  console.log(`   - Test count: ${testCount}`);
  console.log(`   - Files updated: package.json, readme.md`);
  console.log(`   - Git tag created: v${newVersion}`);
  console.log('');
  console.log('💡 Next steps:');
  console.log('   - Review changes: git show HEAD');
  console.log('   - Push changes: git push origin main --tags');
  console.log('   - Publish: npm publish');
}

if (require.main === module) {
  main();
}