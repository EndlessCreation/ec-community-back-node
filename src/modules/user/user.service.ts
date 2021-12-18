import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from 'src/repositories/user.repository';
import { UserResponse } from './dto/user-response.dto';
import { UserUpdateRequest } from './dto/user-update-request.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async updateProfile(user: User, updateUserRequest: UserUpdateRequest): Promise<UserResponse> {
    return this.userRepository.updateByUnique({ id: user.id }, updateUserRequest);
  }

  async findByEmail(user: User): Promise<UserResponse> {
    return this.userRepository.findByUnique({ email: user.email });
  }
}
