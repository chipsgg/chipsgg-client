import State from 'statesync'
import Actions from './libs/Actions.js'
import Socket from './libs/Socket.js'
import UserState from './libs/UserState'
import Authenticate from './libs/Authenticate'
import ServerState from './libs/ServerState'

const SOCKET_URL = 'https://socket.chips.gg'
const AUTHSERVER_URL = 'https://auth.chips.gg'

export default async (socketURL = SOCKET_URL, authURL = AUTHSERVER_URL) => {
  const socket = await Socket(socketURL)
  let actions = await Actions(socket)

  // initialize server state, authenticate the user
  const state = await ServerState(socket, actions)
  let authenticated = await Authenticate(socket, actions)

  // let userState = State({})
  let userState = null
  if (authenticated) {
    userState = await UserState(socket, actions)
    actions = await Actions(socket)
  }

  // reconnect and authenticate
  socket.on('reconnect', async err => {
    authenticated = await Authenticate(socket, actions)
  })

  // TODO: do somthing with this later...
  actions.loginSteam = function() {
    var token = localStorage.getItem('token')
    window.location.href = `${authURL}/steam/auth?access_token=${token}`
  }

  actions.loginOpskins = function() {
    var token = localStorage.getItem('token')
    window.location.href = `${authURL}/opskins/auth?access_token=${token}`
  }

  actions.logout = function() {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return {
    _socket: socket,
    state,
    actions,
    authenticated,
    userState,
  }
}
