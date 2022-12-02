import * as Hapi from '@hapi/hapi'

import RegistrationRoute from './registration'


function addPrefix(routeList:any, prefix: string|any) {
    return routeList.map((list:any) => {
        list.path = `/${prefix}${list.path}`
        return list
    })
}

const baseRouter = {
    name: "base-route",
    version: '1.0.0',
    register: (server: Hapi.Server) => {
        server.route(addPrefix(RegistrationRoute,'registration'))
    }
}

export default baseRouter;