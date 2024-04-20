import React from 'react';
import { TestIds } from '../constants';
import { IImageXProps, ResponsiveImageStyle } from '../ImageX.types';
import { getMediaUrlByContext } from './ImageX.utils';

export const ResponsiveImage: React.FC<{
  sources: IImageXProps['sources'];
  isInFirstFold: IImageXProps['isInFirstFold'];
  imageInfo: IImageXProps['imageInfo'];
  objectFit?: IImageXProps['objectFit'];
  className?: string;
}> = ({
  sources,
  isInFirstFold,
  imageInfo,
  objectFit = 'cover',
  className,
}) => {
  const defaultHeightAttribute = sources[sources.length - 1].heightAttribute;
  const defaultWidthAttribute = sources[sources.length - 1].widthAttribute;
  const { uri, alt } = imageInfo.imageData;
  const defaultSrc = getMediaUrlByContext(uri);

  return (
    <picture data-testId={TestIds.pictureElement} className={className}>
      {sources!.map(
        ({ srcset, media, sizes, heightAttribute, widthAttribute }) => (
          <source
            srcSet={srcset}
            media={media}
            sizes={sizes}
            height={heightAttribute}
            width={widthAttribute}
          />
        ),
      )}

      <img
        src={defaultSrc}
        alt={alt}
        height={defaultHeightAttribute}
        width={defaultWidthAttribute}
        style={
          { '--responsive-img-object-fit': objectFit } as ResponsiveImageStyle
        }
        {...(isInFirstFold ? { fetchpriority: 'high' } : { loading: 'lazy' })}
      />
    </picture>
  );
};
