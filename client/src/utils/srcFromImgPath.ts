import config from '../client-config.js';

const API_ROOT = `http://${config.api.url}:${config.api.port}`;

export default function (path: string) {
  return path.substr(0, 4) === 'http' || path.substr(0, 11) === 'data:image/' ? path : `${API_ROOT}/${path}`;
}
