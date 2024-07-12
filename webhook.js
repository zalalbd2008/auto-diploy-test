const http = require('http');
const { exec } = require('child_process');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/webhook') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const jsonBody = JSON.parse(body);
        const githubEvent = req.headers['x-github-event'];

        if (githubEvent === 'push') {
          console.log(
            'GitHub push event received, starting deployment...'
          );

          exec(
            'sh /path/to/deploy.sh',
            (error, stdout, stderr) => {
              if (error) {
                console.error(`Deployment error: ${error}`);
                res.writeHead(500, {
                  'Content-Type': 'text/plain',
                });
                res.end(
                  `Deployment error: ${error.message}`
                );
                return;
              }

              console.log(`Deployment stdout: ${stdout}`);
              console.error(`Deployment stderr: ${stderr}`);
              res.writeHead(200, {
                'Content-Type': 'text/plain',
              });
              res.end('Deployment initiated');
            }
          );
        } else {
          res.writeHead(400, {
            'Content-Type': 'text/plain',
          });
          res.end('Invalid event');
        }
      } catch (error) {
        res.writeHead(400, {
          'Content-Type': 'text/plain',
        });
        res.end('Invalid JSON');
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`Webhook listener running on port ${PORT}`);
});
