import Joi from 'joi'

import RegistrationController from '../../controller/registration';
import RegistrationValidator from '../../validations/registration'

const router:any[] = [
    {
        method: 'POST',
        path: '/registration',
        options:{
            tags: ['api','registration'],
            handler: RegistrationController.registration,
            description: 'User Registration',
            validate: {
                payload: RegistrationValidator.registrationPayload
            }
        }
    }
]

export default router;