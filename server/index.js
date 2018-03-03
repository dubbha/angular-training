const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults({ static: path.join(__dirname, '../dist') });

server.use(middlewares);
server.use('/api', router);

server.get('*', (req, res) => { // SPA default route
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

server.listen(3000, () => {
  console.log('listening on *:3000');
})
