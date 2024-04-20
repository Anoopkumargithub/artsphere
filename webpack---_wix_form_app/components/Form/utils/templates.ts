import { FORM_TEMPLATES } from '../../../constants/templates';

export const isTemplateForm = (formId) =>
  Object.values(FORM_TEMPLATES).includes(formId);
