import * as Hapi from '@hapi/hapi'
import macros from '../../response/macros'

import { PrismaClient } from '@prisma/client'
import passwordHelper from '../helper/passowrd_helper'

import jwt from 'jsonwebtoken'

const {
    users: Users
} = new PrismaClient()

async function jwtLogin (req: Hapi.Request, res: Hapi.ResponseToolkit) {

    try{

        const { email, password } = (req.payload as {
            email: string,
            password: string
        })

        const userInfo:any = await Users.findFirst({
            where: { email }
        })

        if(!userInfo) {
            return macros.error({}, 'User does not exist', 401)(res)
        }

        const {password:userPassword, ...userDetails} = userInfo

        
        //password verification

        let token:string

        if(await passwordHelper.verifyPassword(password, userPassword)) { 

            token = jwt.sign(
                { data: { id: userDetails.id} },
                process.env.SECRET_KEY,
                { expiresIn: '1d'}
            )

            return macros.success({token, userDetails}, 'Login successful')(res)
        }

        return macros.error({}, 'Wrong Password', 401)(res)

    } catch( err: any ){
        console.log('50=>',err);
        return macros.error({}, "Something went wrong!")(res)
    }
}

export = {
    jwtLogin
}