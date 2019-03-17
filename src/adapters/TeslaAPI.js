import axios from 'axios';
import uuid from 'uuid/v4';

const TESLA_CLIENT_ID = '81527cff06843c8634fdc09e8ac0abefb46ac849f38fe1e431c2ef2106796384';
const TESLA_CLIENT_SECRET = 'c7257eb71a564034f9419ee651c7d0e5f7aa6bfbd18bafb5c5c033b093bb2fa3';

const teslaApiClient = axios.create({
  baseURL: 'https://cors.akp.tools/https://owner-api.teslamotors.com',
});

class TeslaAPI {
  constructor() {
    this.subscribers = {};
    this.auth = null;
  }

  login(username, password) {
    return teslaApiClient({
      method: 'post',
      url: '/oauth/token',
      data: {
        grant_type: 'password',
        client_id: TESLA_CLIENT_ID,
        client_secret: TESLA_CLIENT_SECRET,
        email: username,
        password,
      },
    })
      .then(({ data }) => {
        this.notifySubscribers(true, data);
        return data;
      })
      .catch((e) => {
        this.notifySubscribers(false);
        console.log('login error :('); // eslint-disable-line no-console
        console.error(e); // eslint-disable-line no-console
      });
  }

  logout() {
    this.notifySubscribers(false, null);
  }

  setAuth(auth) {
    this.auth = auth;
  }

  notifySubscribers(isLoggedIn, data = {}) {
    Object.values(this.subscribers).forEach(_ => _(isLoggedIn, data));
  }

  subscribeToAuthChanges(subscriber) {
    const id = uuid();

    this.subscribers[id] = subscriber;

    return () => {
      delete this.subscribers[id];
    };
  }

  cancellableAuthenticatedCall(config) {
    if (!this.auth) return Promise.resolve(null);
    const cancelTokenSource = axios.CancelToken.source();

    const authenticatedConfig = {
      cancelToken: cancelTokenSource.token,
      ...config,
      headers: {
        Authorization: `Bearer ${this.auth}`,
      },
    };

    return {
      request: teslaApiClient(authenticatedConfig)
        .then(({ data }) => data.response)
        .catch((e) => {
          if (axios.isCancel(e)) {
            /* no-op */
          } else {
            console.error(e); // eslint-disable-line no-console
          }
        }),
      cancel: (reason = 'cancelled by requestor') => cancelTokenSource.cancel(reason),
    };
  }

  getVehicles() {
    return this.cancellableAuthenticatedCall({
      url: '/api/1/vehicles',
    });
  }

  getVehicle(id) {
    return this.cancellableAuthenticatedCall({
      url: `/api/1/vehicles/${id}`,
    });
  }

  getVehicleData(id) {
    return this.cancellableAuthenticatedCall({
      url: `/api/1/vehicles/${id}/vehicle_data`,
    });
  }

  wakeUp(id) {
    return this.cancellableAuthenticatedCall({
      method: 'post',
      url: `/api/1/vehicles/${id}/wake_up`,
    });
  }
}

const TeslaAPIInstance = new TeslaAPI();

export default TeslaAPIInstance;
