import { bool, InferType, number, object, string } from 'yup'

import serviceAccount from '../../serviceAccountKey.json'

const configSchema = object({
  env: bool(),
  port: number().required(),
  slack: object({
    botToken: string().required(),
    signingSecret: string().required(),
  }).required(),
  firestore: object({
    serviceAccount: object().required(),
  }).required(),
})

export const initConfig = () => {
  return configSchema.validateSync({
    port: process.env.PORT || 3000,
    slack: {
      botToken: process.env.SLACK_BOT_TOKEN,
      signingSecret: process.env.SLACK_SIGNING_SECRET,
    },
    firestore: {
      serviceAccount,
    },
  })
}

export type Config = InferType<typeof configSchema>
