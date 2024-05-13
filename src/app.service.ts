import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

  async create(data: any): Promise<User> {
    return this.userRepository.save(data);
  }

  async findOne(condition: any): Promise<User> {
    return this.userRepository.findOne(condition);
  }

  async update(id: number, data: any): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      
      if (!user) {
        throw new NotFoundException('User not found');
      }
      
      Object.assign(user, data);
      
      const updatedUser = await this.userRepository.save(user);
      
      return updatedUser;
    } catch (error) {
      throw new HttpException({ message: error.message }, error.getStatus());
    }
  }
  

}
