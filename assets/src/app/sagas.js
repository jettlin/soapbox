import { sagas as loginSagas } from '../features/login/sagas';
import { sagas as videoSagas } from '../features/videos/sagas';

const sagas = {
  ...loginSagas,
  ...videoSagas,
};

export const registerWithMiddleware = (middleware) => {
  for (let name in sagas) {
    middleware.run(sagas[name]);
  }
};
