import { Body, Controller, UseFilters } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { RpcValidationFilter } from '../customRpc.exception';
import { UserCreateDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseFilters(new RpcValidationFilter())
  @MessagePattern({ cmd: 'user' })
  accumulate(@Body() user: UserCreateDto) {
    return this.userService.createUser(user);
  }
}
