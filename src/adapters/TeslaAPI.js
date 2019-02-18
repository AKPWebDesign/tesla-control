import axios from 'axios';
import uuid from 'uuid/v4';

const TESLA_CLIENT_ID = '81527cff06843c8634fdc09e8ac0abefb46ac849f38fe1e431c2ef2106796384';
const TESLA_CLIENT_SECRET = 'c7257eb71a564034f9419ee651c7d0e5f7aa6bfbd18bafb5c5c033b093bb2fa3';

const teslaApiClient = axios.create({
  baseURL: 'https://cors.akp.tools/https://owner-api.teslamotors.com',
  headers: {
    'User-Agent': 'TeslaControl (teslacontrol@akpwebdesign.com)',
  }
})

class TeslaAPI {
  constructor() {
    this.subscribers = {};
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
        password: password,
      },
    })
      .then(({ data }) => {
        this.notifySubscribers(true, data);
        return data;
      })
      .catch(e => {
        this.notifySubscribers(false);
        console.log('login error :(');
        console.error(e);
      });
  }

  logout() {
    this.notifySubscribers(false, null);
  }

  notifySubscribers(isLoggedIn, data = {}) {
    Object.values(this.subscribers).forEach(_ => _(isLoggedIn, data));
  }

  subscribeToAuthChanges(subscriber) {
    const id = uuid();

    this.subscribers[id] = subscriber;

    return () => {
      delete this.subscribers[id];
    }
  }

  authCall(auth, config) {
    if (!auth) return Promise.resolve(null);
    config.headers = {
      'Authorization': `Bearer ${auth}`,
    };

    return teslaApiClient(config).then(({ data }) => data.response);
  }

  getVehicles(auth) {
    return this.authCall(auth, {
      url: '/api/1/vehicles',
    });
  }

  getVehicleData(auth, id) {
    return this.authCall(auth, {
      url: `/api/1/vehicles/${id}/vehicle_data`,
    })
  }
}

const TeslaAPIInstance = new TeslaAPI();

export default TeslaAPIInstance;
