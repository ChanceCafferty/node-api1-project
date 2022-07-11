const server = require('./api/server');

const port = 9000;

// START YOUR SERVER HERE

server.listen(port, () => {
    console.log('the server is now running on', port);
})