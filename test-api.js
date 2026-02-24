const http = require('http');

// Make a simple HTTP request to the API
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/nominations?page=1&limit=10&status=all',
  method: 'GET',
  headers: {
    'Cookie': 'admin_token=test'
  }
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:');
    try {
      const parsed = JSON.parse(data);
      console.log(JSON.stringify(parsed, null, 2));
    } catch (e) {
      console.log(data);
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.end();
