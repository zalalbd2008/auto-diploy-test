# deploy.sh
#!/bin/bash

# Navigate to your project directory
cd /root/auto-diploy-test/

# Pull the latest code from GitHub
git pull origin main

# Install dependencies
npm install

# Build the project (for Next.js)
npm run build

# Restart the application with PM2
pm2 restart server

echo "Deployment completed!"
