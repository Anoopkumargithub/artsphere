import React from 'react';
import {
    getWidgetWrapper
} from '@wix/yoshi-flow-editor/runtime/esm/WidgetWrapper.js';
import Widget from '/home/builduser/work/87bb39d68fce3c3a/packages/viewer/src/components/Form/Widget/index.tsx';

import {
    withLeanStyles
} from '@wix/native-components-infra';



import {
    initI18n as initI18n
} from '@wix/yoshi-flow-editor/runtime/esm/i18next/init';



const multilingualDisabled = false;


import {
    createExperiments,
    createWidgetExperiments
} from '@wix/yoshi-flow-editor/runtime/esm/experiments';



import {
    I18nextProvider
} from '@wix/yoshi-flow-editor/i18n';


import {
    PureExperimentsProvider
} from '@wix/yoshi-flow-editor';
var ExperimentsProvider = React.Fragment;


import {
    BILoggerProvider
} from '@wix/yoshi-flow-editor/runtime/esm/react/BILogger/BILoggerProvider';

import {
    PanoramaProvider
} from '@wix/yoshi-flow-editor/runtime/esm/react/PanoramaProvider';

import {
    FedopsLoggerProvider
} from '@wix/yoshi-flow-editor/runtime/esm/react/FedopsLoggerProvider';

import {
    HttpProvider
} from '@wix/yoshi-flow-editor';

import {
    TPAComponentsProvider
} from 'wix-ui-tpa';

import {
    BaseUiEnvironmentProviderWrapper
} from '@wix/yoshi-flow-editor/runtime/esm/react/BaseUiEnvironmentProviderWrapper';

var providers = {
    I18nextProvider,
    ExperimentsProvider,
    PureExperimentsProvider,
    BILoggerProvider,
    FedopsLoggerProvider,
    PanoramaProvider,
    HttpProvider,
    TPAComponentsProvider,
    BaseUiEnvironmentProviderWrapper,
}




import * as usersStyleParamsEntry from '/home/builduser/work/87bb39d68fce3c3a/packages/viewer/src/components/Form/stylesParams.ts';
var stylesParamsEntry = usersStyleParamsEntry;
var stylesParams = stylesParamsEntry.default;
var customCssVars = stylesParamsEntry.customCssVars || function() {
    return {}
};



var styleHocConfig = {
    "enabled": true
};

var sentryConfig = {
    DSN: 'https://18d2f96d279149989b95faf0a4b41882@sentry-next.wixpress.com/1784',
    id: '5d1795a2db124a268f1e1bd88f503500',
    projectName: 'form-app',
    teamName: 'forms',
    errorMonitor: true,
};

var translationsConfig = {
    "icuEnabled": true,
    "defaultTranslationsPath": "/home/builduser/work/87bb39d68fce3c3a/packages/viewer/src/assets/locales/messages_en.json",
    "availableLanguages": ["ar", "bg", "ca", "cs", "da", "de", "el", "en", "es", "fi", "fr", "he", "hi", "hr", "hu", "id", "it", "ja", "ko", "lt", "lv", "ms", "nl", "no", "pl", "pt", "ro", "ru", "sk", "sl", "sv", "th", "tl", "tr", "uk", "vi", "zh"]
};

var UserComponent = getWidgetWrapper({
    initI18n,
    withStylesHoc: withLeanStyles,
    createExperiments,
    createWidgetExperiments,
    providers,
}, Widget, {
    multilingualDisabled,
    sentryConfig,
    styleHocConfig,
    translationsConfig,
    stylesParams,
    customCssVars,
    componentId: '371ee199-389c-4a93-849e-e35b8a15b7ca',
    name: 'Form',
    withErrorBoundary: false,
    localeDistPath: 'assets/locales',
});


import {
    hot
} from '@wix/component-hot-loader';
UserComponent = hot(module, UserComponent);


const loadChunks = Widget.loadChunks;

export default {

    loadableReady: process.env.browser ? require("@wix/yoshi-flow-editor/loadable").loadableReady : null,
    chunkLoadingGlobal: process.env.chunkLoadingGlobal,

    component: UserComponent,
    loadChunks
};