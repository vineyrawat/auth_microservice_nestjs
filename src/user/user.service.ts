import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserCreateDto } from './dto/user.dto';

enum UserErrors {
  EMAIL_ALREADY_REGISTERED = 'EMAIL_ALREADY_REGISTERED',
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(user: UserCreateDto) {
    const existedUser = await this.prisma.user.findFirst({
      where: { email: user.email },
    });
    if (!existedUser)
      throw new HttpException(
        {
          message: ['Email already registered'],
          statusCode: HttpStatus.BAD_REQUEST,
          error: UserErrors.EMAIL_ALREADY_REGISTERED,
        },
        HttpStatus.BAD_REQUEST,
      );
    return 'creating';
  }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({ where: userWhereUniqueInput });
  }
}
