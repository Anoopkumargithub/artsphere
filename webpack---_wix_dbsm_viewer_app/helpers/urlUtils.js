const COLLECTION_FIELD = /[^{}]+(?=\})/g
const NON_LETTER_OR_NUMBER = /[^\dA-Za-z]/g

export const cleanUrl = url => url.replace(/(\/{2,})/g, '/').replace(/^\//, '')

export const parseUrlPattern = pattern => {
    pattern = cleanUrl(pattern)
    return {
        fields: pattern.match(COLLECTION_FIELD) || [],
        nonFields: pattern
            .replace(COLLECTION_FIELD, '')
            .split(NON_LETTER_OR_NUMBER)
            .filter(x => !!x),
    }
}