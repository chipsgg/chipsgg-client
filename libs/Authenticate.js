export default async (socket, actions) => {
  let token = localStorage.getItem('token')

  if(token) {
    const valid = await actions.validateToken({token})
    token = valid ? token : null
  }

  if (!token) {
    const session = await actions.token()
    localStorage.setItem('token', session.id)
    token = session.id
  }

  return socket.auth(token).catch(err => null)
}