declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      SLACK_BOT_TOKEN: string
      SLACK_SIGNING_SECRET: string
    }
  }
}

export {}
