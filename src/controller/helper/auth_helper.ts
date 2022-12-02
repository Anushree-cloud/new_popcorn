import * as Hapi from '@hapi/hapi'
import jwt from 'jsonwebtoken'

export function verifyToken(token:any) {

    try{
        return jwt.verify(token, process.env.SECRET_KEY)
    } catch (err: any ) {
        throw new Error(err.message)
    }

}