import bcrypt from "bcrypt"

export function isPasswordCorrect(password: string, hashPass: string) {
    return bcrypt.compareSync(password, hashPass);
}