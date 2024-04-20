import {
  composeSDKFactories,
  backgroundPropsSDKFactory,
  childrenPropsSDKFactory,
  clickPropsSDKFactory,
  createElementPropsSDKFactory,
  toJSONBase,
} from '@wix/editor-elements-corvid-utils';
import { createComponentSDKModel } from '@wix/editor-elements-integrations/corvid';
import { corvidName as type } from '../constants';
import {
  ISectionOwnSDKFactory,
  ISectionSDK,
  ISectionSDKFactory,
  ISectionProps,
} from '../Section.types';

const sectionSDKFactory: ISectionOwnSDKFactory = sdkProps => {
  const { metaData } = sdkProps;

  return {
    ...backgroundPropsSDKFactory(sdkProps),
    get type() {
      return type;
    },
    toJSON() {
      return {
        ...toJSONBase(metaData),
        type,
      };
    },
  };
};

const elementPropsSDKFactory = createElementPropsSDKFactory();

export const sdk: ISectionSDKFactory = composeSDKFactories<
  ISectionProps,
  ISectionSDK
>([
  elementPropsSDKFactory,
  sectionSDKFactory,
  childrenPropsSDKFactory,
  clickPropsSDKFactory,
]);

export default createComponentSDKModel(sdk);
