const fetchData = async () => {
  const knex = bp.database
  try {
    const data = await knex.raw(
      `SELECT JSON_EXTRACT(payload, '$.type') AS type FROM "msg_messages" WHERE "conversationId" = '${event.threadId}' AND JSON_EXTRACT(payload, '$.type') != 'session_reset'`
    )
    return data
  } catch (error) {
    bp.logger.info('ERROR')
    bp.logger.info(error)
  }
}

fetchData().then(data => {
  if (data.length > 0 || event.state.session.lastMessages.length > 0) {
    bp.logger.info('Chat history exists!')
    if (event.type === 'proactive-trigger') {
      event.setFlag(bp.IO.WellKnownFlags.SKIP_DIALOG_ENGINE, true)
    }
    return
  } else {
    if (event.type === 'proactive-trigger' || event.type === 'visit') {
      let currentTime = new Date().getHours()
      let greetingMessage = ''
      if (currentTime < 12) {
        greetingMessage = 'Good morning!'
      } else {
        greetingMessage = 'Good afternoon!'
      }
      try {
        const message = {
          type: 'text',
          text: greetingMessage,
          markdown: true
        }

        bp.events.replyToEvent(event, [message])

        return
      } catch (error) {
        bp.logger.info(error)
      }
    }
  }
})
