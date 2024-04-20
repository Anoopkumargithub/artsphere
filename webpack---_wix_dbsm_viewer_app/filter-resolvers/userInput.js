import {
    USER_INPUT_FILTER_V1_ROLE
} from '@wix/wix-data-client-common-standalone'
import {
    Maybe
} from '@wix/wix-data-client-wix-code-adt'
import {
    parseStandardFilter
} from '../helpers/parseStandardFilter'
import castValueToFieldType from './castValueToFieldType'
import {
    getInputComponentValueAccessorName
} from '../components/helpers/componentValueUtils'

const resolve = (unresolvedFilterValue, components) => {
    const {
        filterId
    } = unresolvedFilterValue
    const userFilterComponent = components.find(
        comp => comp.connectionConfig.filters[filterId],
    )

    if (!userFilterComponent) {
        return
    }

    const valueProp = getInputComponentValueAccessorName(userFilterComponent)
    return userFilterComponent.getValue({
        propPath: valueProp,
    })
}

export default ({
    getConnectedComponents,
    getFieldType
}) =>
filter => {
    const connectedComponents = getConnectedComponents()
    if (!connectedComponents) {
        return Maybe.Nothing()
    }

    const filterInputComponents = connectedComponents.filter(
        ({
            role
        }) => role === USER_INPUT_FILTER_V1_ROLE,
    )

    return parseStandardFilter(filter).map(
        ({
            field,
            condition,
            value,
            positive
        }) => {
            const fieldType = getFieldType(field)
            const resolvedValue = resolve(value, filterInputComponents)
            const castValue = castValueToFieldType(fieldType, resolvedValue)

            if (!castValue && castValue !== 0) {
                return {
                    $and: []
                }
            }

            const parsedFilter = {
                [field]: {
                    [condition]: castValue
                }
            }

            return positive ? parsedFilter : {
                $not: [parsedFilter]
            }
        },
    )
}