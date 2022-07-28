export default interface VerificationJWT {
    iat: number,
    iss?: string,
    sub: string,
    exp: number,
    email?: string,
    studentEmail?: string,
    nickname?: string,
    name?: string,
    picture?: string,
}
