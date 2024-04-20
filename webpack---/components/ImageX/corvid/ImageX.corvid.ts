import {
  withValidation,
  composeSDKFactories,
  assert,
  toJSONBase,
  reportError,
  linkPropsSDKFactory,
  clickPropsSDKFactory,
  createElementPropsSDKFactory,
  parseMediaSrc,
  createMediaSrc,
} from '@wix/editor-elements-corvid-utils';
import { createComponentSDKModel } from '@wix/editor-elements-integrations/corvid';
import type {
  IImageXProps,
  IImageXOwnSDKFactory,
  IImageXSDK,
} from '../ImageX.types';

const clickActionValues = {
  show: 'link',
  disable: 'none',
};

const IMAGE_FIT_MODE_MAP = {
  fixedWidth: 'fitWidth',
  fit: 'fit',
  fill: 'fill',
} as const;
const IMAGE_FIT_MODE_INVERTED_MAP = (
  Object.keys(IMAGE_FIT_MODE_MAP) as Array<keyof typeof IMAGE_FIT_MODE_MAP>
).reduce(
  (acc, key) => ({
    ...acc,
    [IMAGE_FIT_MODE_MAP[key]]: key,
  }),
  {},
) as {
  [key: string]: keyof typeof IMAGE_FIT_MODE_MAP;
};

const _imageXSDKFactory: IImageXOwnSDKFactory = ({
  setProps,
  props,
  metaData,
}) => ({
  get src() {
    const mediaSrc = createMediaSrc({
      type: 'image',
      mediaId: props.imageInfo.imageData.uri,
      title: props.imageInfo.imageData.name,
      width: props.imageInfo.imageData.width,
      height: props.imageInfo.imageData.height,
    });
    // false is the initial value for defaultSrc
    return props.defaultSrc?.toString() === 'false'
      ? mediaSrc.item
      : props.defaultSrc?.toString();
  },
  set src(value) {
    const src = assert.isNil(value) ? '' : value;
    const {
      height,
      width,
      title: name,
      error,
      mediaId: uri,
    } = parseMediaSrc(src.toString(), 'image');
    if (error) {
      reportError(
        `The "src" property cannot be set to "src". It must be a valid URL starting with "http://", "https://", or "wix:image://".`,
      );
      return;
    }
    const currentImageData = props.imageInfo.imageData;

    const updatedImageData = {
      ...currentImageData,
      width: width || currentImageData.width,
      height: height || currentImageData.height,
      uri: uri || currentImageData.uri,
      name: name || currentImageData.name,
      crop: null,
    };
    setProps({
      defaultSrc: src,
      imageInfo: {
        ...props.imageInfo,
        containerId: metaData.compId,
        imageData: updatedImageData,
        sourceSets: props.imageInfo.sourceSets.map(sourceSet => ({
          ...sourceSet,
          src: undefined,
        })),
      },
      aspectRatio: updatedImageData.height / updatedImageData.width,
    });
  },

  get alt() {
    return props.imageInfo.imageData.alt;
  },

  set alt(value) {
    const altValue = assert.isNil(value) ? '' : value;
    setProps({
      imageInfo: {
        ...props.imageInfo,
        containerId: metaData.compId,
        imageData: { ...props.imageInfo.imageData, alt: altValue },
      },
    });
  },

  get clickAction() {
    return props.showLink ? clickActionValues.show : clickActionValues.disable;
  },

  set clickAction(value) {
    const newPropVal = clickActionValues.show === value;

    setProps({ showLink: newPropVal });
  },

  get fitMode() {
    return IMAGE_FIT_MODE_INVERTED_MAP[props.imageInfo.imageData.displayMode];
  },

  set fitMode(fitMode: keyof typeof IMAGE_FIT_MODE_MAP) {
    const displayMode = IMAGE_FIT_MODE_MAP[fitMode];
    setProps({
      imageInfo: {
        ...props.imageInfo,
        imageData: { ...props.imageInfo.imageData, displayMode },
      },
    });
  },

  get name() {
    return props.imageInfo.imageData.name;
  },

  set name(value) {
    setProps({
      imageInfo: {
        ...props.imageInfo,
        containerId: metaData.compId,
        imageData: { ...props.imageInfo.imageData, name: value },
      },
    });
  },

  get type() {
    return '$w.Image';
  },
  toJSON() {
    return {
      ...toJSONBase(metaData),
      type: '$w.Image',
      alt: props.imageInfo.imageData.alt,
      src: props.defaultSrc,
      name: props.imageInfo.imageData.name,
    };
  },
});

const imageXSDKFactory = withValidation(_imageXSDKFactory, {
  type: ['object'],
  properties: {
    src: { type: ['string', 'nil'], warnIfNil: true },
    alt: { type: ['string', 'nil'], warnIfNil: true },
    name: { type: ['string', 'nil'], warnIfNil: true },
    fitMode: { type: ['string'], enum: Object.keys(IMAGE_FIT_MODE_MAP) },
    clickAction: { type: ['string'], enum: Object.values(clickActionValues) },
  },
});

const elementPropsSDKFactory = createElementPropsSDKFactory();

export const sdk = composeSDKFactories<IImageXProps, IImageXSDK>([
  elementPropsSDKFactory,
  linkPropsSDKFactory,
  clickPropsSDKFactory,
  imageXSDKFactory,
]);

export default createComponentSDKModel(sdk);
