import { Cars } from "../entity/Cars";
import { User } from "../entity/User";
import { UserRepositoryPort } from "../ports/UserRepositoryPort";

export class UserService {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  //user
  async getUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
  async createUser(user: User): Promise<User> {
    return await this.userRepository.createUser(user);
  }
  async updateUser(id: string, user: User): Promise<User> {
    return await this.userRepository.updateUser(id, user);
  }
  async deleteUser(id: string): Promise<boolean> {
    return await this.userRepository.deleteUser(id);
  }
  async getUser(id: string): Promise<User | null> {
    return await this.userRepository.findId(id);
  }
  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }
}
