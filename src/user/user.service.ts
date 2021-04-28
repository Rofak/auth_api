import { Body, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserDto } from './model/user.dto';
import { UserEntity } from './model/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {
  }

  async registerUser(userDto: UserDto): Promise<UserEntity> {
    return await this._userRepository.save(userDto);
  }

  async findByUsername(username: string): Promise<UserEntity> {
    return await this._userRepository.findOne({ username });
  }
}
