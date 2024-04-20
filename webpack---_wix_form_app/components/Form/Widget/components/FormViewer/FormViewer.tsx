import { FIELD_TYPES, type FormHandle } from '@wix/form-viewer';
import {
  FormViewerLean,
  type FormError,
  type FormValues,
  type FormViewerLeanProps,
} from '@wix/form-viewer/lean';
import {
  type WidgetProps,
  useBi,
  useExperiments,
  useTranslation,
} from '@wix/yoshi-flow-editor';
import loadable from '@wix/yoshi-flow-editor/loadable';
import { isEqual } from 'lodash';
import React, {
  type FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { EXPERIMENTS } from '../../../../../constants/experiments';
import { useStyle } from '../../hooks';
import { type ControllerProps } from '../../interfaces';
import { FORM_FIELDS } from './fields';

const FormViewerWithAI = loadable(
  () =>
    import(
      /* webpackChunkName: "form-app-form-viewer-ai" */ '../FormViewerWithAI/FormViewerWithAI'
    ),
);

const WixRicosViewer = loadable(
  () =>
    import(
      /* webpackChunkName: "form-app-wix-ricos-viewer" */ './wix-ricos-viewer'
    ),
);

export const FormViewer: FC<WidgetProps<ControllerProps>> = ({
  veloValues,
  veloOnValuesChange,
  veloOnSubmit,
  veloOnSubmitSuccess,
  veloOnSubmitFailure,
  veloIsSubmitPending,
  veloOnSubmitValidationFailure,
  veloCurrentStepId,
  veloOnCurrentStepIdChange,
  fireSubmitTrackEvent,
  ...props
}) => {
  const translation = useTranslation();
  const { i18n } = useMemo(() => translation, []);
  const [values, setValues] = useState<FormValues>(veloValues);
  const [errors, setErrors] = useState<FormError[]>([]);
  const formViewer = useRef<FormHandle>(null);
  const { style } = useStyle(props.host);
  const { experiments } = useExperiments();
  const bi = useBi();

  const submissionTrackEventEnabled = experiments.enabled(
    EXPERIMENTS.SUBMISSION_TRACK_EVENT,
  );

  const aiAssistantEnabled = experiments.enabled(EXPERIMENTS.AI_ASSISTANT);

  const onValidate = useCallback((_errors: FormError[]) => {
    setErrors(_errors);
  }, []);

  const handleFormValuesChange = (formValues: FormValues) => {
    setValues(formValues);
    veloOnValuesChange?.(formValues);
  };

  const handleSubmitSuccess = () => {
    veloOnSubmitSuccess();

    if (submissionTrackEventEnabled) {
      fireSubmitTrackEvent(values, FIELD_TYPES.CONTACTS_SUBSCRIBE);
    }
  };

  const handleSubmitFailure = (error: unknown) => {
    veloOnSubmitFailure(error);
  };

  useEffect(() => {
    const shouldUseVeloValues =
      veloValues && !isEqual({}, veloValues) && !isEqual(values, veloValues);

    if (shouldUseVeloValues) {
      setValues(veloValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [veloValues]);

  useEffect(() => {
    if (veloIsSubmitPending) {
      const submitForm = async () => {
        const submission = await formViewer.current.submit();

        if (submission === undefined) {
          veloOnSubmitValidationFailure();
        }
      };

      submitForm();
    }
  }, [veloIsSubmitPending, veloOnSubmitValidationFailure]);

  const viewerProps: FormViewerLeanProps & React.RefAttributes<FormHandle> = {
    i18n,
    ref: formViewer,
    bi,
    formId: props.formId,
    stepId: veloCurrentStepId,
    onStepIdChange: veloOnCurrentStepIdChange,
    values,
    errors,
    onValidate,
    onChange: handleFormValuesChange,
    forcedState: [props.forceView].filter(Boolean),
    style,
    fields: FORM_FIELDS,
    WixRicosViewer,
    onSubmit: veloOnSubmit,
    onSubmitSuccess: handleSubmitSuccess,
    onSubmitFailure: handleSubmitFailure,
  };

  if (aiAssistantEnabled) {
    return (
      <FormViewerWithAI
        hostId={props.host.id}
        formViewerProps={viewerProps}
        aiAssistantProps={{
          aiAssistantState: props.aiAssistantState,
          aiAssistantService: props.aiAssistantService,
        }}
      />
    );
  }

  return <FormViewerLean {...viewerProps} />;
};
