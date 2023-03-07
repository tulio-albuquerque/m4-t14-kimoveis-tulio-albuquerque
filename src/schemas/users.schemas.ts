import { hashSync } from 'bcryptjs'
import { z } from "zod"

const createUserSchema = z.object({
  name: z.string().max(45),
  email: z.string().email().max(45),
  admin: z.boolean().optional().default(false),
  password: z.string().max(120)
})

const returnUserSchema = createUserSchema.extend({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullish(),
})

const testUserSchema = z.object({
  name: z.string().max(45),
  // email: z.string().email().max(45),
  admin: z.boolean().optional().default(false),
  password: z.string().max(120),
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullish(),
})

const returnUserWithoutPasswordSchema = returnUserSchema.omit({ password: true})

const createUserWithoudAdminSchema = createUserSchema.omit({admin: true})

const updateUserSchema = createUserWithoudAdminSchema.partial()

const returnMultipleUsersSchema = returnUserWithoutPasswordSchema.array()


export {
  createUserSchema,
  returnUserSchema,
  testUserSchema,
  returnUserWithoutPasswordSchema,
  updateUserSchema,
  returnMultipleUsersSchema
}