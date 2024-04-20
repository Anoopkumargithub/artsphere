import { getRestrictions as getRestrictionsRequest } from '@wix/ambassador-forms-v4-restrictions/http';
import { type IHttpClient } from '@wix/yoshi-flow-editor';

export const getRestrictions = async (httpClient: IHttpClient) =>
  httpClient.request(getRestrictionsRequest({})).then((res) => res.data);
