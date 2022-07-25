const axios = require('axios')

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
    });
    axios.get('https://unicovoit.com/api/v1/users/isVerified', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then(res => {
        if (res.data.verified) {
            // user is already verified, finish Action
        } else {
            // user isn't verified, redirect to verification page
            api.redirect.sendUserTo("https://unicovoit.com/verify", {
                query: { token: token }
            });
        }
    }).catch(err => {
        console.error(err)
        api.access.deny("Une erreur est survenue. Merci de réessayer plus tard.")
    })
};




/**
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
exports.onContinuePostLogin = async (event, api) => {
}
