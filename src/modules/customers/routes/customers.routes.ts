import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import CustomersController from '../controllers/CosturmersController';

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.get('/', isAuthenticated, customersController.index);

customersRouter.get(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required,
    },
  }),
  customersController.show,
);

customersRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().integer().required(),
    },
  }),
  customersController.create,
);

customersRouter.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required,
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().integer().required(),
    },
  }),
  customersController.update,
);

customersRouter.delete(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required,
    },
  }),
  customersController.delete,
);

export default customersRouter;
