import { Model } from 'mongoose';
import boom from '@hapi/boom';
import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../../config';

import type { UserDTO } from '../users/dtos/user.dto';
import { AuthDto, RefreshTokenDto, AuthUserJwtDto, UpdateUserDto } from './dtos/auth.dto';
import { AuthServiceInterface } from './types';

class AuthService implements AuthServiceInterface {
  constructor(private model: Model<UserDTO>) {}

  async getUser({ email, password }: AuthDto) {
    const user = await this.model.findOne({ email });
    if (!user) {
      throw boom.notFound('User not found');
    }
    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw boom.badRequest('Data not match');
    }

    return {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };
  }

  async findUser(id: string) {
    const user = await this.model.findOne({ _id: id });

    if (!user) {
      throw boom.notFound();
    }

    return user;
  }

  async updateUser(id: string, data: UpdateUserDto) {
    const changes = {
      ...data,
    };

    if (data.password) {
      changes.password = await hash(data.password, 10);
    }

    const user = await this.model.findOneAndUpdate({ _id: id }, changes);

    if (!user) {
      throw boom.badRequest('Error updating your account');
    }
  }

  signAccesToken(user: AuthUserJwtDto) {
    const payload = {
      sub: user.id,
      roles: user.roles,
    };

    const access_token = jwt.sign(payload, config.secretJWT, {
      expiresIn: '10m',
    });

    return access_token;
  }

  signRecoveryToken(user: AuthUserJwtDto) {
    const payload = {
      sub: user.id,
      roles: user.roles,
    };

    const recovery_token = jwt.sign(payload, config.secretJWT, {
      expiresIn: '5m',
    });

    return recovery_token;
  }

  signRefreshToken(user: AuthUserJwtDto) {
    const payload = {
      sub: user.id,
      roles: user.roles,
    };

    const access_token = jwt.sign(payload, config.secretJWT, {
      expiresIn: '24h',
    });

    return access_token;
  }

  verifyJwt(token: string) {
    try {
      const decoded = jwt.verify(token, config.secretJWT) as RefreshTokenDto;
      return {
        id: decoded.sub,
        roles: decoded.roles,
      };
    } catch (err) {
      throw boom.forbidden();
    }
  }

  async registerUser({ email, password }: AuthDto): Promise<void> {
    const user = await this.model.findOne({ email });

    if (user) {
      throw boom.badRequest('This email is register');
    }

    const newUserData = {
      email,
      password: await hash(password, 10),
      roles: ['user'],
    };

    await this.model.create(newUserData);
  }
}

export default AuthService;
