# Configuration Directory

This directory contains all application configuration files and data aggregators for the TechNotes Interview OS application.

## Files

### `appData.js`
- **Purpose**: Main data aggregator that imports all topic modules
- **Function**: Centralizes all content data into a single exportable structure
- **Location**: Moved from `src/data/` for better organization
- **Imports**: All individual topic files from `../data/`

### `index.js`
- **Purpose**: Clean export interface for all configuration
- **Function**: Provides centralized access to configuration modules
- **Usage**: `import { appData } from './config'`

## Directory Structure

```
src/config/
├── README.md          # This documentation
├── index.js           # Main exports
└── appData.js         # Topic data aggregator
```

## Future Additions

This directory is designed to accommodate future configuration needs:

- `theme.js` - Theme and styling configuration
- `api.js` - API endpoints and configuration
- `features.js` - Feature flags and toggles
- `constants.js` - Application constants

## Usage

```javascript
// Import from config directory
import { appData } from './config';

// Use the data
const topics = appData.topics;
```

## Design Principles

1. **Separation of Concerns**: Configuration separate from data and components
2. **Single Source of Truth**: All config accessible from one location
3. **Scalability**: Easy to add new configuration modules
4. **Clean Imports**: Simple import paths for better maintainability 