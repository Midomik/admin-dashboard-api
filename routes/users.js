const express = require('express');

const userController = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');
const validateSchema = require('../middlewares/validateSchema');
const { userRegistrationSchema, userLoginSchema } = require('../schemas/user');

const router = express.Router();

router.post(
  '/register',
  validateSchema(userRegistrationSchema),
  userController.register
);
router.post('/login', validateSchema(userLoginSchema), userController.login);
router.post('/logout', authMiddleware, userController.logout);

router.get('/current', authMiddleware, userController.currentUser);

module.exports = router;
