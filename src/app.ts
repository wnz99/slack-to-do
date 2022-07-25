import { App, LogLevel } from '@slack/bolt'

import { initConfig } from './config'
import { blockActionIncludes } from './lib/utils'
import {
  addTaskAction,
  addTaskView,
  appHomeOpenedEvent,
  setTaskCompleteAction,
  updateTasksListAction,
  viewTaskAction,
} from './listeners'
import { initDataBase } from './services/database/database'
import { ModalSubmission, UserActions } from './types'

const config = initConfig()

const dbClient = initDataBase(config)

const app = new App({
  token: config.slack.botToken,
  signingSecret: config.slack.signingSecret,
  logLevel: LogLevel.DEBUG,
})

app.event('app_home_opened', appHomeOpenedEvent({ dbClient }))

app.action(
  blockActionIncludes(UserActions.ViewTask),
  viewTaskAction({ dbClient })
)

app.action(
  blockActionIncludes(UserActions.SetTaskComplete),
  setTaskCompleteAction({ dbClient })
)

app.action(
  blockActionIncludes(UserActions.UpdateTasksList),
  updateTasksListAction({ dbClient })
)

app.action(blockActionIncludes(UserActions.AddTask), addTaskAction())

app.view(ModalSubmission.AddTask, addTaskView({ dbClient }))

// Start App
;(async () => {
  await app.start(Number(process.env.PORT) || 3000)

  // eslint-disable-next-line no-console
  console.log(`⚡️ Bolt app is running on port ${process.env.PORT}`)
})()
