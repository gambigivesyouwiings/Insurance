# Performance Optimization Commands

## Build Analysis
```bash
# Analyze bundle size
npm run build:analyze

# Check for unused dependencies
npx depcheck

# Audit for security vulnerabilities  
npm audit fix
```

## Image Optimization
```bash
# Install image optimization tools
npm install -D imagemin imagemin-webp imagemin-mozjpeg imagemin-pngquant

# Convert images to WebP (run manually)
# Add to build process if needed
```

## Code Quality
```bash
# Add ESLint for code quality
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Add Prettier for formatting
npm install -D prettier eslint-config-prettier eslint-plugin-prettier
```

## Performance Testing
```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Run Lighthouse audit
lhci autorun --upload.target=temporary-public-storage
```

## Bundle Analysis Commands
```javascript
// Add to package.json scripts:
"analyze": "npx vite-bundle-analyzer dist/assets/index-*.js"
```