import * as Hapi from '@hapi/hapi'

import RegistrationRoute from './registration'
import AuthRoute from './auth'


function addPrefix(routeList:any, prefix?: string|any|undefined) {
    if(!prefix) return routeList
    return routeList.map((list:any) => {
        list.path = `/${prefix}${list.path}`
        return list
    })
}

const baseRouter = {
    name: "base-route",
    version: '1.0.0',
    register: (server: Hapi.Server) => {
        server.route(RegistrationRoute),
        server.route(addPrefix(AuthRoute,'auth'))
    }
}

export default baseRouter;