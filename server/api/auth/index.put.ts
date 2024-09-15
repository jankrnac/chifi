export default eventHandler(async (event) => {
    const body = await readBody(event)

    await setUserSession(event, {
        user: {
          	username: body.username,
			avatar: body.avatar
        },
    })

})