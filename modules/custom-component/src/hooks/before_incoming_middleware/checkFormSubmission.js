const revealChat = async () => {
  const payload = [
    {
      type: 'custom',
      module: 'hide-chat',
      component: 'HideChat',
      hidden: false,
      noBubble: true
    }
  ]

  await bp.events.replyToEvent(
    {
      botId: event.botId,
      channel: event.channel,
      target: event.target,
      threadId: event.threadId
    },
    payload,
    event.id
  )
}

if (event.type === 'form_submitted') {
  revealChat()
}
