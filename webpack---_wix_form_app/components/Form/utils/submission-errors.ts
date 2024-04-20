export type SubmissionError = { code: SUBMISSION_ERROR_CODE; message: string };

enum HTTP_ERROR_CODE {
  INVALID_ARGUMENT = 400,
  UNAUTHENTICATED = 401,
  PERMISSION_DENIED = 403,
  NOT_FOUND = 404,
  ALREADY_EXISTS = 409,
  FAILED_PRECONDITION = 428,
  RESOURCE_EXAUSTED = 429,
  INTERNAL = 500,
  UNAVAILABLE = 503,
}

enum SUBMISSION_ERROR_CODE {
  INVALID_CAPTCHA = 'INVALID_CAPTCHA',
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  SERVER_UNAVAILABLE = 'SERVER_UNAVAILABLE',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export const SUBMISSION_ERROR = {
  [SUBMISSION_ERROR_CODE.INVALID_CAPTCHA]: {
    code: SUBMISSION_ERROR_CODE.INVALID_CAPTCHA,
    message: 'Invalid captcha.',
  },
  [SUBMISSION_ERROR_CODE.VALIDATION_FAILED]: {
    code: SUBMISSION_ERROR_CODE.VALIDATION_FAILED,
    message: "Validation failed: submission doesn't satisfy form requirements.",
  },
  [SUBMISSION_ERROR_CODE.SERVER_UNAVAILABLE]: {
    code: SUBMISSION_ERROR_CODE.SERVER_UNAVAILABLE,
    message: 'Server is currently unavailable.',
  },
  [SUBMISSION_ERROR_CODE.UNKNOWN_ERROR]: {
    code: SUBMISSION_ERROR_CODE.UNKNOWN_ERROR,
    message: 'An unknown error occurred.',
  },
};

export const isValidationError = (response) => {
  return Boolean(response.data?.details?.validationError);
};

export const isInvalidCaptchaError = (response) => {
  const applicationErrorCode = response.data?.details?.applicationError?.code;
  return applicationErrorCode === SUBMISSION_ERROR_CODE.INVALID_CAPTCHA;
};

export const isServerError = (response) => {
  return (
    response.status === HTTP_ERROR_CODE.UNAVAILABLE ||
    response.status === HTTP_ERROR_CODE.INTERNAL
  );
};

export const resolveSubmissionError = (error) => {
  const response = error.response;

  if (!response) {
    return SUBMISSION_ERROR.UNKNOWN_ERROR;
  }

  if (isInvalidCaptchaError(response)) {
    return SUBMISSION_ERROR.INVALID_CAPTCHA;
  } else if (isValidationError(response)) {
    return SUBMISSION_ERROR.VALIDATION_FAILED;
  } else if (isServerError(response)) {
    return SUBMISSION_ERROR.SERVER_UNAVAILABLE;
  }
  return SUBMISSION_ERROR.UNKNOWN_ERROR;
};
