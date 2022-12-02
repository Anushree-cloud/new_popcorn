import { PrismaClient } from "@prisma/client";
import * as Hapi from 'hapi'
import { verifyToken } from "../controller/helper/auth_helper";
import macros from "../response/macros";

const {
    users: Users
} = new PrismaClient

export function authorization () {

    return {
        authenticate: async (req:Hapi.Request | any, res: Hapi.ResponseToolkit) => {

            try{

                let { authorization } = (req.headers as { authorization: string })

                authorization = authorization.split(' ')[0] === 'Basic' ? '' : authorization.split(' ')[1]

                if(!authorization) {
                    return macros.error({}, 'Authorization Failed', 401)(res)
                }

                const { data } = verifyToken(authorization)

                let userDetails = await Users.findFirst({
                    where: { id: data.id }
                })

                if(!userDetails){
                    return macros.error(userDetails, 'User not found')(res)
                }

                req.user = userDetails

                return res.continue

            }catch (err: any) {
                console.log('12=>',err);
                return macros.error({}, 'Authorization Failed', 401)(res)
            }
        }
    }
}