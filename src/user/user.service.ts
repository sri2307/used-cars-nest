import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EXCEPTIONS } from 'src/utils/constants';
import { notAuthenticated, notFoundException } from 'src/utils/exceptions';
import { Repository } from 'typeorm';
import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';

const { notFound, notAuthorized } = EXCEPTIONS.user;

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(user: UserDto) {
    const createUser = this.repo.create(user);
    return this.repo.save(createUser);
  }
  async findOne(id: number) {
    notAuthenticated(id, notAuthorized);

    const user = await this.repo.findOne({ where: { id: id } });
    notFoundException(user, notFound);

    return user;
  }
  find(email: string) {
    return this.repo.find({ where: { email: email } });
  }
  async update(id, attr: Partial<User>) {
    const user = await this.findOne(id);
    notFoundException(user, notFound);

    Object.assign(user, attr);
    return this.repo.save(user);
  }
  async remove(id) {
    const user = await this.findOne(id);
    notFoundException(user, notFound);
    return this.repo.remove(user);
  }
}
