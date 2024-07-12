# deploy.sh
#!/bin/bash

# Navigate to your project directory
cd /root/auto-diploy-test/

# Pull the latest code from GitHub
git pull 

# Install dependencies
# npm install

# Restart the application with PM2
pm2 restart server

echo "Deployment completed!"
