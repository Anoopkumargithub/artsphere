import {
    omit
} from 'lodash'
import {
    Breadcrumb
} from '../logger'

export const createTraceReduxMiddleware =
    (logger, datasetId) => () => next => action => {
        logger.log(
            new Breadcrumb({
                category: 'redux',
                message: `${action.type} (dataset: ${datasetId})`,
                data: omit(action, 'type', 'record'),
            }),
        )

        return next(action)
    }