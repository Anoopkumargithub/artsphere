import type { UserInputFilter } from '../types'

interface ConnectionConfig {
  userInputFilter?: Partial<UserInputFilter>
}

export const isValidUserInputFilterConnectionConfig = (
  connectionConfig: ConnectionConfig | undefined,
): boolean => {
  const { prop, fieldName } = connectionConfig?.userInputFilter ?? {}
  return !!(prop && fieldName)
}
