import State from 'statesync'

export default async (socket, actions) => {
  let initState = await actions.myState()
  const state = State(initState)
  socket.on('mydiff', state.patch)
  return state
}
