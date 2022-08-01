import Contact from "./Contact"

export default interface User {
    _id?: string,
    id: string,
    sub: string,
    name: string,
    nickname: string,
    email?: string,
    contact?: Contact,
    picture?: string,
    bio?: string,
    smokePref?: string,
    petsPref?: string,
    musicPref?: string,
    autoBook?: boolean,
    defaultPlaces?: number,
    verified: boolean,
    studentEmail?: string,
    university?: string,
    isBlocked?: boolean,
}
