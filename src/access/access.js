export function Access(
  Base
) {
  return class extends Base {
    constructor(...args) {
      super(...args);
    }

    async get(
      url,
      queryParams,
      options,
      silent
    ) {
      try {
        const request = new Request(
          url.concat(AccessMapper.buildQueryParams(queryParams)),
          { headers: options?.headers }
        );

        if (!silent) {
          window.document.dispatchEvent(new CustomEvent('DeferredLoad.Push'));
        }
        const response = await this.performRequest(request);
        const accessResponse = await AccessMapper.mapResponse(response);
        if (!silent) {
          window.document.dispatchEvent(new CustomEvent('DeferredLoad.Remove'));
        }

        return Promise.resolve(accessResponse);
      } catch (error) {
        if (!silent) {
          window.document.dispatchEvent(new CustomEvent('DeferredLoad.Remove'));
        }
        return Promise.reject(error);
      }
    }

    // remember to update the method signature also on AccessPost!
    async post(
      url,
      queryParams,
      payload,
      options,
      silent
    ) {
      try {
        const request = new Request(
          url.concat(AccessMapper.buildQueryParams(queryParams)),
          {
            body: JSON.stringify(payload),
            method: 'POST',
            headers: options?.headers,
          }
        );

        if (!silent) {
          window.document.dispatchEvent(new CustomEvent('DeferredLoad.Push'));
        }
        const response = await this.performRequest(request);
        const accessResponse = await AccessMapper.mapResponse(response);
        if (!silent) {
          window.document.dispatchEvent(new CustomEvent('DeferredLoad.Remove'));
        }

        return Promise.resolve(accessResponse);
      } catch (error) {
        if (!silent) {
          window.document.dispatchEvent(new CustomEvent('DeferredLoad.Remove'));
        }
        return Promise.reject(error);
      }
    }

    performRequest(request) {
      return fetch(request);
    }
  };
}

export class AccessResponse {
  payload;
  status;
  system;
  errors;
}

export class AccessMapper {
  static async mapResponse(response) {
    try {
      const accessResponse = new AccessResponse();

      try {
        const body = await response.text();
        try {
          const parsedJson = JSON.parse(body);
          accessResponse.payload = parsedJson;
        } catch (e) {
          accessResponse.payload = body;
        }
      } catch (e) {
        console.warn('No body');
      }

      accessResponse.status = response.status;
      accessResponse.system = this.getResponseSystem(response);

      return Promise.resolve(accessResponse);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static buildQueryParams(
    queryParams = {},
    prependQuestionMark = true
  ) {
    if (Object.keys(queryParams).length) {
      const queryString = Object.keys(queryParams)
        .map(key => {
          let value = queryParams[key];
          if (value == null) {
            value = '';
          }
          return encodeURIComponent(key) + '=' + encodeURIComponent(value);
        })
        .join('&');

      if (queryString.length && prependQuestionMark) {
        return '?' + queryString;
      }

      return queryString;
    }

    return '';
  }
}