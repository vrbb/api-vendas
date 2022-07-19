import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';

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
    if (uploadConfig.driver === 's3') {
      const s3Provider = new S3StorageProvider();
      if (user.avatar) {
        await s3Provider.deleteFile(user.avatar);
      }
      const filename = await s3Provider.saveFile(avatarFileName);
      user.avatar = filename;
    } else {
      const diskProvider = new DiskStorageProvider();
      if (user.avatar) {
        await diskProvider.deleteFile(user.avatar);
      }
      const filename = await diskProvider.saveFile(avatarFileName);
      user.avatar = filename;
    }

    user.avatar = avatarFileName;

    const filename = await storageProvider.saveFile(avatarFileName);

    user.avatar = filename;
    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvataService;
