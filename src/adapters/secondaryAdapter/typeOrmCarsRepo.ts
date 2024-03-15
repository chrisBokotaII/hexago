import { CarsRepositoryPort } from "../../core/ports/CarsRepositoryPort";
import { Cars } from "../../core/entity/Cars";
import { User } from "../../core/entity/User";
import { AppDataSource } from "../database/data-source";

export class typeOrmCarsRepo implements CarsRepositoryPort {
  private carsRepository = AppDataSource.getRepository(Cars);
  private usersRepository = AppDataSource.getRepository(User);
  async findAll(): Promise<Cars[]> {
    const cars = this.carsRepository.find({ relations: ["user"] });
    return cars;
  }
  async findByOne(param: string): Promise<Cars | null> {
    const car = this.carsRepository.findOne({
      where: { id: param },
      relations: ["user"],
    });
    return car;
  }
  async saveCar(user: Cars, id: string): Promise<Cars> {
    const owner = await this.usersRepository.findOne({ where: { id } });
    const car = new Cars();
    car.name = user?.name;
    car.brand = user?.brand;
    car.color = user?.color;
    car.user = owner as User;

    return this.carsRepository.save(car);
  }
  async deleteCar(id: string): Promise<boolean> {
    const carToDelete = await this.carsRepository.findOne({ where: { id } });
    if (!carToDelete) {
      throw new Error("Car not found");
    }

    await this.carsRepository.remove(carToDelete);
    return true;
  }
  async updateCar(id: string, user: Cars): Promise<Cars> {
    const carToUpdate = await this.carsRepository.findOne({ where: { id } });
    if (!carToUpdate) {
      throw new Error("Car not found");
    }
    carToUpdate.name = user?.name;
    carToUpdate.brand = user?.brand;
    carToUpdate.color = user?.color;
    return this.carsRepository.save(carToUpdate);
  }
}
