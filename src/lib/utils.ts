import format from 'date-fns/format'

const includes = (string: string): RegExp => new RegExp(`.*${string}`, 'g')

export interface BlockActionIncludes {
  type: 'block_actions'
  action_id: RegExp
}

export const blockActionIncludes = (string: string): BlockActionIncludes => ({
  type: 'block_actions',
  action_id: includes(string),
})

export const renderDate = (date?: string) =>
  date ? format(new Date(Number(date) * 1000).getTime(), 'dd/MM/yyyy') : 'none'
