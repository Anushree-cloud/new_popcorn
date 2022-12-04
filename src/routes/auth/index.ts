import * as Hapi from '@hapi/hapi'

import AuthController from '../../controller/auth'
import AuthValidator from '../../validations/auth'

const router:any[] = [
    {
        method: 'POST',
        path: '/login',
        options: {
            tags: ['api', 'auth'],
            description: 'User Login',
            handler: AuthController.jwtLogin,
            validate: {
                payload: AuthValidator.loginPayloadValidator
            }
        }
    }
]

export default router;