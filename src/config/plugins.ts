import * as Inert from '@hapi/inert'
import * as Vision from '@hapi/vision'
import hapiswagger from 'hapi-swagger';
import swaggerOptions from './swaggerSettings';

const plugins:any[] = [
    Inert,
    Vision,
    {
        plugin: hapiswagger,
        options: swaggerOptions
    }
]

export default plugins;