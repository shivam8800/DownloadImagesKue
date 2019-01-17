'use strict';

const Bell = require('bell');
const Hapi = require('hapi');

require('dotenv').config();
const internals = {};


internals.start = async function () {

    const server = Hapi.server({ port: 8001 });
    await server.register(Bell);

    // You'll need to go to https://www.linkedin.com/secure/developer?newapp= and set up an application to get started
    // Follow the instructions on https://developer.linkedin.com/docs/oauth2 to setup redirect_uri and default scopes

    server.auth.strategy('linkedin', 'bell', {
        provider: 'linkedin',
        password: 'cookie_encryption_password_secure',
        isSecure: false,
        clientId: process.env.LINKDIN_CLIENT_ID,
        clientSecret: process.env.LINKDIN_SECRET_ID,
        providerParams: {
            redirect_uri: server.info.uri + '/bell/door'
        }
    });

    server.route({
        method: '*',
        path: '/bell/door',
        options: {
            auth: 'linkedin',
            handler: function (request, h) {
                console.log(request.auth.credentials, "request.auth.credentials")
                return '<pre>' + JSON.stringify(request.auth.credentials, null, 4) + '</pre>';
            }
        }
    });

    await server.start();
    console.log('Server started at:', server.info.uri);
};

internals.start();