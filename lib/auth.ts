import bcrypt from "bcryptjs";

export async function hashPassword(password:string) {
  const saltRounds = 10; // Number of salt rounds for hashing
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function verifyPassword(plainPassword:string, hashedPassword:string) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}
  

