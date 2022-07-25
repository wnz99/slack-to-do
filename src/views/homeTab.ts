import {
  Actions,
  BlockBuilder,
  Button,
  Divider,
  Header,
  HomeTab,
  Section,
  SlackViewDto,
} from 'slack-block-builder'

import { UserActions } from './../types'

export const homeTab = (tasksBlocks?: BlockBuilder[]): SlackViewDto =>
  HomeTab()
    .blocks(
      Header().text('To-Dos Test App V2'),
      Divider(),
      Section().text('Create and manage your To-Do list. :white_check_mark:'),
      Header().text('My To-Dos'),
      Divider(),
      Actions().elements(
        Button().text('Add ToDo').actionId(UserActions.AddTask).primary()
      ),
      tasksBlocks
    )
    .buildToObject()
