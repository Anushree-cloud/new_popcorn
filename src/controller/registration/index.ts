import { PrismaClient } from "@prisma/client";
import * as Hapi from '@hapi/hapi'
import passwordHelper from "../helper/passowrd_helper";
import macros from "../../response/macros";

const{
    users: Users
} = new PrismaClient()

// const prisma = new PrismaClient()

async function registration (req: Hapi.Request, res: Hapi.ResponseToolkit) {

    const {
        first_name,
        last_name,
        email,
        password
    } = (req.payload as {
        first_name: String,
        last_name: String
        email: String,
        password: String
    })

    try {

        const newPassword = await passwordHelper.hashPassword(password)

        const resultObj:any = {
            first_name,
            last_name,
            email,
            password: newPassword
        }

        const userDetails = await Users.create({data: resultObj})

        return macros.success({}, 'User Created Successfully')(res)

    } catch (err:any) {
        console.log('40=>',err);
        return macros.error({}, 'Something went wrong')(res)
    }
}

export = {
    registration
}