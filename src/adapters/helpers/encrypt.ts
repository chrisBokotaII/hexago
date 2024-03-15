import * as bycrpt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
const { JWT_SECRET = "" } = process.env;
interface payload {
  id: string;
}
export class Ecrypt {
  static async passwaorEncrypt(pass: string) {
    return bycrpt.hashSync(pass, 10);
  }
  static async comparePass(pass: string, hash: string) {
    return bycrpt.compareSync(pass, hash);
  }
  static async generateToken(payload: payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  }
}
