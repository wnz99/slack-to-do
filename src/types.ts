import {
  BlockAction,
  Middleware,
  SlackActionMiddlewareArgs,
  SlackEventMiddlewareArgs,
  SlackViewAction,
  SlackViewMiddlewareArgs,
  ViewOutput,
} from '@slack/bolt'

import { DbClient } from './services/database'

export enum InputType {
  Datepicker = 'datepicker',
  PlainText = 'plain_text_input',
}

export type ViewState = ViewOutput['state']['values']

export type Deps = {
  dbClient: DbClient
}

export enum UserActions {
  AddTask = 'add_to_do',
  UpdateTasksList = 'update_tasks_list',
  SetTaskComplete = 'set_task_complete',
  ViewTask = 'view_task',
}

export enum ModalSubmission {
  AddTask = 'add_task_modal',
}

export type TaskDocument = {
  id: string
  title: string
  createdAt: string
  dueDate?: string
  content?: string
  isCompleted: boolean
}

export type Task = {
  title: string
  dueDate?: string
  content?: string
  isCompleted: boolean
}

export type ActionMw<T extends BlockAction = BlockAction> = Middleware<
  SlackActionMiddlewareArgs<T>
>

export type ViewMw = Middleware<SlackViewMiddlewareArgs<SlackViewAction>>

export type EventMw<T extends string> = Middleware<SlackEventMiddlewareArgs<T>>

export type TasksList = {
  tasks: TaskDocument[]
  page?: number
  perPage: number
}
