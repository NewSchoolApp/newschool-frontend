import { http } from './config';
import auth from './auth';
import utils from '~/utils/index';

/**
 * @author Leonardo Balsalobre
 *
 * Serviço de alterar dados do usuário
 */

export default {
  update: form => {
    const { accessToken } = auth.getInfoAuth();

    return http.put(`api/v1/user/me`, form, {
      headers: { Authorization: `${accessToken}` },
    });
  },

  updatePass: async (form, userId) => {
    const { accessToken } = auth.getInfoAuth();

    return http.put(`api/v1/user/${userId}/change-password`, form, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
  },
};
