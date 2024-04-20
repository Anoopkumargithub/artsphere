import {
    isArray,
    isEmpty,
    isEqual
} from 'lodash'
import {
    transformFilter,
    getFilterPartsByPredicate
} from '../helpers/filters'
import currentUserFilterResolver from './currentUser'
import dataBindingFilterResolver from './databinding'
import userInputResolver from './userInput'
import {
    isFieldReferencedOrNested,
    getReferenceFieldName,
    shouldResolveCurrentUser,
    shouldResolveDataBinding,
    shouldResolveUserInput,
    resolveCondition,
} from '@wix/wix-data-client-common'
import {
    parseStandardFilter
} from '../helpers/parseStandardFilter'
import {
    FieldType
} from '@wix/wix-data-schema-types'
import {
    LIST_TYPE_USER_INPUT_FILTER_ROLES,
    RESET_ALL,
    USER_INPUT_FILTER_ROLES,
} from '../helpers/constants'
import {
    USER_INPUT_FILTER_RANGE_SLIDER_ROLE
} from '@wix/wix-data-client-common-standalone'

const shouldResolve = filterExpression =>
    shouldResolveCurrentUser(filterExpression) ||
    shouldResolveDataBinding(filterExpression) ||
    shouldUserInputResolveWholeFilter(filterExpression)

const parseComponentValue = ({
    value,
    fieldType,
    fieldName,
    getUserFilterInitialData,
}) => {
    switch (fieldType) {
        case FieldType.reference:
            {
                const userFilterInitialData = getUserFilterInitialData() ? .find(
                    userFilterInitialData =>
                    userFilterInitialData.fieldName === fieldName &&
                    LIST_TYPE_USER_INPUT_FILTER_ROLES.includes(
                        userFilterInitialData.role,
                    ),
                )

                if (!userFilterInitialData) {
                    return null
                }
                const {
                    referencedItemIdsByOption
                } = userFilterInitialData

                return isArray(value) ?
                    value.flatMap(key => referencedItemIdsByOption[key]) :
                    referencedItemIdsByOption[value]
            }
        case FieldType.number:
            {
                return Array.isArray(value) ? value.map(Number) : Number(value)
            }
        default:
            return value
    }
}

const resolveFilterByCondition = ({
    role,
    fieldName,
    value,
    condition
}) => {
    if (!condition) {
        return role === USER_INPUT_FILTER_RANGE_SLIDER_ROLE ?
            {
                [fieldName]: {
                    $gte: value[0],
                    $lte: value[1]
                },
            } :
            {
                [fieldName]: Array.isArray(value) ? {
                    $hasSome: value
                } : value,
            }
    }

    const {
        getFilterQuery
    } = resolveCondition(condition)

    return getFilterQuery(fieldName, value)
}

const resolveFilter =
    ({
        valueResolvers,
        getConnectedComponents,
        getFieldType,
        getUserFilterInitialData,
        wasSetFilterCalled,
    }) =>
    filter => {
        const resolveExpressionValue = filterExpression => {
            if (shouldResolveCurrentUser(filterExpression)) {
                return valueResolvers.currentUser()
            }

            if (shouldResolveDataBinding(filterExpression)) {
                return valueResolvers.dataBinding(filterExpression)
            }

            if (shouldUserInputResolveWholeFilter(filterExpression)) {
                return valueResolvers.userInput(filterExpression)
            }
        }

        const maybeResolvedFilter = transformFilter(
            shouldResolve,
            resolveExpressionValue,
            filter,
        ).map(resolvedFilter => {
            if (wasSetFilterCalled()) {
                return resolvedFilter
            }
            const connectedComponents = getConnectedComponents()
            const filterInputComponents = connectedComponents.filter(({
                    role
                }) =>
                USER_INPUT_FILTER_ROLES.includes(role),
            )

            const userInputFilters = filterInputComponents
                .map(component => {
                    const {
                        userInputFilter
                    } = component.connectionConfig
                    const {
                        prop,
                        fieldName: fieldPath,
                        condition
                    } = userInputFilter
                    const value = component.getValue({
                        propPath: prop
                    })
                    const isReferenced = isFieldReferencedOrNested(fieldPath)
                    const fieldName = isReferenced ?
                        getReferenceFieldName(fieldPath) :
                        fieldPath

                    if (
                        [RESET_ALL, '', false].includes(value) ||
                        isEqual(value, []) ||
                        (component.role === USER_INPUT_FILTER_RANGE_SLIDER_ROLE &&
                            isEqual(value, component.getBounds()))
                    ) {
                        return null
                    }

                    const fieldType = getFieldType(fieldName).getOrElse(null)

                    const parsedValue = parseComponentValue({
                        value,
                        fieldType,
                        fieldName: fieldPath,
                        getUserFilterInitialData,
                    })

                    if (parsedValue === null) {
                        return null
                    }

                    return resolveFilterByCondition({
                        role: component.role,
                        fieldName,
                        value: parsedValue,
                        condition,
                    })
                })
                .filter(Boolean)

            if (userInputFilters.length === 0) {
                return resolvedFilter
            }
            return {
                $and: [resolvedFilter].filter(Boolean).concat(userInputFilters)
            }
        })

        return maybeResolvedFilter
    }

const shouldUserInputResolveWholeFilter = filterExpression =>
    parseStandardFilter(filterExpression)
    .map(({
        value
    }) => shouldResolveUserInput(value))
    .getOrElse(false)

// getPartsForDatabindingResolver :: Filter -> [FilterPart]
const getPartsForDatabindingResolver = filter =>
    getFilterPartsByPredicate(shouldResolveDataBinding, filter)

// hasPartsForUserInputResolver :: Filter -> Boolean
const hasPartsForUserInputResolver = filter =>
    !isEmpty(getFilterPartsByPredicate(shouldResolveUserInput, filter))

// hasPartsForCurrentUserResolver :: Filter -> Boolean
const hasPartsForCurrentUserResolver = filter =>
    !isEmpty(getFilterPartsByPredicate(shouldResolveCurrentUser, filter))

// hasDatabindingDependencies :: Filter -> Boolean
const hasDatabindingDependencies = filter =>
    getPartsForDatabindingResolver(filter).length > 0

const hasDynamicFilter = filter =>
    hasPartsForUserInputResolver(filter) ||
    hasPartsForCurrentUserResolver(filter) ||
    hasDatabindingDependencies(filter)

const createValueResolvers = (
    getDependencyById,
    getConnectedComponents,
    getFieldType,
) => ({
    dataBinding: dataBindingFilterResolver(getDependencyById),
    currentUser: currentUserFilterResolver(),
    userInput: userInputResolver({
        getConnectedComponents,
        getFieldType
    }),
})

export {
    resolveFilter as createFilterResolver,
    createValueResolvers,
    getPartsForDatabindingResolver as getExpressions,
    hasPartsForUserInputResolver as hasUserInputDependencies,
    hasDynamicFilter,
}