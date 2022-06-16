import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import ResetPasswordService from '../services/ResetPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { token, password } = request.body;
      const resetPasswordService = new ResetPasswordService();

      await resetPasswordService.execute({
        token,
        password,
      });
      return response.status(204).json();
    } catch (error) {
      throw new AppError('Erro ao resetar password');
    }
  }
}
