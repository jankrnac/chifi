export default defineNuxtRouteMiddleware((to, from) => {

	const { loggedIn } = useUserSession()
	
    if (!loggedIn) {
		  return navigateTo('/login')
    }

})