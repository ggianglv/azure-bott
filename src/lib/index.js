import { MessageFactory } from 'botbuilder'
import { REPORT } from '../enums'
import { getStockReport } from './tcbs'

export const getReply = async (context) => {
  const { text } = context.activity
  if (text.toLowerCase() === REPORT) {
    const replyText = await getStockReport()
    return MessageFactory.text(replyText, replyText)
  }

  return 'test'
}
