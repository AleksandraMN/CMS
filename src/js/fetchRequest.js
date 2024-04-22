import {getModalError} from './modalError';


const fetchRequest = async (postfix, {
  method = 'get',
  callback,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    };

    if (body) options.body = JSON.stringify(body);
    if (headers) options.headers = headers;

    const response = await fetch(`https://festive-pointy-lantana.glitch.me/api/${postfix}`, options);

    if (response.ok) {
      const data = await response.json();
      if (callback) return callback(null, data);

      return data;
    }

    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  } catch (err) {
    // getModalError();
    return callback(err);
  }
};

export default fetchRequest;
