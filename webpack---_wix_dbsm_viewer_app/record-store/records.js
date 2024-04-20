import {
    v4 as uuidv4
} from 'uuid'
import {
    omit,
    merge,
    isPlainObject
} from 'lodash'
import {
    isPristine
} from './symbols'

const getRecordId = record => record._id

const hasDraft = record => typeof record[isPristine] === 'boolean'

const isRecordPristine = record =>
    typeof record[isPristine] !== 'boolean' || record[isPristine]

const markRecordDirty = record => ({
    ...record,
    [isPristine]: false,
})

const createDraft = (defaultDraft, recordId) => ({
    ...defaultDraft,
    _id: recordId || uuidv4(),
    [isPristine]: true,
})

const isSameRecord = (a, b) => a && b && a._id === b._id

const cleanseRecord = record => omit(record, [isPristine])

const fieldTypeSuitableForDeepMerge = ({
    includes,
    nestedFieldKeys,
    fieldKey,
}) => {
    const isReferenceField = includes ? .includes(fieldKey)
    const isNestedField = nestedFieldKeys.includes(fieldKey)
    return isReferenceField || isNestedField
}

const fieldValuesSuitableForDeepMerge = ({
        record,
        draft,
        fieldKey
    }) =>
    isPlainObject(record[fieldKey]) && isPlainObject(draft[fieldKey])

const shouldDeeplyMergeFieldValues = ({
        record,
        draft,
        includes,
        nestedFieldKeys,
        fieldKey,
    }) =>
    fieldTypeSuitableForDeepMerge({
        includes,
        nestedFieldKeys,
        fieldKey
    }) &&
    fieldValuesSuitableForDeepMerge({
        record,
        draft,
        fieldKey
    })

const mergeRecord = ({
    record,
    draft: {
        _id,
        ...draft
    },
    includes,
    nestedFieldKeys,
}) => {
    const fieldKeysForDeepMerge = Object.keys(draft).filter(fieldKey =>
        shouldDeeplyMergeFieldValues({
            record,
            draft,
            includes,
            nestedFieldKeys,
            fieldKey,
        }),
    )

    const shallowMergeResult = { ...record,
        ...draft
    }

    return fieldKeysForDeepMerge.reduce(
        (result, fieldKey) => ({
            ...result,
            [fieldKey]: merge({}, record[fieldKey], draft[fieldKey]),
        }),
        shallowMergeResult,
    )
}

export {
    cleanseRecord,
    createDraft,
    getRecordId,
    hasDraft,
    isRecordPristine,
    isSameRecord,
    markRecordDirty,
    mergeRecord,
}