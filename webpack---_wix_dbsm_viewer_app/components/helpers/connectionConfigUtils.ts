import { isEmpty } from 'lodash'
import type { ConnectionConfig } from '../../types'

export const isNonEmptyConfig = (config: ConnectionConfig) =>
  !!config && Object.values(config).some(value => !isEmpty(value))
