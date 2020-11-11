module.exports = function (messageObj, session, send, finished) {
  finished({ response: 'pong' })
}
