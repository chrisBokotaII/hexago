import { Request, Response } from "express";
import { UserService } from "../../../core/services/userService";
import { User } from "../../../core/entity/User";
import { Ecrypt } from "../../helpers/encrypt";

export class UserController {
  constructor(private userService: UserService) {}

  async getAllUsers(req: Request, res: Response) {
    const users = await this.userService.getUsers();
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(users);
  }
  async getUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this.userService.getUser(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  }
  async createUser(req: Request, res: Response) {
    const { fullName, email, password } = req.body;
    const encryptedPassword = await Ecrypt.passwaorEncrypt(password);
    const newUser = await this.userService.createUser({
      fullName: fullName,
      email: email,
      password: encryptedPassword,
    } as User);
    if (!newUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const token = await Ecrypt.generateToken({ id: newUser.id });
    return res.status(201).json({ user: newUser, token });
  }
  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = req.body as User;
    const updatedUser = await this.userService.updateUser(id, user);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(updatedUser);
  }
  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const deleted = await this.userService.deleteUser(id);
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(204).json();
  }
  async getUserByEmail(req: Request, res: Response) {
    const { email } = req.params;
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  }
}
