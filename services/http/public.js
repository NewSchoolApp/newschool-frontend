import { http } from './config';
import utils from '~/utils/index';

export default {
    pageCertificate: (idUser, idCourse) => {
      return utils.getExternalCredentials().then(res => {
        return http.get(`${process.env.endpointCertificateCourseTaken.CERTIFICATES_COURSE_TAKEN_ME}${idUser}/course/${idCourse}`, {
          headers: { Authorization: `Bearer ${res.data.accessToken}` }
        });
      });
    },
}