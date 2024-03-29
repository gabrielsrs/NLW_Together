import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken";
 
interface IAuthenticateRequest {
 email: string;
 password: string;
}

class AuthenticateUserService {
 async execute({ email, password }: IAuthenticateRequest ) {
  const usersRepositories =  getCustomRepository(UsersRepositories);
  
  const user = await usersRepositories.findOne({
   email,
  });

  if (!user) {
   throw new Error("Email/Password Incorrect!")
  }

  const passwordMatch = compare(password, user.password)

  if (!passwordMatch) {
   throw new Error("Email/Password Incorrect!")
  }

  const token = sign(
   {
    email: user.email
   }, "9c57114e0a50ebb10db6b00d3bc08468", {
    subject: user.id,
    expiresIn: "1d"
   }
  );

  return token;
 }
}

export { AuthenticateUserService }