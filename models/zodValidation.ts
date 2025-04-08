import {z} from "zod"

export const userSchema = z.object({
    name: z.string().max(30, { message:"Name too long"}).min(5,{message:"Name too short"}),
    email:z.string().email().min(5,{message:"Email is too short"}),
    phone: z.string().max(10, {message: "Invalid Phone number"}),
    password:z.string(),
    role: z.string().min(1,"Role is required"),
    uid: z.string().min(1,"UID is required"),
    provider: z.string().min(1,"Provider is required"),
})