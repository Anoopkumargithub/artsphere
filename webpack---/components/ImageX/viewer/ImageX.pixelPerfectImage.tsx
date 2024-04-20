import { ImageAttributesData } from '@wix/image';
import React from 'react';
import { IImageXProps } from '../ImageX.types';

const getPictureSource = (
  sourceSets: IImageXProps['imageInfo']['sourceSets'],
  sourceSetPlaceholders?: Array<ImageAttributesData>,
) =>
  sourceSets.map((srcSet, i) => {
    const src = sourceSetPlaceholders?.[i]?.uri || undefined;
    return (
      <source key={i} media={srcSet.mediaQuery} srcSet={srcSet.src || src} />
    );
  });

const ImageWithPlaceholder: React.FC<{
  id: IImageXProps['id'];
  imageInfo: IImageXProps['imageInfo'];
  defaultSrc: IImageXProps['defaultSrc'];
  hasSsrSrc: string;
  defaultPlaceholder?: ImageAttributesData;
  sourceSetPlaceholders?: Array<ImageAttributesData>;
  className?: string;
  shouldUseWowImage?: boolean;
}> = ({
  id,
  imageInfo,
  defaultSrc,
  hasSsrSrc,
  defaultPlaceholder,
  sourceSetPlaceholders,
  className,
  shouldUseWowImage,
}) => {
  const src = defaultPlaceholder?.uri || undefined;
  const placeholderStyle = defaultPlaceholder?.css?.img || {};
  // height is already handled - the fixed pixel size we get is messing up layout
  delete placeholderStyle.height;
  delete placeholderStyle.width;
  // use wow-image if experiment is open and wix-image otherwise
  const ImageCustomElement = (
    shouldUseWowImage ? 'wow-image' : 'wix-image'
  ) as keyof JSX.IntrinsicElements;
  const isResponsive = 'true';

  return (
    <ImageCustomElement
      id={`img-${id}`}
      data-is-responsive={isResponsive}
      data-image-info={JSON.stringify({ ...imageInfo, containerId: id })}
      data-has-ssr-src={hasSsrSrc}
      data-motion-part="BG_MEDIA"
      class={className}
    >
      <picture>
        {imageInfo.sourceSets &&
          getPictureSource(imageInfo.sourceSets, sourceSetPlaceholders)}
        <img
          src={src || defaultSrc}
          alt={imageInfo.imageData.alt}
          style={placeholderStyle}
        />
      </picture>
    </ImageCustomElement>
  );
};

export const PixelPerfectImage: React.FC<{
  id: IImageXProps['id'];
  imageInfo: IImageXProps['imageInfo'];
  defaultSrc: IImageXProps['defaultSrc'];
  getPlaceholder?: IImageXProps['getPlaceholder'];
  className?: string;
  allowWEBPTransform?: boolean;
  shouldUseWowImage?: boolean;
}> = ({
  id,
  imageInfo,
  defaultSrc,
  getPlaceholder,
  className,
  allowWEBPTransform,
  shouldUseWowImage,
}) => {
  let hasSsrSrc = '';
  const imagePlaceholderData = React.useRef<{
    defaultSrc: ImageAttributesData;
    sourceSet: Array<ImageAttributesData>;
  } | null>(null);

  if (!imagePlaceholderData.current) {
    if (getPlaceholder) {
      hasSsrSrc = 'true';

      imagePlaceholderData.current = {
        defaultSrc: getPlaceholder({
          fittingType: imageInfo.imageData.displayMode || 'fill',
          src: {
            id: imageInfo.imageData.uri,
            width: imageInfo.imageData.width,
            height: imageInfo.imageData.height,
            crop: imageInfo.imageData.crop,
            name: imageInfo.imageData.name,
            focalPoint: imageInfo.imageData.focalPoint,
          },
          target: {
            alignment: imageInfo.alignType,
            htmlTag: 'img',
          },
          options: {
            allowWEBPTransform,
            hasAnimation: imageInfo?.hasAnimation,
          },
        }),
        sourceSet: imageInfo.sourceSets?.map(imageData =>
          getPlaceholder({
            fittingType: imageData.displayMode,
            src: {
              id: imageInfo.imageData.uri,
              width: imageInfo.imageData.width,
              height: imageInfo.imageData.height,
              crop: imageData.crop,
              name: imageInfo.imageData.name,
              focalPoint: imageData.focalPoint,
            },
            target: {
              alignment: imageInfo.alignType,
              htmlTag: 'img',
            },
          }),
        ),
      };
    } else {
      // to keep an empty placeholder data
      imagePlaceholderData.current = {
        defaultSrc: {
          uri: '',
          css: { img: {}, container: {} },
          attr: { img: {}, container: {} },
        },
        sourceSet: [],
      };
    }
  }
  const defaultPlaceholder = imagePlaceholderData.current?.defaultSrc;
  const sourceSetPlaceholders = imagePlaceholderData.current?.sourceSet;

  return (
    <ImageWithPlaceholder
      {...{
        id,
        imageInfo,
        defaultSrc,
        hasSsrSrc,
        defaultPlaceholder,
        sourceSetPlaceholders,
        className,
        shouldUseWowImage,
      }}
    />
  );
};
