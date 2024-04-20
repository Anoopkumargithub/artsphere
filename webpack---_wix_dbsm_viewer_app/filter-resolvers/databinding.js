import {
    Maybe
} from '@wix/wix-data-client-wix-code-adt'

const dataBindingFilterResolver =
    getDependencyById =>
    ({
        filterId
    }) =>
    Maybe.fromNullable(getDependencyById(filterId)).chain(
        ({
            masterDataset,
            fieldName
        }) => {
            let currentItem
            try {
                currentItem = masterDataset.api.getCurrentItem()
            } catch {}
            return Maybe.fromNullable(currentItem).map(item => {
                const value = item[fieldName]

                return value === undefined ? null : value
            })
        },
    )

export default dataBindingFilterResolver