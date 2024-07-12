// webhook.js
const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8081;

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  // Ensure the request is from GitHub
  if (req.headers['x-github-event'] === 'push') {
    console.log(
      'GitHub push event received, starting deployment...'
    );

    // Run your deployment script
    exec(
      'sh /root/auto-diploy-test/deploy.sh',
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Deployment error: ${error}`);
          return;
        }
        console.log(`Deployment stdout: ${stdout}`);
        console.error(`Deployment stderr: ${stderr}`);
      }
    );

    res.status(200).send('Deployment initiated');
  } else {
    res.status(400).send('Invalid event');
  }
});

app.listen(PORT, () => {
  console.log(`Webhook listener running on port ${PORT}`);
});
