/**
 * Small description of your action
 * @title Custom Greeting
 * @category Custom
 * @author Basanta Rai
 */

const customGreeting = async () => {
  let currentTime = new Date().getHours()
  let greetingMessage = ''
  if (currentTime < 12) {
    greetingMessage = 'Hello, Good morning!'
  } else {
    greetingMessage = 'Hello,Good afternoon!'
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

return customGreeting()
