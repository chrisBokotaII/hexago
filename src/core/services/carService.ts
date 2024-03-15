import { Cars } from "../entity/Cars";
import { User } from "../entity/User";
import { CarsRepositoryPort } from "../ports/CarsRepositoryPort";
import { UserRepositoryPort } from "../ports/UserRepositoryPort";

export class CarService {
  constructor(
    private readonly carsRepository: CarsRepositoryPort,
    private readonly userRepository: UserRepositoryPort
  ) {}
  async getCars(): Promise<Cars[]> {
    return await this.carsRepository.findAll();
  }
  async createCar(car: Cars, userId: string): Promise<Cars> {
    const user = await this.userRepository.findId(userId);
    car.user = user as User;
    return await this.carsRepository.saveCar(car, userId);
  }
  async updateCar(id: string, car: Cars): Promise<Cars> {
    return await this.carsRepository.updateCar(id, car);
  }
  async deleteCar(id: string): Promise<boolean> {
    return await this.carsRepository.deleteCar(id);
  }
  async getCar(param: string): Promise<Cars | null> {
    return await this.carsRepository.findByOne(param);
  }
}
