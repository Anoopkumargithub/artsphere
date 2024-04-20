import {
    appContext
} from '../../viewer-app-module/DataBindingAppContext'

export default ({
    value
}) => {
    const {
        platform: {
            utils: {
                media
            },
        },
    } = appContext
    const mediaItem = media.parseMediaItemUri(value)

    if (mediaItem.error) {
        return value
    }

    switch (mediaItem.type) {
        case media.types.IMAGE:
            return media.getScaleToFillImageURL(
                mediaItem.mediaId,
                mediaItem.width,
                mediaItem.height,
                mediaItem.width,
                mediaItem.height, {
                    name: mediaItem.title
                },
            )

        case media.types.VIDEO:
            return `https://video.wixstatic.com/video/${mediaItem.mediaId}/file`
        case media.types.AUDIO:
            return `https://static.wixstatic.com/mp3/${mediaItem.mediaId}`
        default:
            return value
    }
}