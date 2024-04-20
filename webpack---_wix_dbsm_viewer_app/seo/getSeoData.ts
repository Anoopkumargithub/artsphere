import type { FieldSpec, Schema } from '@wix/wix-data-schema-types'
import { FieldType } from '@wix/wix-data-schema-types'
import {
  IMAGE_ROLE,
  GALLERY_ROLE,
  MEDIA_GALLERY_ROLE,
  VIDEO_ROLE,
  VIDEOPLAYER_ROLE,
} from '@wix/wix-data-client-common-standalone'
import type { State } from '../dataset-controller/rootReducer'
import { selectCurrentRecord } from '../dataset-controller/rootReducer'
import { getTotalRecordCount } from '../helpers/paginationUtils'
import type { RecordStoreRecord } from '../record-store/service'
import type { Connection, RecordStore } from '../types'
import type {
  CollectionSeoData,
  ImageSeoData,
  VideoSeoData,
  Field,
  GallerySeoData,
} from './types'
import type {
  GalleryItem,
  ImageItem,
  VideoItem,
} from '../inverted-dependencies/components'
import type { DatasetSeo } from './seoManager'

interface Params {
  recordStore: RecordStore
  state: State
  schema: Schema
  connections: Connection[]
  isDpItemDataset: boolean
}

const FIELD_TYPES_TO_INCLUDE = [
  FieldType.text,
  FieldType.number,
  FieldType.image,
  FieldType.video,
  FieldType.mediaGallery,
  FieldType.richContent,
]

const FIELDTYPE_TO_SEO_FIELD_TYPE: Partial<Record<FieldType, Field['type']>> = {
  [FieldType.text]: 'text',
  [FieldType.number]: 'number',
  [FieldType.image]: 'image',
  [FieldType.video]: 'video',
  [FieldType.mediaGallery]: 'gallery',
  [FieldType.richContent]: 'rich-content',
}

export const getSeoData = ({
  recordStore,
  state,
  schema,
  connections,
  isDpItemDataset,
}: Params): DatasetSeo => {
  if (!isDpItemDataset && !connections.length) {
    return { collectionData: undefined }
  }

  const currentRecord = selectCurrentRecord(state)
  if (!currentRecord) {
    return { collectionData: undefined }
  }

  const {
    id: collectionId,
    displayName: schemaName,
    displayField,
    fields,
  } = schema

  const title =
    isDpItemDataset && displayField ? currentRecord[displayField] : undefined

  const totalCount = isDpItemDataset
    ? 1
    : getTotalRecordCount({ recordStore }) ?? undefined

  return {
    title,
    collectionData: {
      id: collectionId,
      name: schemaName || collectionId,
      totalCount,
      fields: getFieldsData({ connections, fields, currentRecord }),
      primary: isDpItemDataset,
    },
  }
}

const getFieldsData = ({
  connections,
  fields,
  currentRecord,
}: {
  connections: Connection[]
  fields: Schema['fields']
  currentRecord: RecordStoreRecord
}): CollectionSeoData['fields'] => {
  const connectionsByField = connections.reduce(toConnectionsByFieldKey, {})

  return Object.entries(fields)
    .filter(
      ([_key, field]) =>
        !field.pii &&
        !field.isDeleted &&
        FIELD_TYPES_TO_INCLUDE.includes(field.type),
    )
    .map(([key, field]) => ({
      key,
      type: FIELDTYPE_TO_SEO_FIELD_TYPE[field.type] as Field['type'],
      label: field.displayName,
      connected: !!connectionsByField[key]?.length,
      value: getValue({
        key,
        field,
        currentRecord,
        connections: connectionsByField[key] || [],
      }),
    }))
}

type FieldKey = string
type ConnectionsByFieldKey = Record<FieldKey, Connection[]>

const getValue = ({
  key,
  field,
  currentRecord,
  connections,
}: {
  key: string
  field: FieldSpec
  currentRecord: RecordStoreRecord
  connections: Connection[]
}) => {
  const { type } = field
  const value = currentRecord[key]

  switch (type) {
    case FieldType.image:
      return value && getImageSeoData({ src: value }, connections)
    case FieldType.video:
      return value && getVideoSeoData({ src: value }, connections)
    case FieldType.mediaGallery:
      return getGallerySeoData(value, connections)
    case FieldType.text:
    case FieldType.number:
    case FieldType.richContent:
      return value
    default:
      throw new Error(`Unsupported field type: ${type}`)
  }
}

const toConnectionsByFieldKey = (
  acc: ConnectionsByFieldKey,
  connection: Connection,
) => {
  const properties = connection?.config?.properties || {}
  const connectedFields = Object.values(properties).map(
    ({ fieldName }) => fieldName,
  )

  connectedFields.forEach(key => {
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(connection)
  })

  return acc
}

const getImageSeoData = (
  { src }: Partial<ImageItem> & Pick<ImageItem, 'src'>,
  connections: Connection[],
): ImageSeoData => {
  const connectedToSrc = connections.some(
    ({ role, config }) =>
      (role === MEDIA_GALLERY_ROLE && Boolean(config?.properties?.items)) ||
      (role === GALLERY_ROLE && Boolean(config?.properties?.src)) ||
      (role === IMAGE_ROLE && Boolean(config?.properties?.src)),
  )

  return {
    url: src,
    ...extractImageDimensions(src),
    connectedToSrc,
  }
}

const getVideoSeoData = (
  { src, title, description }: Partial<VideoItem> & Pick<VideoItem, 'src'>,
  connections: Connection[],
): VideoSeoData => {
  const connectedToSrc = connections.some(
    ({ role, config }) =>
      (role === MEDIA_GALLERY_ROLE && Boolean(config?.properties?.items)) ||
      (role === VIDEOPLAYER_ROLE && Boolean(config?.properties?.src)) ||
      (role === VIDEO_ROLE && Boolean(config?.properties?.src)),
  )

  if (!isWixVideo(src)) {
    return {
      thumbnailUrl: undefined,
      title,
      description,
      uploadDate: undefined,
      connectedToSrc,
    }
  }

  const [_1, uri] = src.match(/posterUri=(\w+)/) || []
  const [_2, width] = src.match(/posterWidth=(\d+)/) || []
  const [_3, height] = src.match(/posterHeight=(\d+)/) || []

  return {
    thumbnailUrl: createWixImageUrl({
      uri,
      width: Number(width),
      height: Number(height),
    }),
    title,
    description,
    uploadDate: undefined,
    connectedToSrc,
  }
}

const getGallerySeoData = (
  items: GalleryItem[] = [],
  connections: Connection[],
): GallerySeoData =>
  items.map(
    item =>
      item.type === 'image'
        ? getImageSeoData(item, connections)
        : getVideoSeoData(item, connections),
    connections,
  )

interface WixImageParams {
  uri: string
  width: number
  height: number
  filename?: string
}

const extractImageDimensions = (imageUrl: string) => {
  if (!isWixImage(imageUrl)) {
    return { height: undefined, width: undefined }
  }

  const [_1, height] = imageUrl.match(/originHeight=(\d+)/) || []
  const [_2, width] = imageUrl.match(/originWidth=(\d+)/) || []

  return {
    height: height ? Number(height) : undefined,
    width: width ? Number(width) : undefined,
  }
}

const createWixImageUrl = ({
  uri,
  width,
  height,
  filename = 'image.ext',
}: WixImageParams) =>
  `wix:image://v1/${uri}/${filename}#originWidth=${width}&originHeight=${height}`

const isWixImage = (imageUrl: string) => imageUrl.startsWith('wix:image://')
const isWixVideo = (videoUrl: string) => videoUrl.startsWith('wix:video://')
