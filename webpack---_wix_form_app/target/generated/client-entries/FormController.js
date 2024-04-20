import userController from '/home/builduser/work/87bb39d68fce3c3a/packages/viewer/src/components/Form/controller.ts';
import createControllerWrapper from '@wix/yoshi-flow-editor/runtime/esm/pureControllerWrapper.js';


import wrapController from '@wix/yoshi-flow-editor-runtime/internal/viewerScript/ooi';



var createHttpClient = null;



import {
    initI18n as initI18n
} from '@wix/yoshi-flow-editor/runtime/esm/i18next/init';



const multilingualDisabled = false;



var createExperiments = null;
var createWidgetExperiments = null;



var sentryConfig = {
    DSN: 'https://18d2f96d279149989b95faf0a4b41882@sentry-next.wixpress.com/1784',
    id: '5d1795a2db124a268f1e1bd88f503500',
    projectName: 'form-app',
    teamName: 'forms',
    errorMonitor: true,
};

var experimentsConfig = {
    "centralized": true,
    "scopes": []
};

var translationsConfig = {
    "icuEnabled": true,
    "defaultTranslationsPath": "/home/builduser/work/87bb39d68fce3c3a/packages/viewer/src/assets/locales/messages_en.json",
    "availableLanguages": ["ar", "bg", "ca", "cs", "da", "de", "el", "en", "es", "fi", "fr", "he", "hi", "hr", "hu", "id", "it", "ja", "ko", "lt", "lv", "ms", "nl", "no", "pl", "pt", "ro", "ru", "sk", "sl", "sv", "th", "tl", "tr", "uk", "vi", "zh"]
};

var biConfig = {
    "enableUniversalEvents": true
};

var defaultTranslations = {
    "gfpp_editForm": "Edit Form",
    "settings_tab_forms": "Forms",
    "settings_tab_layout": "Layout",
    "settings_tab_design": "Design",
    "settings_tab_support": "Support",
    "settings_layout_sidePadding": "Side padding",
    "settings_layout_topAndBottomPadding": "Top and bottom padding",
    "settings_layout_spacingBetweenRows": "Spacing between rows",
    "settings_layout_spacingBetweenColumns": "Spacing between columns",
    "settings_design_formBackground": "Form Background",
    "settings_design_inputFields": "Form Fields",
    "settings_design_texts": "Header and Paragraph",
    "settings_design_submitButton": "Submit button",
    "settings_design_buttons": "Buttons",
    "settings_back": "Back",
    "settings_fillColorAndOpacity": "Fill color & opacity",
    "settings_borderColorAndOpacity": "Border color & opacity",
    "settings_borderWidth": "Border width",
    "settings_cornerRadius": "Corner radius",
    "settings_enableShadow": "Apply shadow",
    "settings_shadowColorAndOpacity": "Shadow color & opacity",
    "settings_submitButton_regular": "Regular",
    "settings_submitButton_hover": "Hover",
    "settings_buttons_regular": "Regular",
    "settings_buttons_hover": "Hover",
    "settings_fontStyleAndColor": "Font style & color",
    "settings_fontPicker": "Font picker",
    "settings_colorAndOpacity": "Color & opacity",
    "settings_chooseForm": "Choose a form",
    "settings_search": "Search",
    "settings_formNotFound": "No results for “{search}”",
    "settings_createForm": "Create Form",
    "settings_headers": "Headers",
    "settings_headerOneStyleAndColor": "Header 1 style & color",
    "settings_headerTwoStyleAndColor": "Header 2 style & color",
    "settings_paragraphText": "Paragraph text",
    "settings_textStyleAndColor": "Text style & color",
    "settings_support_gotQuestion": "Got a question?",
    "settings_support_technicalProblems": "Technical problems? Troubleshoot common errors and issues.",
    "settings_support_technicalAssist": "Wix Technical Assistant",
    "settings_support_contact": "Still having issues? Contact us for assistance.",
    "settings_support_contactCustomerCare": "Contact Customer Care",
    "settings_support_helpCenter": "Help Center",
    "settings_support_editFormFields": "Edit my form fields",
    "settings_support_customizing": "Customizing my form",
    "settings_support_seeAll": "See All Articles",
    "settings_inputFields": "Form field style",
    "settings_state": "State",
    "settings_state_regular": "Regular",
    "settings_state_focus": "Focus",
    "settings_state_hover": "Hover",
    "settings_state_error": "Error",
    "settings_border_none": "None",
    "settings_border_allSides": "All sides",
    "settings_border_bottom": "Bottom",
    "settings_fieldTitle": "Field title style & color",
    "settings_input": "Input style & color",
    "settings_fieldNote": "Field description style & color",
    "settings_placeholderColor": "Placeholder text color",
    "settings_selectionColor": "Checked option color",
    "settings_linkColor": "Link text color",
    "settings_errorMessage": "Error color",
    "settings_forms_emptyState_title": "Create a form",
    "settings_forms_emptyState_content": "Add a form to get subscribers, capture leads or collect visitor info.",
    "emptyState_title": "Add a form",
    "emptyState_lineOne": "Choose an existing form or create a new one.",
    "emptyState_lineTwo": "Go to Form Settings > Forms tab",
    "settings_angle": "Angle",
    "settings_distance": "Distance",
    "settings_size": "Size",
    "settings_blur": "Blur",
    "settings_manage_title": "Manage forms",
    "settings_manage_description": "Review submissions, create forms and update settings.",
    "settings_manage_manage": "Manage Forms",
    "settings_manage_create": "Create Form",
    "settings_tab_manage": "Manage",
    "settings_formContainerLayout": "Form container",
    "settings_inputFieldLayout": "Form Fields",
    "settings_textAlignment": "Text alignment",
    "settings_topAndBottomPadding": "Top and bottom padding",
    "settings_fieldTitlePadding": "Field title padding",
    "settings_spaceBetweenFieldAndFieldTitle": "Space between field and field title",
    "settings_placeholderPadding": "Placeholder padding",
    "settings_buttonLayout": "Submit Button",
    "settings_resetToOriginalDesign": "Reset to original design",
    "settings_inputStyle": "Input style",
    "settings_inputFieldText": "Form field text",
    "settings_textColor": "Text color",
    "settings_fieldTitleSize": "Field title size",
    "settings_inputTextSize": "Input text size",
    "settings_fieldNoteSize": "Field note size",
    "settings_fontSize": "Font size",
    "settings_headerOneSize": "Header 1 size",
    "settings_headerTwoSize": "Header 2 size",
    "settings_upgrade_title": "Upgrade your plan",
    "settings_upgrade_item1": "Create more forms for your site",
    "settings_upgrade_item2": "Accept file uploads like images and documents",
    "settings_upgrade_item3": "Add interactive rules and pages",
    "settings_upgrade_button": "Upgrade",
    "settings_tab_upgrade": "Upgrade",
    "settings_premium_banner_part1": "To create more forms,",
    "settings_premium_banner_part2": "upgrade your plan.",
    "panels_upgradeModal_title": "You’ve reached your form limit ",
    "panels_upgradeModal_subtitle": "Upgrade to a Premium plan to create more forms, get advanced features and collect more info.",
    "panels_upgradeModal_primaryButton": "Upgrade",
    "panels_upgradeModal_secondaryButton": "Maybe Later",
    "ai_assistant_header_1": "AI ASSIST",
    "ai_assistant_button": "Help me fill out the form",
    "ai_assistant_header_description": "Answer question with AI chat help",
    "ai_assistant_input_placeholder": "Write your answer",
    "ai_assistant_skip_button": "Skip",
    "ai_assistant_skip_message": "Please skip this question",
    "ai_assistant_actions_end": "End chat & continue",
    "ai_assistant_actions_skip": "Skip question",
    "ai_assistant_actions_submit": "Submit",
    "ai_assistant_progress": "Form progress",
    "ai_assistant_multi_choice_submit": "Continue",
    "ai_assistant_error_retry_button": "Retry",
    "ai_assistant_error_message": "Ups. Something went wrong...",
    "settings_forms_error_title": "We couldn't load the form settings",
    "settings_forms_error_subtitle": "There was a technical issue on our end. Refresh and try again.",
    "settings_forms_error_retry": "Refresh",
    "settings_design_buttons_submitButton": "Submit Button",
    "settings_design_buttons_previousButton": "Back Button",
    "settings_design_buttons_nextButton": "Next Button",
    "settings_design_buttons_uploadButton": "Upload Button",
    "settings_design_buttons_fields": "Form field buttons"
};

var fedopsConfig = null;

import {
    createVisitorBILogger as biLogger
} from '/home/builduser/work/87bb39d68fce3c3a/packages/viewer/target/generated/bi/createBILogger.ts';

const controllerOptions = {
    sentryConfig,
    biConfig,
    fedopsConfig,
    experimentsConfig,
    biLogger,
    translationsConfig,
    persistentAcrossPages: false,
    appName: "Form App",
    componentName: "Form",
    appDefinitionId: "225dd912-7dea-4738-8688-4b8c6955ffc2",
    componentId: "371ee199-389c-4a93-849e-e35b8a15b7ca",
    projectName: "form-app",
    defaultTranslations,
    multilingualDisabled,
    shouldUseEssentials: true,
    withErrorBoundary: false,
    localeDistPath: "assets/locales"
};

const _controller = createControllerWrapper(userController, controllerOptions, {
    initI18n,
    createHttpClient,
    createExperiments,
});

export const wrap = wrapController;
export const descriptor = {
    ...controllerOptions,
    id: controllerOptions.componentId,
    widgetType: "WIDGET_OUT_OF_IFRAME",
    controllerFileName: "/home/builduser/work/87bb39d68fce3c3a/packages/viewer/src/components/Form/controller.ts",
};

export const controller = _controller
export default controller;