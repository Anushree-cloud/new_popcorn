import * as Hapi from '@hapi/hapi'

import server from './config/server'
import plugins from './config/plugins'

import * as basicAuth from 'basic-auth'
import baseRouter from './routes'



const init = async () => {

    server.route({
        method:'GET',
        path: '/',
        handler: (request:Hapi.Request, h:Hapi.ResponseToolkit) => {
            return '<h1>This is New Popcorn</h1>'
        }
    })

    await server.register(plugins)

    await server.register(baseRouter, {
        routes:{
            prefix: '/api'
        }
    })

    await server.start()

    console.log(`Server is running at ${server.info.uri}`);
    
}

process.on('unhandledRejection', (err:any) => {
    if(err) {
        console.log('30=>',err);
        process.exit(1)
    }
})

init()