export default interface VerificationJWT {
    iat: number,
    iss?: string,
    sub: string,
    exp: number,
    email?: string,
    email_verified?: boolean,
    studentEmail?: string,
    nickname?: string,
    name?: string,
    picture?: string,
}
