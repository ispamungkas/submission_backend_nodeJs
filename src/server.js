const Hapi = require('@hapi/hapi');
const routes = require('./route');

const start = async () => {

    const server = Hapi.server({
        host: 'localhost',
        port: 9000,
        routes: {
            cors: {
                origin: ['*']
            }
        }
    });

    server.route(routes);

    await server.start();
    console.log("Server running...");

};

start();