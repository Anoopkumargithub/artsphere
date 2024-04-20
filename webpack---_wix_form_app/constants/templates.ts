export const FORM_TEMPLATES = {
  contactFormApp: 'dd95e41e-ee00-4bdd-bc37-b1d7ca56330e',
  contactFormAppDesign: 'dd95e41e-ee00-4bdd-bc37-b1d7ca56330e',
  contactFormAppStudioDesign: '77c927f7-e811-4023-a40e-24f83a3fcea6',
  subscribeFormApp: '240c319f-08f5-438b-8782-623c2da2f4ac',
  subscribeFormAppDesign: '240c319f-08f5-438b-8782-623c2da2f4ac',
  orderFormApp: '3f62de45-12c4-418e-b33e-2add84140562',
  orderFormAppDesign: '3f62de45-12c4-418e-b33e-2add84140562',
  contact1: '1b17d5af-21e4-44c4-af0a-16c31b2122c9',
  contact3: 'b06e7fe8-5680-470f-9dd1-9c7398888978',
  contact4: '4c6df2f1-b8cb-4535-8a6b-03ff580b3abd',
  contact5: 'a27e9cba-6a49-4aa6-9962-025945eda282 ',
  order1: 'e9e0278f-f0d4-4b18-b6a6-13b7700ea209',
  order2: '3435056b-08d4-4629-9aaf-d304e92e6272',
  registration1: '4c2fa7e6-09c5-4efd-9a6a-10f9c30ce417',
  registration2: '18a38c6d-f7d1-4c68-891d-df2d784e5cd2',
  registration5: '0031fd77-2f25-4b61-a9b2-a5148751581d',
  application1: '45a39351-cd3f-46a0-9151-347179abc69c',
  application2: 'ac7c771a-a9d7-486a-aa3b-cb2c4ca59256',
  application3: '819c330c-25c2-4fe0-969d-c39bd5a6f76f',
  application4: '77436880-4322-4a69-bf98-d5d97a80936f',
  request1: '8396de95-491c-4f39-9523-cd82df93b0c0',
  request2: '9c96546a-a395-4974-9e6b-184ec1bd67b9',
  waiver1: 'd0259ab0-e751-4faa-8d95-ac1e3f3fdd94',
  waiver2: '764440a5-ee38-4383-976c-14e2ece54349',
  waiver3: 'ba4f5b97-2374-4ef1-97c1-4ab91d29e326',
  waiver4: '62f525f6-97db-4bed-a096-170bc556e753',
  subscribe1: '3fc80642-e464-489a-9da2-83a0b1aee893',
  subscribe2: 'a906c6ba-a792-4948-b758-da11e267d915',
  subscribe5: '844ca151-13f3-4780-91c0-20a16b914110',
  catering1: '1e01e218-b101-4754-b547-6ce9274055f8',
  catering2: '5a2c7fdd-ed2f-4d63-996c-7853cbdb85be',
};

export const FORM_TEMPLATE_NAMES = {
  [FORM_TEMPLATES.contactFormApp]: 'Contact us',
  [FORM_TEMPLATES.contactFormAppDesign]: 'Contact us',
  [FORM_TEMPLATES.contactFormAppStudioDesign]: 'Contact us',
  [FORM_TEMPLATES.subscribeFormApp]: 'Subscribe',
  [FORM_TEMPLATES.subscribeFormAppDesign]: 'Subscribe',
  [FORM_TEMPLATES.orderFormApp]: 'Order form',
  [FORM_TEMPLATES.orderFormAppDesign]: 'Order form',
  [FORM_TEMPLATES.contact1]: 'Contact Form',
  [FORM_TEMPLATES.contact3]: 'Contact Form',
  [FORM_TEMPLATES.contact4]: 'Contact Form',
  [FORM_TEMPLATES.contact5]: 'Contact Form',
  [FORM_TEMPLATES.order1]: 'Order Form',
  [FORM_TEMPLATES.order2]: 'Order Form',
  [FORM_TEMPLATES.registration1]: 'Registration Form',
  [FORM_TEMPLATES.registration2]: 'Registration Form',
  [FORM_TEMPLATES.registration5]: 'Registration Form',
  [FORM_TEMPLATES.application1]: 'Application Form',
  [FORM_TEMPLATES.application2]: 'Application Form',
  [FORM_TEMPLATES.application3]: 'Application Form',
  [FORM_TEMPLATES.application4]: 'Application Form',
  [FORM_TEMPLATES.request1]: 'Request Form',
  [FORM_TEMPLATES.request2]: 'Request Form',
  [FORM_TEMPLATES.waiver1]: 'Waiver Form',
  [FORM_TEMPLATES.waiver2]: 'Waiver Form',
  [FORM_TEMPLATES.waiver3]: 'Waiver Form',
  [FORM_TEMPLATES.waiver4]: 'Waiver Form',
  [FORM_TEMPLATES.subscribe1]: 'Subscribe Form',
  [FORM_TEMPLATES.subscribe2]: 'Subscribe Form',
  [FORM_TEMPLATES.subscribe5]: 'Subscribe Form',
  [FORM_TEMPLATES.catering1]: 'Catering Form',
  [FORM_TEMPLATES.catering2]: 'Catering Form',
};

export enum FormAppPreset {
  Blank = 'blankFormApp',
  Existing = 'existingFormApp',
}

export function isEcomRequiredTemplate(presetId: string) {
  return ['orderFormApp', 'orderFormAppDesign'].includes(presetId);
}
