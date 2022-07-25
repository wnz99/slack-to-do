const includes = (string: string): RegExp => new RegExp(`.*${string}`, 'g')

export interface BlockActionIncludes {
  type: 'block_actions'
  action_id: RegExp
}

export const blockActionIncludes = (string: string): BlockActionIncludes => ({
  type: 'block_actions',
  action_id: includes(string),
})
