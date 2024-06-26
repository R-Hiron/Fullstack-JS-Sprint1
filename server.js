const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/')
    {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
        if (err)
        {
            res.writeHead(500);
            res.end('Error loading index.html');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
        });
    }
    else if (req.method === 'GET' && req.url === '/script.js')
    {
        fs.readFile(path.join(__dirname, 'script.js'), (err, data) => {
        if (err)
        {
            res.writeHead(500);
            res.end('Error loading script.js');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(data);
        });
    }
    else if (req.method === 'POST' && req.url === '/create-token')
    {
        let body = '';
        req.on('data', chunk => {
        body += chunk.toString();
        });
        req.on('end', () => {
        const { username } = JSON.parse(body);
        // runs "node cli.js token --new" with the username value supplied by script.js
        exec(`node cli.js token --new ${username}`, (error, stdout, stderr) => {
            if (error)
            {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `Error: ${stderr}` }));
            return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: stdout }));
        });
        });
    }
    else
    {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
