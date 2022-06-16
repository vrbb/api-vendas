import { Request, Response } from 'express';
import SendForgotPasswordEmaillService from '../services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    console.log(request.body);
    const sendForgotPasswordEmail = new SendForgotPasswordEmaillService();

    await sendForgotPasswordEmail.execute({ email });
    return response.status(204).json();
  }
}
