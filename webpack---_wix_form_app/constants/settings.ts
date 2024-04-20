import { type ForcedState } from '@wix/form-viewer';

export enum SettingsEventsKeys {
  ForceView = 'forceView',
}

export interface SettingsEvents {
  [SettingsEventsKeys.ForceView]: ForcedState;
}

export enum InputBorderStyle {
  None = 0,
  AllSides = 1,
  Bottom = 2,
}

export enum ButtonStyle {
  Rectangle = 0,
  RectangleRoundedCorners = 1,
  RectangleFilled = 2,
  RectangleRoundedCornersFilled = 3,
  ABC = 4,
}

export enum Alignment {
  Left = 0,
  Center = 1,
  Right = 2,
}

export enum ButtonTab {
  Regular = 'Regular',
  Hover = 'Hover',
}
