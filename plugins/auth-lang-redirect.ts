export default function({ app, $auth }) {
    const redirect = { ...$auth.$storage.options.redirect };

    const localizeRedirects = () => {
        for (const key in redirect) {
            $auth.$storage.options.redirect[key] = app.localePath(redirect[key]);
        }
    };

    localizeRedirects();

    app.i18n.onLanguageSwitched = () => {
        localizeRedirects();
    };
}

