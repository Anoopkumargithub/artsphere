import {
    union
} from '@wix/wix-data-client-wix-code-adt'

const derivedMethods = {
    chain: variant => fn => {
        return variant.matchWith({
            Empty: () => variant,
            Results: ({
                items,
                datasetSize,
                offset
            }) => {
                return fn({
                    items,
                    datasetSize,
                    offset,
                })
            },
        })
    },

    map: variant => fn => {
        return variant.matchWith({
            Empty: () => variant,
            Results: ({
                items: currItems,
                datasetSize: currDatasetSize,
                offset: currOffset,
            }) => {
                const {
                    items = currItems,
                        datasetSize = currDatasetSize,
                        offset = currOffset,
                } = fn({
                    items: currItems,
                    datasetSize: currDatasetSize,
                    offset: currOffset,
                })
                return QueryResultsADT.Results(items, datasetSize, offset)
            },
        })
    },

    filter: variant => fn => {
        return variant.matchWith({
            Empty: () => variant,
            Results: ({
                items,
                datasetSize,
                offset
            }) => {
                return fn({
                        items,
                        datasetSize,
                        offset,
                    }) ?
                    variant :
                    QueryResultsADT.Empty()
            },
        })
    },

    orElse: variant => fn => {
        return variant.matchWith({
            Empty: () => fn(),
            Results: () => variant,
        })
    },

    get: variant => () => {
        return variant.matchWith({
            Empty: () => ({
                items: [],
                datasetSize: {
                    total: 0,
                    loaded: 0
                },
                offset: 0,
            }),
            Results: results => results,
        })
    },

    of: () => of ,
}

const QueryResultsADT = union(
    'QueryResults', {
        Empty: () => ({}),
        Results: (items, datasetSize, offset = 0) => ({
            items,
            datasetSize,
            offset,
        }),
    },
    derivedMethods,
)

function of ({
    items,
    datasetSize,
    offset
}) {
    return datasetSize &&
        Math.max(datasetSize.total, datasetSize.loaded) > 0 &&
        Array.isArray(items) ?
        QueryResultsADT.Results(items, datasetSize, offset) :
        QueryResultsADT.Empty()
}

function fromWixDataQueryResults(wixDataQueryResults, offset) {
    return wixDataQueryResults ?
        this.of({
            items: wixDataQueryResults.items,
            datasetSize: wixDataQueryResults.datasetSize,
            offset,
        }) :
        QueryResultsADT.Empty()
}

export default {
    Empty: QueryResultsADT.Empty,
    Results: QueryResultsADT.Results,
    fromWixDataQueryResults,
    of ,
}