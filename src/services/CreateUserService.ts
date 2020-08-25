import { hash } from 'bcryptjs';

import User from '../models/User';
import AppError from '../errors/AppError';

interface RequestData {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: RequestData): Promise<User> {
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      throw new AppError('User already exists');
    }

    const user = User.create({
      name,
      email,
      password,
    });

    user.password = await hash(password, 8);

    await user.save();

    return user;
  }
}

export default CreateUserService;
