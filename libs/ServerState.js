import State from 'statesync'

export default async (socket, actions) => {
  const initState = await actions.publicState()
  const state = State(initState)
  socket.on('diff', state.patch)
  return state
}