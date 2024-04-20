import {
  StyleParamType,
  createStylesParams,
  type ISettingsColor,
  wixFontParam,
  wixColorParam,
  createStylesParam,
} from '@wix/tpa-settings';
import { InputBorderStyle, ButtonStyle } from '../../constants/settings';

export type IStylesParams = {
  // LAYOUT
  horizontalPadding: StyleParamType.Number;
  verticalPadding: StyleParamType.Number;
  rowSpacing: StyleParamType.Number;
  columnSpacing: StyleParamType.Number;

  // FORM BACKGROUND
  formBackground: StyleParamType.Color;
  borderColor: StyleParamType.Color;
  borderWidth: StyleParamType.Number;
  borderRadius: StyleParamType.Number;
  enableShadow: StyleParamType.Boolean;
  shadowAngle: StyleParamType.Number;
  shadowDistance: StyleParamType.Number;
  shadowSize: StyleParamType.Number;
  shadowBlur: StyleParamType.Number;
  shadowColor: StyleParamType.Color;

  // BUTTONS
  buttonsStyle: StyleParamType.Number;
  buttonsColor: StyleParamType.Color;
  buttonsColorHover: StyleParamType.Color;
  buttonsBackgroundColor: StyleParamType.Color;
  buttonsBackgroundColorHover: StyleParamType.Color;
  buttonsBorderColor: StyleParamType.Color;
  buttonsBorderWidth: StyleParamType.Number;
  buttonsBorderRadius: StyleParamType.Number;

  // SUBMIT BUTTON
  submitButtonStyle: StyleParamType.Number;
  submitButtonFont: StyleParamType.Font;
  submitButtonColor: StyleParamType.Color;
  submitButtonColorHover: StyleParamType.Color;
  submitButtonBackgroundColor: StyleParamType.Color;
  submitButtonBackgroundColorHover: StyleParamType.Color;
  submitButtonBorderColor: StyleParamType.Color;
  submitButtonBorderColorHover: StyleParamType.Color;
  submitButtonBorderWidth: StyleParamType.Number;
  submitButtonBorderRadius: StyleParamType.Number;

  // PREVIOUS BUTTON
  previousButtonStyle: StyleParamType.Number;
  previousButtonFont: StyleParamType.Font;
  previousButtonColor: StyleParamType.Color;
  previousButtonColorHover: StyleParamType.Color;
  previousButtonBackgroundColor: StyleParamType.Color;
  previousButtonBackgroundColorHover: StyleParamType.Color;
  previousButtonBorderColor: StyleParamType.Color;
  previousButtonBorderColorHover: StyleParamType.Color;
  previousButtonBorderWidth: StyleParamType.Number;
  previousButtonBorderRadius: StyleParamType.Number;

  // NEXT BUTTON
  nextButtonStyle: StyleParamType.Number;
  nextButtonFont: StyleParamType.Font;
  nextButtonColor: StyleParamType.Color;
  nextButtonColorHover: StyleParamType.Color;
  nextButtonBackgroundColor: StyleParamType.Color;
  nextButtonBackgroundColorHover: StyleParamType.Color;
  nextButtonBorderColor: StyleParamType.Color;
  nextButtonBorderColorHover: StyleParamType.Color;
  nextButtonBorderWidth: StyleParamType.Number;
  nextButtonBorderRadius: StyleParamType.Number;

  // TEXTS
  headerOneFont: StyleParamType.Font;
  headerOneColor: StyleParamType.Color;
  headerTwoFont: StyleParamType.Font;
  headerTwoColor: StyleParamType.Color;
  paragraphFont: StyleParamType.Font;
  paragraphColor: StyleParamType.Color;

  // INPUT FIELDS
  inputBackgroundColor: StyleParamType.Color;
  inputBackgroundColorHover: StyleParamType.Color;
  inputBorderStyle: StyleParamType.Number;
  inputBorderColor: StyleParamType.Color;
  inputBorderColorHover: StyleParamType.Color;
  inputBorderWidth: StyleParamType.Number;
  inputBorderRadius: StyleParamType.Number;
  inputLabelFont: StyleParamType.Font;
  inputLabelColor: StyleParamType.Color;
  inputValueFont: StyleParamType.Font;
  inputValueColor: StyleParamType.Color;
  inputNoteFont: StyleParamType.Font;
  inputNoteColor: StyleParamType.Color;
  inputPlaceholderColor: StyleParamType.Color;
  inputSelectionColor: StyleParamType.Color;
  linkColor: StyleParamType.Color;
  inputErrorColor: StyleParamType.Color;
};

interface CustomColorParams {
  value: string;
  opacity?: number;
}

const customColor = ({
  value,
  opacity = 1,
}: CustomColorParams): ISettingsColor => ({
  value,
  name: null,
  opacity,
});

const inputBorderColor = createStylesParam('inputBorderColor', {
  type: StyleParamType.Color,
  getDefaultValue: wixColorParam('color-5'),
});

const inputBorderStyle = createStylesParam('inputBorderStyle', {
  type: StyleParamType.Number,
  getDefaultValue: () => InputBorderStyle.AllSides,
});

const inputBackgroundColor = createStylesParam('inputBackgroundColor', {
  type: StyleParamType.Color,
  getDefaultValue: wixColorParam('color-1'),
});

const inputBorderWidth = createStylesParam('inputBorderWidth', {
  type: StyleParamType.Number,
  getDefaultValue: () => 1,
});

export default createStylesParams<IStylesParams>({
  // LAYOUT
  horizontalPadding: {
    type: StyleParamType.Number,
    getDefaultValue: () => 0,
  },
  verticalPadding: {
    type: StyleParamType.Number,
    getDefaultValue: () => 0,
  },
  rowSpacing: {
    type: StyleParamType.Number,
    getDefaultValue: () => 24,
  },
  columnSpacing: {
    type: StyleParamType.Number,
    getDefaultValue: () => 24,
  },

  // FORM BACKGROUND
  formBackground: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-1'),
  },
  borderColor: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-5', 0),
  },
  borderWidth: {
    type: StyleParamType.Number,
    getDefaultValue: () => 0,
  },
  borderRadius: {
    type: StyleParamType.Number,
    getDefaultValue: () => 0,
  },
  enableShadow: {
    type: StyleParamType.Boolean,
    getDefaultValue: () => false,
  },
  shadowAngle: {
    type: StyleParamType.Number,
    getDefaultValue: () => 135,
  },
  shadowDistance: {
    type: StyleParamType.Number,
    getDefaultValue: () => 0,
  },
  shadowSize: {
    type: StyleParamType.Number,
    getDefaultValue: () => 0,
  },
  shadowBlur: {
    type: StyleParamType.Number,
    getDefaultValue: () => 25,
  },
  shadowColor: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-5', 0.15),
  },

  // BUTTONS
  buttonsStyle: {
    type: StyleParamType.Number,
    getDefaultValue: () => ButtonStyle.RectangleFilled,
  },
  buttonsColor: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-1'),
  },
  buttonsBackgroundColor: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-8'),
  },
  buttonsBorderColor: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-1', 0),
  },
  buttonsBorderWidth: {
    type: StyleParamType.Number,
    getDefaultValue: () => 0,
  },
  buttonsBorderRadius: {
    type: StyleParamType.Number,
    getDefaultValue: () => 0,
  },
  buttonsColorHover: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-1'),
  },
  buttonsBackgroundColorHover: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-8', 0.7),
  },

  // SUBMIT BUTTON
  submitButtonStyle: {
    type: StyleParamType.Number,
    getDefaultValue: () => ButtonStyle.RectangleFilled,
  },
  submitButtonFont: {
    type: StyleParamType.Font,
    getDefaultValue: wixFontParam('Body-M', { size: 16 }),
  },
  submitButtonColor: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-1'),
  },
  submitButtonBackgroundColor: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-8'),
  },
  submitButtonBorderColor: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-1', 0),
  },
  submitButtonBorderWidth: {
    type: StyleParamType.Number,
    getDefaultValue: () => 0,
  },
  submitButtonBorderRadius: {
    type: StyleParamType.Number,
    getDefaultValue: () => 0,
  },
  submitButtonColorHover: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-1'),
  },
  submitButtonBackgroundColorHover: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-8', 0.7),
  },
  submitButtonBorderColorHover: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-1', 0),
  },

  // NEXT BUTTON
  nextButtonStyle: {
    type: StyleParamType.Number,
    getDefaultValue: () => ButtonStyle.RectangleFilled,
  },
  nextButtonFont: {
    type: StyleParamType.Font,
    getDefaultValue: wixFontParam('Body-M', { size: 16 }),
  },
  nextButtonColor: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-1'),
  },
  nextButtonBackgroundColor: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-8'),
  },
  nextButtonBorderColor: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-1', 0),
  },
  nextButtonBorderWidth: {
    type: StyleParamType.Number,
    getDefaultValue: () => 0,
  },
  nextButtonBorderRadius: {
    type: StyleParamType.Number,
    getDefaultValue: () => 0,
  },
  nextButtonColorHover: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-1'),
  },
  nextButtonBackgroundColorHover: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-8', 0.7),
  },
  nextButtonBorderColorHover: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-1', 0),
  },

  // PREVIOUS BUTTON
  previousButtonStyle: {
    type: StyleParamType.Number,
    getDefaultValue: () => ButtonStyle.RectangleFilled,
  },
  previousButtonFont: {
    type: StyleParamType.Font,
    getDefaultValue: wixFontParam('Body-M', { size: 16 }),
  },
  previousButtonColor: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-5'),
  },
  previousButtonBackgroundColor: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-8', 0),
  },
  previousButtonBorderColor: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-5'),
  },
  previousButtonBorderWidth: {
    type: StyleParamType.Number,
    getDefaultValue: () => 1,
  },
  previousButtonBorderRadius: {
    type: StyleParamType.Number,
    getDefaultValue: () => 0,
  },
  previousButtonColorHover: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-1'),
  },
  previousButtonBackgroundColorHover: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-8', 0.7),
  },
  previousButtonBorderColorHover: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-1', 0),
  },

  // TEXTS
  headerOneFont: {
    type: StyleParamType.Font,
    getDefaultValue: wixFontParam('Heading-M'),
  },
  headerOneColor: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-5'),
  },
  headerTwoFont: {
    type: StyleParamType.Font,
    getDefaultValue: wixFontParam('Heading-S'),
  },
  headerTwoColor: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-5'),
  },
  paragraphFont: {
    type: StyleParamType.Font,
    getDefaultValue: wixFontParam('Body-M'),
  },
  paragraphColor: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-5'),
  },

  // INPUT FIELDS
  inputBackgroundColor,
  inputBackgroundColorHover: {
    type: StyleParamType.Color,
    getDefaultValue: ({ getStyleParamValue }) =>
      getStyleParamValue(inputBackgroundColor),
  },
  inputBorderStyle,
  inputBorderColor,
  inputBorderColorHover: {
    type: StyleParamType.Color,
    getDefaultValue: ({ getStyleParamValue }) =>
      getStyleParamValue(inputBorderColor),
  },
  inputBorderWidth,
  inputBorderRadius: {
    type: StyleParamType.Number,
    getDefaultValue: () => 0,
  },
  inputLabelFont: {
    type: StyleParamType.Font,
    getDefaultValue: wixFontParam('Body-M', { size: 14 }),
  },
  inputLabelColor: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-5'),
  },
  inputValueFont: {
    type: StyleParamType.Font,
    getDefaultValue: wixFontParam('Body-L', { size: 16 }),
  },
  inputValueColor: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-5'),
  },
  inputNoteFont: {
    type: StyleParamType.Font,
    getDefaultValue: wixFontParam('Body-M', { size: 14 }),
  },
  inputNoteColor: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-5'),
  },
  inputPlaceholderColor: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-4'),
  },
  inputSelectionColor: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-8'),
  },
  linkColor: {
    type: StyleParamType.Color,
    getDefaultValue: wixColorParam('color-8'),
  },
  inputErrorColor: {
    type: StyleParamType.Color,
    getDefaultValue: () => customColor({ value: '#df3131' }),
  },
});
