/**
 * Base API Client Interface
 * Both web and mobile should implement or wrap their clients to match this structure.
 */

export class BaseClient {
  constructor(config) {
    this.baseURL = config.baseURL;
    this.storage = config.storage; // { getItem, setItem, removeItem }
    this.onError = config.onError || (() => {});
    this.onSuccess = config.onSuccess || (() => {});
  }

  async request(url, options = {}) {
    const { method = 'GET', body = null, headers = {} } = options;
    
    const token = await this.storage.getItem('access_token');
    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }

      this.onSuccess(data);
      return { data, error: null };
    } catch (error) {
      this.onError(error.message);
      return { data: null, error: error.message };
    }
  }

  get(url, options = {}) {
    return this.request(url, { ...options, method: 'GET' });
  }

  post(url, body, options = {}) {
    return this.request(url, { ...options, method: 'POST', body });
  }

  put(url, body, options = {}) {
    return this.request(url, { ...options, method: 'PUT', body });
  }

  delete(url, options = {}) {
    return this.request(url, { ...options, method: 'DELETE' });
  }
}

/**
 * Adapter to convert a generic request handler into the structure expected by shared API modules.
 * @param {Function} requestHandler - A function that handles (url, method, body, options)
 * @param {Object} defaultOptions - Default options to merge into every request
 */
export const createApiClientAdapter = (requestHandler, defaultOptions = {}) => ({
  get: (url, options) => requestHandler(url, 'GET', null, { ...defaultOptions, ...options }),
  post: (url, body, options) => requestHandler(url, 'POST', body, { ...defaultOptions, ...options }),
  put: (url, body, options) => requestHandler(url, 'PUT', body, { ...defaultOptions, ...options }),
  delete: (url, options) => requestHandler(url, 'DELETE', null, { ...defaultOptions, ...options }),
});
