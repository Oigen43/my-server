const http = require('http');
const url = require('url');

const users = [];

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url).pathname;
  
  if (reqUrl === '/') {
    return res.end('Root!');
  }
  
  if (reqUrl === '/users') {
    if (req.method === 'GET') {
      return res.end(JSON.stringify(users));
    }
    
    if (req.method === 'POST') {
      let data = '';
      
      req.on('data', chunk => {
        data += chunk;
      });
      
      req.on('end', () => {
        const user = JSON.parse(data);
        users.push(user);
        
        return res.end(JSON.stringify({ message: 'OK' }));
      });
      
      return res.end('Post users');
    }
  }
});

server.listen(3000);
