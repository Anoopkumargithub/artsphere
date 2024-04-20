import {
    FieldType,
    AllowedFilterOperator
} from '@wix/wix-data-schema-types'
import {
    parseUrlPattern
} from '../helpers/urlUtils'
import {
    pick,
    flatten,
    difference
} from 'lodash'
import {
    convertFromCustomFormat
} from '@wix/cloud-elementory-protocol'

const ASCENDING = 'asc'
const DESCENDING = 'desc'

const canUsePageLinkForSorting = pageLink =>
    !pageLink.queryOperators || [AllowedFilterOperator.gt, AllowedFilterOperator.lt].every(op =>
        pageLink.queryOperators.includes(op),
    )

const extractRouterPayload = async ({
    dataProvider,
    dynamicPagesData: {
        dynamicPageData,
        datasetConfig: {
            dataset: {
                sort: datasetConfigSort,
                collectionName
            },
        },
        items,
    },
}) => {
    const datasetSort =
        (await dataProvider.getSort({
            sort: datasetConfigSort,
            collectionId: collectionName,
        })) || []

    const {
        dynamicUrl,
        userDefinedFilter
    } = dynamicPageData
    const record = convertFromCustomFormat(items)[0]

    const {
        fieldName,
        fieldDefinition
    } = getPageLinkField({
        dynamicUrl,
        schema: dataProvider.getSchema(collectionName),
    })

    const patternFields =
        dynamicUrl && record ?
        fieldDefinition && canUsePageLinkForSorting(fieldDefinition) ?
        [fieldName] :
        parseUrlPattern(dynamicUrl).fields :
        []

    const datasetSortFields = getDatasetSortFields(datasetSort)
    const unsortedPatternFields = difference(patternFields, datasetSortFields)
    const sort = getSortObject([
        ...datasetSort,
        ...getDefaultFieldsSort(unsortedPatternFields),
    ])
    const sortFields = [...datasetSortFields, ...unsortedPatternFields]

    const dynamicUrlPatternFieldsValues =
        extractDynamicUrlPatternFieldsValuesFromRecord(
            record,
            sortFields,
            patternFields,
        )

    return {
        dynamicUrl,
        userDefinedFilter,
        dynamicUrlPatternFieldsValues,
        sort,
        sortFields,
        patternFields,
    }
}

const getDatasetSortFields = sort =>
    flatten(sort.map(sortItem => Object.keys(sortItem).map(key => key)))

const getSortObject = sortArray =>
    sortArray.reduce(
        (accumulator, currentValue) => Object.assign(accumulator, currentValue), {},
    )

const getDefaultFieldsSort = patternFields =>
    patternFields.map(field => ({
        [field]: 'asc'
    }))

const extractDynamicUrlPatternFieldsValuesFromRecord = (
    record,
    sortFields,
    patternFields,
) => {
    const sortAndPatternFields = patternFields.concat(sortFields)
    return patternFields.length ? pick(record, sortAndPatternFields) : null
}

const getSiblingPage = async ({
    dataProvider,
    collectionName,
    directionTowardSibling,
    dynamicPagesData,
}) => {
    const {
        dynamicUrl,
        userDefinedFilter,
        dynamicUrlPatternFieldsValues,
        sort,
        sortFields,
        patternFields,
    } = dynamicPagesData
        ?
        await extractRouterPayload({
            dynamicPagesData,
            dataProvider
        }) :
        {}

    if (dynamicUrl == null || !patternFields.length) {
        return null
    }

    const item = await dataProvider.getSibling({
        collectionName,
        sort,
        sortFields,
        directionTowardSibling,
        fieldValues: dynamicUrlPatternFieldsValues,
        filter: userDefinedFilter,
    })

    const {
        fieldName
    } = getPageLinkField({
        dynamicUrl,
        schema: dataProvider.getSchema(collectionName),
    })

    if (!item || !fieldName) {
        return undefined
    }

    return item[fieldName]
}

const getPageLinkField = ({
    schema,
    dynamicUrl
}) => {
    const [fieldName, fieldDefinition] =
    Object.entries(schema.fields).find(
        ([_, field]) =>
        field.type === FieldType.pageLink &&
        field.calculator.config.pattern === dynamicUrl,
    ) || []

    return {
        fieldName,
        fieldDefinition
    }
}

export default ({
    dataProvider,
    dynamicPagesData,
    collectionName
}) => ({
    getNextDynamicPageUrl: () =>
        getSiblingPage({
            dataProvider,
            dynamicPagesData,
            collectionName,
            directionTowardSibling: ASCENDING,
        }),
    getPreviousDynamicPageUrl: () =>
        getSiblingPage({
            dataProvider,
            dynamicPagesData,
            collectionName,
            directionTowardSibling: DESCENDING,
        }),
})