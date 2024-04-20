import {
    wixCodeItemToProGallery,
    proGalleryItemToWixCode,
} from '@wix/pro-gallery-items-formatter'
import {
    FieldType
} from '@wix/wix-data-schema-types'
import {
    appContext
} from '../../viewer-app-module/DataBindingAppContext'

const {
    mediaGallery,
    documentArray
} = FieldType
const convertUploadedFileUrlToMediaGalleryItem = ({
    uploadedFileUrl
}) => {
    const {
        platform: {
            utils: {
                media
            },
        },
    } = appContext
    const mediaItem = media.parseMediaItemUri(uploadedFileUrl)
    const mediaItemUri = media.createMediaItemUri(mediaItem).item
    const proGalleryItem = wixCodeItemToProGallery({
        ...mediaItem,
        src: mediaItemUri,
    })

    return proGalleryItemToWixCode(proGalleryItem)
}

export default ({
    value: files,
    currentValue = [],
    fieldType
}) => {
    switch (fieldType) {
        case mediaGallery:
            return [
                ...currentValue,
                ...files.map(({
                        fileUrl,
                        url
                    }) =>
                    convertUploadedFileUrlToMediaGalleryItem({
                        uploadedFileUrl: fileUrl || url,
                    }),
                ),
            ]
        case documentArray:
            return [
                ...currentValue,
                ...files.map(({
                    fileUrl,
                    url
                }) => fileUrl || url),
            ]
        default:
            return files[0].fileUrl || files[0].url
    }
}