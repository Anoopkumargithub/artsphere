import { type IWidgetControllerConfig } from '@wix/native-components-infra';
import {
  SUBMISSION_ERROR,
  type SubmissionError,
  resolveSubmissionError,
} from './utils/submission-errors';
import { type FormValues, type FormStep } from '@wix/form-viewer/widget';

export type VeloProps = {
  veloValues?: FormValues;
  veloOnValuesChange?: (newValues: FormValues) => void;
  veloOnSubmit?: () => void;
  veloOnSubmitSuccess?: () => void;
  veloOnSubmitFailure?: (error: unknown) => void;
  veloOnSubmitValidationFailure?: () => void;
  veloIsSubmitPending?: boolean;
  veloCurrentStepId?: string;
  veloOnCurrentStepIdChange?: (stepId: string) => void;
};

type OnSubmitCallback = (values: FormValues) => void;
type OnSubmitSuccessCallback = () => void;
type OnSubmitFailureCallback = (error: SubmissionError) => void;
type OnFieldValueChangeCallback = (newValues: FormValues) => void;
type OnStepNumberChangeCallback = (currentStepNumber: number) => void;

type VeloCallbacks = {
  onFieldValueChange?: OnFieldValueChangeCallback;
  onSubmit?: OnSubmitCallback;
  onSubmitSuccess?: OnSubmitSuccessCallback;
  onSubmitFailure?: OnSubmitFailureCallback;
  onStepNumberChange?: OnStepNumberChangeCallback;
};

type SubmitPromiseResolve = (values: FormValues) => void;
type SubmitPromiseReject = (reason: SubmissionError) => void;

export type VeloState = {
  steps: FormStep[];
  formValues: FormValues;
  currentStepId?: string;
  veloIsSubmitPending: boolean;
  veloSubmitPromiseCallbacks: {
    resolve?: SubmitPromiseResolve;
    reject?: SubmitPromiseReject;
  };
};

export const initVeloState = (controllerConfig: IWidgetControllerConfig) => {
  const state: VeloState = {
    steps: [],
    formValues: {},
    veloIsSubmitPending: false,
    veloSubmitPromiseCallbacks: {},
  };

  const veloSetValues = (values: FormValues) => {
    state.formValues = values;
  };

  const veloSetSteps = (steps: FormStep[]) => {
    state.steps = steps;
  };

  const veloSetCurrentStepId = (stepId: string) => {
    state.currentStepId = stepId;

    controllerConfig.setProps({
      veloCurrentStepId: stepId,
    });
  };

  const veloSetIsSubmitPending = (veloIsSubmitPending: boolean) => {
    state.veloIsSubmitPending = veloIsSubmitPending;

    controllerConfig.setProps({
      veloIsSubmitPending,
    });
  };

  const veloSetSubmitPromiseCallbacks = (
    resolve?: SubmitPromiseResolve,
    reject?: SubmitPromiseReject,
  ) => {
    state.veloSubmitPromiseCallbacks.resolve = resolve;
    state.veloSubmitPromiseCallbacks.reject = reject;
  };

  return {
    state,
    veloSetSteps,
    veloSetCurrentStepId,
    veloSetValues,
    veloSetIsSubmitPending,
    veloSetSubmitPromiseCallbacks,
  };
};

export const createVeloApi = (controllerConfig: IWidgetControllerConfig) => {
  const veloCallbacks: VeloCallbacks = {};
  const {
    state,
    veloSetSteps,
    veloSetValues,
    veloSetSubmitPromiseCallbacks,
    veloSetIsSubmitPending,
    veloSetCurrentStepId,
  } = initVeloState(controllerConfig);

  const getStepNumberById = (stepId: string) => {
    const currentStepIndex = state.steps.findIndex(
      (step) => step.id === stepId,
    );
    return currentStepIndex !== -1 ? currentStepIndex + 1 : undefined;
  };

  const resetSubmitPromise = () => veloSetSubmitPromiseCallbacks();

  return {
    veloSetSteps: (steps: FormStep[]) => {
      if (!steps.length) {
        return;
      }

      veloSetSteps(steps);

      const isOldStepId = !steps.some(
        (step) => step.id === state.currentStepId,
      );

      if (state.currentStepId === undefined || isOldStepId) {
        veloSetCurrentStepId(steps[0]?.id);
      }
    },
    veloProps: {
      veloOnCurrentStepIdChange: (stepId: string) => {
        const currentStepNumber = getStepNumberById(stepId);
        if (currentStepNumber === undefined) {
          return;
        }

        veloSetCurrentStepId(stepId);
        veloCallbacks.onStepNumberChange?.(currentStepNumber);
      },
      veloOnValuesChange: (newValues: FormValues) => {
        veloSetValues(newValues);
        veloCallbacks.onFieldValueChange?.(newValues);
      },
      veloOnSubmit: () => {
        veloCallbacks.onSubmit?.(state.formValues);
      },
      veloOnSubmitSuccess: () => {
        veloCallbacks.onSubmitSuccess?.();
        veloSetIsSubmitPending(false);
        state.veloSubmitPromiseCallbacks.resolve?.(state.formValues);
        resetSubmitPromise();
      },
      veloOnSubmitFailure: (error: unknown) => {
        const submissionError = resolveSubmissionError(error);
        veloCallbacks.onSubmitFailure?.(submissionError);
        veloSetIsSubmitPending(false);
        state.veloSubmitPromiseCallbacks.reject?.(submissionError);
        resetSubmitPromise();
      },
      veloOnSubmitValidationFailure: () => {
        veloSetIsSubmitPending(false);
        state.veloSubmitPromiseCallbacks.reject?.(
          SUBMISSION_ERROR.VALIDATION_FAILED,
        );
        resetSubmitPromise();
      },
    },
    veloApi: {
      getFieldValues: () => state.formValues,
      setFieldValues: (values: FormValues) => {
        const updatedValues = { ...state.formValues, ...values };
        veloSetValues(updatedValues);

        controllerConfig.setProps({
          veloValues: updatedValues,
        });
      },
      onFieldValueChange: (callback: OnFieldValueChangeCallback) => {
        veloCallbacks.onFieldValueChange = callback;
        return () => {
          veloCallbacks.onFieldValueChange = undefined;
        };
      },
      onSubmit: (callback: OnSubmitCallback) => {
        veloCallbacks.onSubmit = callback;
        return () => {
          veloCallbacks.onSubmit = undefined;
        };
      },
      onSubmitSuccess: (callback: OnSubmitSuccessCallback) => {
        veloCallbacks.onSubmitSuccess = callback;
        return () => {
          veloCallbacks.onSubmitSuccess = undefined;
        };
      },
      onSubmitFailure: (callback: OnSubmitFailureCallback) => {
        veloCallbacks.onSubmitFailure = callback;
        return () => {
          veloCallbacks.onSubmitFailure = undefined;
        };
      },
      submit: () => {
        veloSetIsSubmitPending(true);

        return new Promise<FormValues>(veloSetSubmitPromiseCallbacks);
      },
      getStepCount: () => state.steps.length,
      getStepNumber: () => getStepNumberById(state.currentStepId),
      navigateToStep: (stepNumber: number) => {
        const currentStepId = state.steps[stepNumber - 1]?.id;

        if (currentStepId && currentStepId !== state.currentStepId) {
          veloSetCurrentStepId(currentStepId);
          veloCallbacks.onStepNumberChange?.(stepNumber);
        }
      },
      onStepNumberChange: (callback: OnStepNumberChangeCallback) => {
        veloCallbacks.onStepNumberChange = callback;
        return () => {
          veloCallbacks.onStepNumberChange = undefined;
        };
      },
    },
  };
};
