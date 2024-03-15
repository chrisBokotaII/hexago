import { User } from "../../core/entity/User";
import { UserRepositoryPort } from "../../core/ports/UserRepositoryPort";
import { AppDataSource } from "../database/data-source";

export class TypeOrmUserRepositoryPort implements UserRepositoryPort {
  private userRepository = AppDataSource.getRepository(User);
  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({ relations: ["cars"] });

    return users;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = this.userRepository.findOne({
      where: { email },
    });
    return user;
  }
  async findId(id: string): Promise<User | null> {
    const user = this.userRepository.findOne({
      where: { id },
      relations: ["cars"],
    });
    return user;
  }
  async updateUser(id: string, user: User): Promise<User> {
    const userToUpdate = await this.userRepository.findOne({ where: { id } });
    if (!userToUpdate) {
      throw new Error("User not found");
    }
    userToUpdate.email = user.email;
    userToUpdate.fullName = user.fullName;

    return await this.userRepository.save(userToUpdate);
  }
  async deleteUser(id: string): Promise<boolean> {
    const userToDelete = await this.userRepository.findOne({ where: { id } });
    if (!userToDelete) {
      throw new Error("User not found");
    }
    await this.userRepository.remove(userToDelete);
    return true;
  }
  async createUser(user: User): Promise<User> {
    const newUser = await this.userRepository.save(user);
    return newUser;
  }
}
