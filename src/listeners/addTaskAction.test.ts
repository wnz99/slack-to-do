import {
  AllMiddlewareArgs,
  BlockAction,
  BlockElementAction,
  Context,
  SlackActionMiddlewareArgs,
} from '@slack/bolt'

import { addTaskModal } from '../views/addTaskModal'
import { addTaskAction } from './addTaskAction'

jest.mock('../views/addTaskModal')

const mockAddTaskModal = addTaskModal as jest.Mock

const mockAck = jest.fn()
const mockOpen = jest.fn()

const mockClient = { views: { open: mockOpen } }

type Params = SlackActionMiddlewareArgs<BlockAction<BlockElementAction>> &
  AllMiddlewareArgs<Context>

describe('addTaskAction', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should send ack', async () => {
    const params = {
      ack: mockAck,
      body: { trigger_id: 1 },
      client: mockClient,
    } as unknown as Params

    await addTaskAction()(params)

    expect(mockAck).toHaveBeenCalled()
  })

  it('should create modal', async () => {
    const params = {
      ack: mockAck,
      body: { trigger_id: 1 },
      client: mockClient,
    } as unknown as Params

    await addTaskAction()(params)

    expect(mockAddTaskModal).toHaveBeenCalled()
  })

  it('should open view', async () => {
    const params = {
      ack: mockAck,
      body: { trigger_id: 1 },
      client: mockClient,
    } as unknown as Params

    await addTaskAction()(params)

    expect(mockOpen).toHaveBeenCalled()
  })
})
