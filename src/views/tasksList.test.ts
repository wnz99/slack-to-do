import { tasksList } from './tasksList'

const tasks = [
  {
    id: 'M4ISI5reY86oEQ36Xhiw',
    createdAt: '1658763404',
    title: '6',
    isCompleted: false,
    dueDate: undefined,
  },
  {
    id: 'Qcks3amXXe3lNHe7J2vk',
    isCompleted: false,
    title: '6',
    createdAt: '1658763382',
    dueDate: undefined,
  },
]

describe('tasksList', () => {
  it('should render without errors', () => {
    const blocks = tasksList({ tasks, perPage: 5, page: 1 })

    expect(blocks).toMatchSnapshot()
  })
})
