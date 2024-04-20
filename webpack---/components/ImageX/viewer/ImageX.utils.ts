import { Override } from '@wix/editor-elements-types/src/entries/utils';
import {
  AlignType,
  FittingType,
  getData,
  ImageTransformTarget,
  ImageDataAttributes,
} from '@wix/image-kit';
// TODO: replace import of image-kit with window.__imageClientApi__ (here and in MusicPlayer.mapper.ts and SeoTpaGallery.mapper.ts)
import type { Crop, FocalPoint } from '@wix/thunderbolt-becky-types';
import type { ImageXImageData } from '@wix/thunderbolt-components-native';
import { VIEWPORT_DIMENSIONS_HEURISTICS } from '../constants';
import {
  IImageXProps,
  ObjectFit,
  ResponsiveImageInfo,
  SourceInfo,
} from '../ImageX.types';

const DEFAULT_MEDIA = '(max-width: 1920px)';
const MAX_VIEWPORT_WIDTH = 1920;
const MIN_IMG_SIZE = 50;
const SIZES_FACTOR = 0.75;
const MAX_DPR = 2;
const MAX_BREAKPOINT = 2000;

export const getDisplayModeStyle = (
  id: string,
  displayMode: string,
  aspectRatio: number,
  useNativeAspectRatio: boolean,
) => {
  if ('fitWidth' === displayMode) {
    if (useNativeAspectRatio) {
      return `#${id.replace('#', '')} {aspect-ratio: ${1 / aspectRatio};}`;
    }
    return (
      `#${id.replace('#', '')}::before {--aspect-ratio: ${aspectRatio};` +
      `content: attr(x);display: block;padding-top: calc(var(--aspect-ratio) * 100%);}`
    );
  }
  return '';
};

export const getMediaUrlByContext = (imageUri: string = '') => {
  const isExternalUrl = /(^https?)|(^data)|(^blob)|(^\/\/)/.test(imageUri);
  if (isExternalUrl) {
    return imageUri;
  }
  let path = `${staticMediaUrl()}/`;
  if (imageUri) {
    if (/^micons\//.test(imageUri)) {
      path = staticMediaUrl();
    } else if (/[^.]+$/.exec(imageUri)![0] === 'ico') {
      // if the image is an icon then it's taken from a slightly different place
      path = path.replace('media', 'ficons');
    }
  }
  return path + imageUri;
};

function staticMediaUrl() {
  return (
    (typeof window !== 'undefined' &&
      (window as any).serviceTopology &&
      (window as any).serviceTopology.staticMediaUrl) ||
    'https://static.wixstatic.com/media'
  );
}

export const getImageUri = (
  imageData: Override<ImageXImageData, { crop: Crop | null | undefined }>,
  displayMode: FittingType,
  alignType: AlignType,
  targetData: ImageTransformTarget,
): { uri: string; css: ImageDataAttributes['css'] } => {
  const { uri, width, height, name, crop, focalPoint } = imageData;
  const { height: targetHeight, width: targetWidth } = targetData;
  const image = getData(
    displayMode || 'fill',
    {
      id: uri,
      width,
      height,
      crop: crop || undefined,
      name,
      focalPoint: focalPoint as FocalPoint,
    },
    {
      alignment: alignType,
      htmlTag: 'img',
      width: targetWidth,
      height: targetHeight,
    },
  );

  return {
    uri: getMediaUrlByContext(image.uri),
    css: image.css,
  };
};

const translateDimensionInVh = (
  viewportWidth: number,
  dimensionInVh: number,
) => {
  const viewport = VIEWPORT_DIMENSIONS_HEURISTICS.find(
    range =>
      range.viewportWidthRange[0] >= viewportWidth &&
      viewportWidth > range.viewportWidthRange[1],
  );
  if (viewport) {
    return dimensionInVh * (viewport.viewportHeight / 100);
  } else {
    return viewportWidth;
  }
};

const getLayoutHeight = (
  layout: ResponsiveImageInfo['layout'],
  bpMaxWidth: number,
  bp: number,
) => {
  const {
    height: { type, value },
    // resolvedHeight,
  } = layout;
  if (type === 'aspectRatio') {
    return value !== 0 ? bpMaxWidth * (value as number) : bpMaxWidth;
  } else if (type === 'px') {
    return value;
  } else if (type === 'vw') {
    return ((value as number) / 100) * bp;
  } else if (type === 'percentage' || type === 'auto') {
    return translateDimensionInVh(bp, (value || 100) as number); // resolved height is still not accurate - temp solution
  } else if (type === 'vh') {
    return translateDimensionInVh(bp, value as number);
  } else {
    return bpMaxWidth;
  }
};

const generateTargetWidths = (max: number) => {
  if (max > MIN_IMG_SIZE) {
    const sizes = [];
    let currentSize = max * MAX_DPR;
    while (currentSize > MIN_IMG_SIZE) {
      sizes.push(currentSize);
      currentSize *= SIZES_FACTOR;
    }
    return sizes;
  }
  return [max];
};

// make formattedSizesAttribute be a function
const getFormattedSizesAttribute = (layout: ResponsiveImageInfo['layout']) => {
  const { width, resolvedWidth } = layout;
  const { type, value } = width;
  if (type === 'px') {
    return `${Math.ceil(value)}px`;
  } else if (type === 'vw') {
    return `${Math.ceil(value)}vw`;
  } else if (!resolvedWidth) {
    return '100vw';
  } else {
    return `${resolvedWidth}px`;
  }
};

const getMaxWidthTarget = (
  layout: ResponsiveImageInfo['layout'],
  breakpointMax: number,
) => {
  const { width, resolvedWidth } = layout;
  const { type, value } = width;

  if (type === 'px') {
    return value;
  } else if (type === 'vw') {
    return breakpointMax * (+value / 100);
  } else if (type === 'vh') {
    return translateDimensionInVh(breakpointMax, value);
  } else if (!resolvedWidth || type === 'auto') {
    return breakpointMax;
  } else {
    return resolvedWidth;
  }
};

export const getResponsiveImageSources = (
  responsiveImagesInfo: Array<ResponsiveImageInfo>,
  imageData: IImageXProps['imageInfo']['imageData'],
  alignType: IImageXProps['imageInfo']['alignType'],
) => {
  const sourcesWithoutSrcSet: Array<SourceInfo> = [];

  responsiveImagesInfo.forEach((entry: ResponsiveImageInfo) => {
    const { scopedData, minmax, layout } = entry;

    if (entry?.breakpointMax > MAX_BREAKPOINT) {
      return;
    }

    const breakpointMax = entry.breakpointMax || MAX_VIEWPORT_WIDTH;

    const formattedSizesAttribute = getFormattedSizesAttribute(layout);

    // the maximum width the img could be in this breakpoint
    const maxWidthTarget = getMaxWidthTarget(layout, breakpointMax);

    // get img height for max width and keep aspect ratio for that breakpoint
    const bpHeightPx = getLayoutHeight(
      layout,
      maxWidthTarget,
      breakpointMax,
    ) as number;

    const bpAspectRatio =
      Math.floor((maxWidthTarget / bpHeightPx) * 1000) / 1000;

    const currentSource = sourcesWithoutSrcSet[sourcesWithoutSrcSet.length - 1];

    const shouldCreateNewSource =
      !currentSource ||
      scopedData ||
      bpAspectRatio !== currentSource.bpAspectRatio; // is aspect ratio or scoped data different than previous source we created

    if (shouldCreateNewSource) {
      const newSource: SourceInfo = {
        sizes: [formattedSizesAttribute],
        media: minmax || DEFAULT_MEDIA,
        maxImgWidth: maxWidthTarget,
        srcset: null,
        bpAspectRatio,
        heightAttribute: Math.ceil(bpHeightPx),
        widthAttribute: Math.ceil(maxWidthTarget),
        crop: scopedData?.crop,
        focalPoint: scopedData?.focalPoint,
      };
      sourcesWithoutSrcSet.push(newSource);
    } else {
      currentSource.sizes.push(
        `(max-width: ${breakpointMax}px) ${formattedSizesAttribute}`,
      );
      currentSource.maxImgWidth = Math.max(
        currentSource.maxImgWidth,
        maxWidthTarget,
      ); // keep track of largest possible width
    }
  });

  const sourcesWithSrcSet = sourcesWithoutSrcSet
    .map(source => {
      const {
        maxImgWidth,
        media,
        sizes,
        bpAspectRatio,
        heightAttribute,
        widthAttribute,
        crop,
        focalPoint,
      } = source;
      const targetWidths = generateTargetWidths(maxImgWidth);

      const srcset = targetWidths.map((targetWidth: number) => {
        const targetHeight = Math.ceil(targetWidth / bpAspectRatio);

        const { uri } = getImageUri(
          { ...imageData, crop, focalPoint },
          imageData.displayMode,
          alignType,
          { width: targetWidth, height: targetHeight },
        );

        return `${uri} ${Math.ceil(targetWidth)}w`;
      });

      return {
        media,
        sizes: sizes.reverse().join(', '),
        srcset: srcset.reverse().join(', '),
        heightAttribute,
        widthAttribute,
      };
    })
    .reverse();

  return sourcesWithSrcSet;
};

export const getResponsiveImageObjectFit = (
  sources: IImageXProps['sources'],
  responsiveImagesInfo: Array<ResponsiveImageInfo>,
  imageData: IImageXProps['imageInfo']['imageData'],
  alignType: IImageXProps['imageInfo']['alignType'],
) => {
  const { heightAttribute, widthAttribute } = sources[0];
  const crop = responsiveImagesInfo[0]?.scopedData?.crop;
  const focalPoint = responsiveImagesInfo[0]?.scopedData?.focalPoint;

  const { css } = getImageUri(
    { ...imageData, crop, focalPoint },
    imageData.displayMode,
    alignType,
    { width: widthAttribute, height: heightAttribute },
  );
  return (css?.img?.objectFit as ObjectFit) || 'cover';
};
