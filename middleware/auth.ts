// @ts-ignore
export default ({store, redirect, route}) => {
    // If the user is not authenticated
    if (!["/", "/login"].includes(route.fullPath) && !store.state.authenticated) {
        return redirect('/login')
    }
}
