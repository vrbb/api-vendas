import { IHashProvider } from './HashProvider/models/IHashProvider';
import { container } from 'tsyringe';
import BcryptHashProvider from './HashProvider/implementations/BcryptHashProvider';

container.registerSingleton<IHashProvider>(
  'BcryptHashProvider',
  BcryptHashProvider,
);
