import { Loading, QSpinnerGears } from 'quasar'

let requestCount = 0;

export const showLoading = () => {
  requestCount++;
  console.log('[showLoading] solicitud', requestCount);
  if (requestCount === 1) {
    Loading.show({ spinner: QSpinnerGears });
  }
};

export const hideLoading = () => {
  requestCount = Math.max(0, requestCount - 1);
  console.log('[hideLoading] quedan solicitudes', requestCount);
  if (requestCount === 0) {
    Loading.hide();
  }
};
