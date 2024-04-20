import {
    Maybe
} from '@wix/wix-data-client-wix-code-adt'
import Immediate from './immediate'
import {
    appContext
} from '../viewer-app-module/DataBindingAppContext'
import {
    Trace
} from '../logger'

export default ({
    recordStore
}) => {
    const {
        logger
    } = appContext
    const prefetchFirstRecord = service => {
        const fetchPromise = service
            .seed()
            .then(() =>
                service
                .getRecords(0, 1)
                .then(queryResult =>
                    queryResult.chain(({
                        items
                    }) => Maybe.Just(items[0])),
                ),
            )
            //TODO: it "eats" server errors. do we really want to go on without data?
            .catch(e => {
                logger.logError(e, 'Fetch initial data failed')
                return Maybe.Nothing()
            })

        return fetchPromise
    }

    const getFirstPrefetchedRecord = service =>
        service.getSeedRecords().matchWith({
            Empty: () => Immediate.resolve(Maybe.Nothing()),
            Results: ({
                items
            }) => Immediate.resolve(Maybe.Just(items[0])),
        })

    const getFirstRecord = () =>
        recordStore().fold(
            () => Promise.resolve(Maybe.Nothing()),
            service =>
            service.hasSeedData() ?
            getFirstPrefetchedRecord(service) :
            logger.log(
                new Trace('dataset/pageReady/getData', () =>
                    prefetchFirstRecord(service),
                ),
            ),
        )

    return getFirstRecord()
}