import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
}

class CreateUserService {
 async execute({name, email, admin}: IUserRequest) {
  const usersRepository = getCustomRepository(UsersRepositories);
  
  if(!email) {
   throw new Error("Incorrect Email!!")
  }

  const userAlreadyExist = await usersRepository.findOne({ 
   email
  });

  if(userAlreadyExist) {
   throw new Error("User Already Exist!!")
  }

  const user = usersRepository.create({
   name,
   email,
   admin,
  });

  await usersRepository.save(user);

  return user;
 }
}

export { CreateUserService }