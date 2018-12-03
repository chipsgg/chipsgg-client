const Socket = require('socket.io-client')

export default url => {

  const socket = Socket(url, {
    upgrade: false,
    transports: ['websocket', 'polling'],
  })

  socket.callAction = function(action, params = {}) {
    return new Promise((res, rej) => {
      return socket.emit('action', action, params, (err, data) => {
        if (err) rej(err)
        else res(data)
      })
    })
  }

  socket.auth = function(token) {
    return new Promise((res, rej) => {
      return socket.emit('auth', token, (err, data) => {
        if (err) rej(err)
        else res(data)
      })
    })
  }

  return new Promise((res, rej) => {
    socket.on('connect_error', rej)
    socket.on('connect', () => res(socket))
  })
}
