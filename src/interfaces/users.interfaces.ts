import { DeepPartial, Repository } from 'typeorm';
import { z } from 'zod';
import { User } from '../entities';
import { createUserSchema, returnUserWithoutPasswordSchema, returnMultipleUsersSchema } from '../schemas';

type IUserRequest = z.infer<typeof createUserSchema>
type IUserReturn = z.infer<typeof returnUserWithoutPasswordSchema>
type IUsersReturn = z.infer<typeof returnMultipleUsersSchema>

type IUserUpdate = DeepPartial<User>;

export {
  IUserRequest,
  IUserReturn,
  IUsersReturn,
  IUserUpdate,
  // iUserRepo,
  // UsersPaginationResponse
};