import {
  getAppUrl,
  getAppNameWithVersion,
} from '@wix/wix-data-client-common-standalone'
import type { ErrorMonitor, ErrorMonitorOptions } from '@wix/error-monitor'
import { APP_NAME } from '../../helpers/constants'
import type { Platform } from '../Platform'

export const createErrorMonitor = ({
  createErrorMonitor,
  dsn,
  platform,
}: {
  createErrorMonitor: (options: ErrorMonitorOptions) => ErrorMonitor
  dsn: string
  platform: Platform
}): ErrorMonitor => {
  const appUrl = getAppUrl(APP_NAME)
  const version = getAppNameWithVersion(appUrl)

  const errorMonitor = createErrorMonitor({
    dsn,
    appName: APP_NAME,
    version,
    environment: platform.settings.mode.name,
    user: { id: platform.user.id },
  })

  return errorMonitor
}
