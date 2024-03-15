import { Cars } from "../entity/Cars";

export interface CarsRepositoryPort {
  findAll(): Promise<Cars[]>;
  findByOne(param: string): Promise<Cars | null>;
  saveCar(user: Cars, id: string): Promise<Cars>;
  deleteCar(id: string): Promise<boolean>;
  updateCar(id: string, user: Cars): Promise<Cars>;
}
