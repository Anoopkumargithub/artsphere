import { createThread } from '@wix/ambassador-forms-assistant-v2-thread/http';
import {
  queryMessages,
  createMessage,
} from '@wix/ambassador-forms-assistant-v2-message/http';
import { type FormValues } from '@wix/form-viewer';
import {
  type Thread,
  type CreateThreadResponse,
} from '@wix/ambassador-forms-assistant-v2-thread/types';
import { type IHttpClient } from '@wix/yoshi-flow-editor';
import {
  type CreateMessageResponse,
  type Message,
  Role,
} from '@wix/ambassador-forms-assistant-v2-message/types';

export interface AIAssistantState {
  formId?: string;
  thread?: Thread;
  messages: Message[];
  formData?: Record<string, any>;
  assistantTyping: boolean;
  apiErrorOcurred?: boolean;
  readyToSubmit?: boolean;
  totalQuestions: number;
  completedQuestions: number;
}

interface CreateAIAssistantServiceProps {
  initialState?: AIAssistantState;
  httpClient: IHttpClient;
  updateFormAssistantStateProp: (state: AIAssistantState) => void;
}

export interface AiAssistantUserInput {
  message: string;
  formValues: FormValues;
}

export interface AIAssistantService {
  submitUserMessage: (userInput: AiAssistantUserInput) => void;
  setFormId: (formId: string) => void;
  initThread: (formData: FormValues) => void;
  clearThread: () => void;
  reloadAfterError: () => void;
}

export function createAIAssistantService(
  props: CreateAIAssistantServiceProps,
): AIAssistantService {
  const { initialState, httpClient } = props || {};
  const defaultInitialState: AIAssistantState = {
    assistantTyping: false,
    messages: [],
    completedQuestions: 0,
    totalQuestions: 0,
  };
  const usedInitialState = initialState || defaultInitialState;
  let state: AIAssistantState = usedInitialState;

  const updateFormAssistantState = (newState: Partial<AIAssistantState>) => {
    const updatedSortedMessages = newState.messages?.sort((m1, m2) => {
      if (!m2.createdDate) {
        return 1;
      }
      return (
        new Date(m2.createdDate).getTime() - new Date(m1.createdDate).getTime()
      );
    });
    state = {
      ...state,
      ...newState,
      ...(updatedSortedMessages ? { messages: updatedSortedMessages } : {}),
    };
    props.updateFormAssistantStateProp(state);
  };

  const clearThread = () => {
    state = { ...usedInitialState, formId: state.formId };
    props.updateFormAssistantStateProp(state);
  };

  const initThread = async (formData: FormValues) => {
    if (state.thread) {
      return;
    }
    updateFormAssistantState({
      assistantTyping: true,
      apiErrorOcurred: false,
    });
    try {
      const createThreadResponse = await httpClient.request(
        createThread({
          thread: { formId: state.formId },
          formData,
        }),
      );

      const responseData = createThreadResponse.data as CreateThreadResponse;
      updateFormAssistantState({
        totalQuestions: responseData.completionStatus?.fieldsTotal || 0,
      });

      if (createThreadResponse.data?.thread?.id) {
        const threadId = createThreadResponse.data.thread.id;
        const messagesResponse = await httpClient.request(
          queryMessages({ threadId }),
        );

        updateFormAssistantState({
          thread: createThreadResponse.data?.thread,
          assistantTyping: false,
          messages: messagesResponse.data?.messages,
        });
      }
    } catch (e) {
      console.error(e);
      updateFormAssistantState({
        assistantTyping: false,
        apiErrorOcurred: true,
      });
    }
  };

  const setFormId = (formId: string) => {
    updateFormAssistantState({ formId });
  };

  const reloadMessages = async () => {
    const messagesResponse = await httpClient.request(
      queryMessages({ threadId: state?.thread?.id }),
    );
    updateFormAssistantState({
      assistantTyping: false,
      messages: messagesResponse.data?.messages,
      formData: messagesResponse.data?.formData || undefined,
    });
  };

  const submitUserMessage = async (
    userInput: AiAssistantUserInput,
  ): Promise<void> => {
    if (state.apiErrorOcurred) {
      await reloadMessages();
    }

    updateFormAssistantState({
      apiErrorOcurred: false,
      assistantTyping: true,
      messages: [
        {
          content: userInput.message,
          role: Role.USER,
          id: 'userMessage-temp',
        },
        ...state.messages,
      ],
    });

    try {
      const createResponse = await httpClient.request(
        createMessage({
          threadId: state.thread?.id,
          message: { content: userInput.message },
          formData: userInput.formValues,
        }),
      );

      const responseData = createResponse.data as CreateMessageResponse;

      updateFormAssistantState({
        readyToSubmit: responseData.isFormComplete,
        totalQuestions: responseData.completionStatus?.fieldsTotal,
        completedQuestions: responseData.completionStatus?.fieldsCompleted || 0,
      });

      await reloadMessages();
    } catch (e) {
      console.error(e);
      updateFormAssistantState({
        assistantTyping: false,
        apiErrorOcurred: true,
      });
    }
  };

  const reloadAfterError = async () => {
    updateFormAssistantState({
      assistantTyping: true,
      apiErrorOcurred: false,
    });
    try {
      await reloadMessages();
    } catch (e) {
      console.error(e);
      updateFormAssistantState({
        assistantTyping: false,
        apiErrorOcurred: true,
      });
    }
  };

  return {
    submitUserMessage,
    reloadAfterError,
    setFormId,
    initThread,
    clearThread,
  };
}
