#!/bin/bash

# Create main directories
mkdir -p src/app/{api,(auth),(dashboard),(marketing)}
mkdir -p src/components/{common,forms,layout,ui}
mkdir -p src/lib/{config,hooks,middleware,types,utils,validations}
mkdir -p src/styles
mkdir -p src/tests/{e2e,integration,unit}

# Create necessary base files
touch src/lib/config/constants.ts
touch src/lib/config/env.ts
touch src/styles/globals.css

# Add README files to explain directory purposes
echo "# API Routes
This directory contains all API routes for the application." > src/app/api/README.md

echo "# Components
This directory contains all React components organized by type:

- common/: Shared components used across multiple features
- forms/: Form-related components
- layout/: Layout components like headers, footers, and navigation
- ui/: Basic UI components like buttons, inputs, etc." > src/components/README.md

echo "# Library
This directory contains shared utilities and logic:

- config/: Application configuration
- hooks/: Custom React hooks
- middleware/: Custom middleware
- types/: TypeScript type definitions
- utils/: Utility functions
- validations/: Validation schemas" > src/lib/README.md

echo "# Tests
This directory contains all test files:

- e2e/: End-to-end tests using Cypress
- integration/: Integration tests
- unit/: Unit tests for components and utilities" > src/tests/README.md

# Make the script executable
chmod +x scripts/setup-project.sh

echo "Project structure has been set up successfully!" 