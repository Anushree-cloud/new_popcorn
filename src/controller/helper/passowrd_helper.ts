import * as Hapi from '@hapi/hapi'
import crypto from 'crypto'

async function hashPassword (password: string | any) {
    return new Promise((resolve, reject) => {

        const salt = crypto.randomBytes(16).toString('hex')
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if(err) reject(err)
            resolve(salt+':'+derivedKey.toString('hex'))
        })

    })
}

async function verifyPassword (password: string, hashedPassword: string) {

    return new Promise((resolve, reject) => {
        const [salt, key] = hashedPassword.split(':')

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if(err) reject(err)
            resolve(key === derivedKey.toString('hex'))
        })
    })

}

export = {
    hashPassword,
    verifyPassword
}