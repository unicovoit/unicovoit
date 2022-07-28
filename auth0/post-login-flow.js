const axios = require('axios')
const url = 'https://unicovoit.fr'

/**
 * @param {Event} event - Details about the user and the context in which they are logging in.
 * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
 */
exports.onExecutePostLogin = async (event, api) => {
    // check if user is verified
    const token = api.redirect.encodeToken({
        secret: event.secrets.VERIFICATION_SECRET,
        expiresInSeconds: 60,
        payload: {
            sub: event.user.user_id,
        },
    })
    const user = {
        ...event.user,
        sub: event.user.user_id
    }
    /*console.log(`${url}/api/v1/users/profile/sub/${user.sub}`)
    const profile = await axios.post(`${url}/api/v1/users/profile/sub/${user.sub}`, {
        user
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).catch(e => {
        console.error(e)
    })
    console.log('got profile')
    if (profile.data.nickname && profile.data.picture) {
        api.user.setUserMetadata('nickname', profile.data.nickname)
        api.user.setUserMetadata('picture', profile.data.picture)
    }*/

    let res = await axios.get(`${url}/api/v1/users/isVerified`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).catch(err => {
        console.error(err)
        api.access.deny("Une erreur est survenue. Merci de réessayer plus tard.")
    })
    if (res.data.verified) {
        // user is already verified, finish Action
    } else {
        // user isn't verified, redirect to verification page
        api.redirect.sendUserTo(`${url}/verify`, {
            query: {token: res.data.token}
        })
    }
};


/**
 * @param {Event} event - Details about the user and the context in which they are logging in.
 * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
 */
exports.onContinuePostLogin = async (event, api) => {
    const data = api.redirect.validateToken({
        secret: event.secrets.VERIFICATION_SECRET,
        tokenParameterName: 'token',
    })
    if (data.verified && data.sub === event.user.user_id) {
        api.user.setUserMetadata('verified', true)
    } else {
        api.access.deny("Vous devez vérifier votre statut étudiant pour vous connecter")
    }
}
