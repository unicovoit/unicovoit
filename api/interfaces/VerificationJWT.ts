export default interface VerificationJWT {
    iat: number,
    iss?: string,
    sub: string,
    exp: number,
    email?: string,
}
