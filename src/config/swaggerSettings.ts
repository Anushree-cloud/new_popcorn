
const swaggerOptions:object|any = {
    basePath:'/api',
    info:{
        title:'Popcorn API Documentation',
    },
    grouping: 'tags',
    securityDefinitions: {
        jwt: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header'
        }
    },
    security: [{ jwt: [] }],
    schemes: ['http','https']
}

export default swaggerOptions