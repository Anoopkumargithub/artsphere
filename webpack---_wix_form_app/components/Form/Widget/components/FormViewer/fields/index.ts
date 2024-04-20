import {
  ContactsAddressWUT,
  ContactsCompanyWUT,
  ContactsEmailWUT,
  ContactsFirstNameWUT,
  ContactsLastNameWUT,
  ContactsPhoneWUT,
  ContactsPositionWUT,
  ContactsTaxIdWUT,
  NumberInputWUT,
  SubmitButton,
  TextInputWUT,
  UrlInput,
  type FieldType,
} from '@wix/form-fields';
import loadable from '@wix/yoshi-flow-editor/loadable';
import { type ComponentType } from 'react';

const TextArea = loadable(
  () => import(/* webpackChunkName: "form-app-text-area" */ './text-area'),
);
const FileUpload = loadable(
  () => import(/* webpackChunkName: "form-app-file-upload" */ './file-upload'),
);
const Dropdown = loadable(
  () => import(/* webpackChunkName: "form-app-dropdown" */ './dropdown'),
);
const Signature = loadable(
  () => import(/* webpackChunkName: "form-app-signature" */ './signature'),
);
const Donation = loadable(
  () => import(/* webpackChunkName: "form-app-donation" */ './donation'),
);
const ProductList = loadable(
  () =>
    import(/* webpackChunkName: "form-app-product-list" */ './product-list'),
);
const TimeInput = loadable(
  () => import(/* webpackChunkName: "form-app-time-input" */ './time-input'),
);
const DateTimeInput = loadable(
  () =>
    import(
      /* webpackChunkName: "form-app-date-time-input" */ './date-time-input'
    ),
);
const DateInput = loadable(
  () => import(/* webpackChunkName: "form-app-date-input" */ './date-input'),
);
const RadioGroup = loadable(
  () => import(/* webpackChunkName: "form-app-radio-group" */ './radio-group'),
);
const CheckboxGroup = loadable(
  () =>
    import(
      /* webpackChunkName: "form-app-checkbox-group" */ './checkbox-group'
    ),
);
const Checkbox = loadable(
  () => import(/* webpackChunkName: "form-app-checkbox" */ './checkbox'),
);
const ContactsBirthdate = loadable(
  () =>
    import(
      /* webpackChunkName: "form-app-contacts-birthdate" */ './contacts-birthdate'
    ),
);
const ContactsSubscribe = loadable(
  () =>
    import(
      /* webpackChunkName: "form-app-contacts-subscribe" */ './contacts-subscribe'
    ),
);
const Header = loadable(
  () => import(/* webpackChunkName: "form-app-header" */ './header'),
);
const RichText = loadable(
  () => import(/* webpackChunkName: "form-app-rich-text" */ './rich-text'),
);

const NotUsed = () => null;

export const FORM_FIELDS: { [fieldType in FieldType]: ComponentType<any> } = {
  RICH_TEXT: RichText,
  HEADER: Header,
  CHECKBOX: Checkbox,
  RADIO_GROUP: RadioGroup,
  CHECKBOX_GROUP: CheckboxGroup,
  DATE_INPUT: DateInput,
  DATE_TIME_INPUT: DateTimeInput,
  TIME_INPUT: TimeInput,
  PRODUCT_LIST: ProductList,
  DONATION: Donation,
  SIGNATURE: Signature,
  DROPDOWN: Dropdown,
  FILE_UPLOAD: FileUpload,
  TEXT_AREA: TextArea,
  SUBMIT_BUTTON: SubmitButton,
  URL_INPUT: UrlInput,
  NUMBER_INPUT: NumberInputWUT,
  TEXT_INPUT: TextInputWUT,

  CONTACTS_EMAIL: ContactsEmailWUT,
  CONTACTS_PHONE: ContactsPhoneWUT,
  CONTACTS_COMPANY: ContactsCompanyWUT,
  CONTACTS_POSITION: ContactsPositionWUT,
  CONTACTS_TAX_ID: ContactsTaxIdWUT,
  CONTACTS_FIRST_NAME: ContactsFirstNameWUT,
  CONTACTS_LAST_NAME: ContactsLastNameWUT,
  CONTACTS_ADDRESS: ContactsAddressWUT,
  CONTACTS_BIRTHDATE: ContactsBirthdate,
  CONTACTS_SUBSCRIBE: ContactsSubscribe,

  MULTILINE_ADDRESS: NotUsed,
  NESTED_FORM: NotUsed,

  CONTACTS_DATE_INPUT: NotUsed,
  CONTACTS_NUMBER_INPUT: NotUsed,
  CONTACTS_TEXT_INPUT: NotUsed,
  CONTACTS_URL_INPUT: NotUsed,

  QUIZ_NUMBER: NotUsed,
  QUIZ_SHORT_TEXT: NotUsed,
  QUIZ_LONG_TEXT: NotUsed,
  QUIZ_MULTI_CHOICE: NotUsed,
  QUIZ_SINGLE_CHOICE: NotUsed,
  QUIZ_FILE_UPLOAD: NotUsed,

  FULL_NAME: NotUsed,
  FULL_NAME_FIRST_NAME: NotUsed,
  FULL_NAME_LAST_NAME: NotUsed,
  VAT_ID: NotUsed,

  MLA_COUNTRY: NotUsed,
  MLA_CITY: NotUsed,
  MLA_ADDRESS_LINE: NotUsed,
  MLA_ADDRESS_LINE_2: NotUsed,
  MLA_POSTAL_CODE: NotUsed,
  MLA_SUBDIVISION: NotUsed,
  MLA_STREET_NAME: NotUsed,
  MLA_STREET_NUMBER: NotUsed,
  MLA_APARTMENT: NotUsed,

  DEXT_TEXT_INPUT: NotUsed,
  DEXT_TEXT_AREA: NotUsed,
  DEXT_DROPDOWN: NotUsed,
  DEXT_RADIO_GROUP: NotUsed,
  DEXT_URL_INPUT: NotUsed,
  DEXT_EMAIL: NotUsed,
  DEXT_PHONE: NotUsed,
  DEXT_NUMBER_INPUT: NotUsed,
  DEXT_CHECKBOX: NotUsed,
  DEXT_CHECKBOX_GROUP: NotUsed,

  ECOM_ADDRESS: NotUsed,
  ECOM_FULL_NAME: NotUsed,
  ECOM_PHONE: NotUsed,
  ECOM_COMPANY_NAME: NotUsed,
  ECOM_EMAIL: NotUsed,
  ECOM_CONTACT_DETAILS: NotUsed,
  ECOM_SHIPPING_DETAILS: NotUsed,
  ECOM_ADDITIONAL_INFO: NotUsed,
};
