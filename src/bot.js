import { ActivityHandler, MessageFactory } from 'botbuilder'
import { getReply } from './lib'

class EchoBot extends ActivityHandler {
  constructor() {
    super()
    // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
    this.onMessage(async (context, next) => {
      await context.sendActivity(await getReply(context))
      await next()
    })

    this.onMembersAdded(async (context, next) => {
      const { membersAdded } = context.activity
      const welcomeText = 'Hello and welcome!'
      for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
        if (membersAdded[cnt].id !== context.activity.recipient.id) {
          await context.sendActivity(MessageFactory.text(welcomeText, welcomeText))
        }
      }
      // By calling next() you ensure that the next BotHandler is run.
      await next()
    })
  }
}

export default EchoBot
