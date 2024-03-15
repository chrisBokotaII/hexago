import * as express from "express";
import { CarService } from "../../../core/services/carService";
import { TypeOrmUserRepositoryPort } from "../../secondaryAdapter/typeOrmUserRepo";
import { typeOrmCarsRepo } from "../../secondaryAdapter/typeOrmCarsRepo";
import { CarsController } from "../controllers/Cars.controllers";
import { Middleware } from "../middleware/Middleware";
const carRepository = new typeOrmCarsRepo();
const userRepository = new TypeOrmUserRepositoryPort();
const carService = new CarService(carRepository, userRepository);
const CarsControllers = new CarsController(carService);

const router = express.Router();

router.get(
  "/cars",
  Middleware.verifyToken,
  CarsControllers.getCars.bind(CarsControllers)
);
router.get(
  "/car/:id",
  Middleware.verifyToken,
  CarsControllers.getCar.bind(CarsControllers)
);
router.post(
  "/car/create",
  Middleware.verifyToken,
  CarsControllers.createCar.bind(CarsControllers)
);
router.put(
  "/car/:id",
  Middleware.verifyToken,
  CarsControllers.updateCar.bind(CarsControllers)
);
router.delete(
  "/car/:id",
  Middleware.verifyToken,
  CarsControllers.deleteCar.bind(CarsControllers)
);
export { router as carRoutes };
