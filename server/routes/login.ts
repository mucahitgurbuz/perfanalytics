import { Router } from 'express';

import loginValidator from './../validator/login';
import loginController from './../controller/login';

export const login = Router();

login.route('/').get(loginValidator, loginController);
