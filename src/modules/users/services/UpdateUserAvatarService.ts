import upload from '@config/upload';
import AppError from '@shared/errors/AppError';
import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';

export interface IRequest {
  userId: string;
  avatarFileName: string;
}

class UpdateUserAvataService {
  public async execute({ avatarFileName, userId }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);

    const storageProvider = new DiskStorageProvider();

    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.');
    }
    if (user.avatar) {
      await storageProvider.deleteFile(user.avatar);
      const userAvatarFilePath = path.join(upload.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    const filename = await storageProvider.saveFile(avatarFileName);

    user.avatar = filename;
    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvataService;
