const handler = require('serve-handler');
const http = require('http');

const serverOut = http.createServer((request, response) => {
    return handler(request, response, {
        public: './out',
    });
});
serverOut.listen(6655, () => {
    console.log('Running at http://localhost:6655 - "out"');
});


const serverPublic = http.createServer((request, response) => {
    return handler(request, response, {
        public: './public',
    });
});
serverPublic.listen(6656, () => {
    console.log('Running at http://localhost:6656 - "public"');
});