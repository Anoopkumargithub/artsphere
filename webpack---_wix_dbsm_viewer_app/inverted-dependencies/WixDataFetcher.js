import {
    range,
    flow,
    uniqWith,
    uniqBy
} from 'lodash'
import {
    aggregateData
} from '../data/utils'
import {
    isFieldReferencedOrNested
} from '@wix/wix-data-client-common'
import {
    USER_INPUT_FILTER_RANGE_SLIDER_ROLE,
    nonNullable,
} from '@wix/wix-data-client-common-standalone'
import {
    LIST_TYPE_USER_INPUT_FILTER_ROLES
} from '../helpers/constants'
import {
    queryFilterOptions
} from './userInputFilters/queryFilterOptions'
import {
    queryReferencedFilterOptions
} from './userInputFilters/queryReferencedFilterOptions'
import {
    queryFilterMinMax
} from './userInputFilters/queryFilterMinMax'

export default class DataFetcher {
    constructor({
        wixData,
        wixDataSchemas
    }) {
        this._wixData = wixDataFunctions.reduce(
            (acc, fName) => {
                acc[fName] = (...args) => {
                    const result = wixData[fName](...args)

                    return result.catch instanceof Function ?
                        result.catch(e => {
                            throw createFixedWixDataError(e)
                        }) :
                        result
                }

                return acc
            }, { ...wixData
            },
        )

        this._wixDataSchemas = wixDataSchemas
    }

    async fetchBulkData(datasetConfigs) {
        const datasetsData = await Promise.all(
            datasetConfigs.map(
                ({
                    collectionId,
                    filter,
                    sort,
                    offset,
                    cursor,
                    length,
                    includes,
                    uniqueFieldValues,
                }) =>
                this.fetchData({
                    collectionId,
                    filter,
                    sort,
                    offset,
                    cursor,
                    length,
                    includes,
                    uniqueFieldValues,
                }).catch(error => ({
                    error
                })),
            ),
        )

        return aggregateData(datasetConfigs, datasetsData)
    }

    async fetchData({
        collectionId,
        filter,
        sort,
        offset = 0,
        includes,
        cursor,
        length,
        uniqueFieldValues,
    }) {
        const fetch = () => {
            let query = this._wixData
                .query(collectionId)
                .setFilterModel(filter)
                .setSortModel(sort)
                .skip(offset)
                .limit(length)

            includes ? .forEach(include => {
                query = query.include(include)
            })

            return query.find()
        }

        const fetchPromise = cursor ?
            this._wixData.fetch(collectionId, cursor, length) :
            fetch()

        const uniqueFieldValuesPromise =
            uniqueFieldValues.length > 0 // TODO test this condition
            ?
            this._fetchUniqueValues({
                collectionId,
                fieldKeys: uniqueFieldValues,
            }) :
            Promise.resolve({})

        const [fetchResult, uniqueFieldValuesResponse] = await Promise.all([
            fetchPromise,
            uniqueFieldValuesPromise,
        ])

        const {
            items,
            totalCount,
            nextCursor
        } = fetchResult
        return {
            items,
            nextCursor,
            totalCount: totalCount || 0,
            uniqueFieldValues: uniqueFieldValuesResponse,
        }
    }

    async fetchUserFilterInitialData({
        filter: filterModel,
        sort: sortModel,
        userFilterConnectionProps,
        schema,
        schemas,
    }) {
        const rolesToAggregate = [USER_INPUT_FILTER_RANGE_SLIDER_ROLE]

        const uniqueUserFilterMinMaxConnectionProps = uniqBy(
            userFilterConnectionProps.filter(({
                    role
                }) =>
                rolesToAggregate.includes(role),
            ),
            'fieldName',
        )

        const uniqueUserFilterOptionsConnectionProps = uniqWith(
            userFilterConnectionProps.filter(({
                    role
                }) =>
                LIST_TYPE_USER_INPUT_FILTER_ROLES.includes(role),
            ),
            (current, other) => current.fieldName === other.fieldName,
        )

        const initialData = await Promise.all([
            ...uniqueUserFilterMinMaxConnectionProps.map(
                async ({
                    fieldName,
                    role
                }) => {
                    const queryOptions = {
                        schema,
                        wixData: this._wixData,
                        fieldName,
                        role,
                        filterModel,
                    }
                    return queryFilterMinMax(queryOptions)
                },
            ),
            ...uniqueUserFilterOptionsConnectionProps.map(
                async ({
                    fieldName,
                    role
                }) => {
                    const isFieldReferenced = isFieldReferencedOrNested(fieldName)

                    const queryOptions = {
                        wixData: this._wixData,
                        schema,
                        schemas,
                        fieldName,
                        role,
                        sortModel,
                        filterModel,
                    }

                    return isFieldReferenced ?
                        queryReferencedFilterOptions(queryOptions) :
                        queryFilterOptions(queryOptions)
                },
            ),
        ])
        return initialData.filter(nonNullable)
    }

    async remove({
        collectionId,
        recordId
    }) {
        return this._wixData.remove(collectionId, recordId)
    }

    async save({
        collectionId,
        record,
        includeReferences
    }) {
        return this._wixData.save(collectionId, record, {
            includeReferences
        })
    }

    // this is getting sibling for dynamic pages
    // now it's super tricky.
    //TODO: the whole coneption should be revised
    async getSibling({
        collectionName,
        filter,
        sort,
        fieldValues,
        sortFields,
        directionTowardSibling,
    }) {
        const baseQuery = this._wixData.query(collectionName).setFilterModel(filter)

        const {
            items: [item],
        } = await getSiblingItemQuery({
            sort,
            sortFields,
            fieldValues,
            baseQuery,
            directionTowardSibling,
        }).find()

        return item
    }

    fetchSchemas(collectionIds) {
        return this._wixDataSchemas.bulkGet(collectionIds, {
            referencedCollectionsDepth: 1,
        })
    }

    // we're not sure how is better to invert filter/sort builders.
    // this is the only one for now used for fixed (virtual) controller
    //TODO: this is subject to change!
    createSimpleFilter(key, value) {
        return this._wixData.filter().eq(key, value).getFilterModel()
    }

    async _fetchUniqueValues({
        collectionId,
        fieldKeys
    }) {
        const uniqueValuesArray = await Promise.all(
            fieldKeys.map(fieldKey =>
                this._wixData.query(collectionId).distinct(fieldKey),
            ),
        )
        return uniqueValuesArray.reduce((acc, {
            _items: values
        }, index) => {
            acc[fieldKeys[index]] = values
            return acc
        }, {})
    }
}

const wixDataFunctions = [
    'save',
    'remove',
    'find',
    'sort',
    'filter',
    'query',
    'fetch',
    'aggregate',
]

const getSiblingItemQuery = ({
    sort,
    sortFields,
    directionTowardSibling,
    fieldValues,
    baseQuery,
}) => {
    const buildSiblingQuery = createSiblingQueryBuilder({
        sort,
        sortFields,
        directionTowardSibling,
        fieldValues,
        baseQuery,
    })

    return buildSiblingQuery(sortFields.length - 1).reduce((baseQuery, query) =>
        baseQuery.or(query),
    )
}

const createSiblingQueryBuilder = ({
        baseQuery,
        sortFields,
        sort,
        directionTowardSibling,
        fieldValues,
    }) =>
    function buildSiblingQuery(sortFieldIndex) {
        if (sortFieldIndex === -1) {
            return []
        }

        const sortField = sortFields[sortFieldIndex]

        if (!fieldValues[sortField]) {
            // fieldValue is missing, the field is likely deleted. If we continue, wixData client
            // will throw when attempting to build a $lt/$gt filter with undefined value
            return buildSiblingQuery(sortFieldIndex - 1)
        }

        const query = flow(
            addSorting(sort, directionTowardSibling),
            setDirection(
                sort[sortField],
                directionTowardSibling,
                sortField,
                fieldValues[sortField],
            ),
            setLimit(sortFieldIndex, sortFields, fieldValues),
        )(baseQuery)

        return [query, ...buildSiblingQuery(sortFieldIndex - 1)]
    }

const addSorting = (sort, directionTowardSibling) => query =>
    Object.entries(sort).reduce(
        (query, [field, direction]) =>
        direction === directionTowardSibling ?
        query.ascending(field) :
        query.descending(field),
        query,
    )

const setDirection =
    (sortDirection, directionTowardSibling, sortField, fieldValue) => query =>
    sortDirection === directionTowardSibling ?
    query.gt(sortField, fieldValue) :
    query.lt(sortField, fieldValue)

const setLimit = (sortFieldIndex, sortFields, fieldsValues) => query =>
    range(sortFieldIndex)
    .reduce(
        // I have no idea what is that and why it's needed
        (query, i) => query.eq(sortFields[i], fieldsValues[sortFields[i]]),
        query,
    )
    .limit(1)

const createFixedWixDataError = e => {
    // WixData lib creates an error with broken prototype (empty stack).
    // Such errors don't show any message making it imposible to understand the reason.

    // For the cases, when error is caused by wrong input from user code
    // wixData returns just a string message as error... oj-vej... for which sin should I suffer?

    if (!e.stack) {
        const {
            message,
            code
        } =
        typeof e === 'string' ? {
            message: e,
            code: 'WD_VALIDATION_FAILED'
        } : e
        const error = new Error(message)

        error.code = code

        return error
    }

    return e
}