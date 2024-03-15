import { Request, Response } from "express";
import { CarsRepositoryPort } from "../../../core/ports/CarsRepositoryPort";
import { CarService } from "../../../core/services/carService";

export class CarsController {
  constructor(private carsService: CarService) {}

  async getCars(req: Request, res: Response): Promise<Response> {
    const cars = await this.carsService.getCars();
    if (!cars) {
      return res.status(404).json({ message: "No cars found" });
    }
    return res.status(200).json(cars);
  }
  async getCar(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const car = await this.carsService.getCar(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    return res.status(200).json(car);
  }
  async createCar(req: Request, res: Response): Promise<Response> {
    const car = req.body;
    //@ts-ignore
    const { id } = req["currentUser"];
    const newCar = await this.carsService.createCar(car, id);
    return res.status(201).json(newCar);
  }
  async updateCar(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const car = req.body;
    const updatedCar = await this.carsService.updateCar(id, car);
    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }
    return res.status(200).json(updatedCar);
  }
  async deleteCar(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleted = await this.carsService.deleteCar(id);
    if (!deleted) {
      return res.status(404).json({ message: "Car not found" });
    }
    return res.status(204).json();
  }
}
