import { logResponse } from './HandleResponse';
import NetInfo from '@react-native-community/netinfo';
import Config from './Config';


export const executeGetRequest = async (endpoint: string, token?: string) => {
  try {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      return {
        code: 400,
        error: [{ error: Config.error.error_internet_connection }],
      };
    }
    const res = await fetch(`${Config.server.base_url}/${endpoint}`, {
      method: 'GET',
      headers: getAPIHeader(token),
    });
    logResponse(res);

    if (res.status != 200) {
      return {
        code: res.status,
        error: res.text(),
      };
    }
    const response = await res.json();
    return {
      code: res.status,
      response: response,
    };
  } catch (err) {
    return {
      code: 400,
      error: err + '',
    };
  }
};



const getAPIHeader = (token?: string, isUrlEncoded?: boolean) => {
  return {
    "Access-Control-Allow-Origin": "*",
    Accept: 'application/json',
    'Content-Type': isUrlEncoded
      ? 'application/x-www-form-urlencoded'
      : 'application/json',
    authorization: token ? 'Bearer ' + token : '',

    'X-app-name': 'frontend',
  };
};

const encodeParamsObject = (paramsObject: any) => {
  let formBody = [];
  for (var property in paramsObject) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(paramsObject[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&');
};