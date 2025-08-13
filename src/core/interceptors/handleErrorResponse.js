import { bus } from 'src/core/common/global-event-bus';

export const handleErrorResponse = (error) => {
  // Valores por defecto de notificación
  const notification = {
    message: 'Error desconocido',
    icon: 'warning',
    color: 'negative'
  };

  if (error.response) {
    notification.message = error.response.data?.detail || 'Error en la respuesta del servidor';

    switch (error.response.status) {
      case 400:
        notification.icon = 'error_outline';
        notification.color = 'warning';
        break;
      case 401:
        notification.icon = 'person';
        if (error.response.data?.title !== 'Authentication error') {
          bus.emit('logout');
        }
        break;
      case 500:
        notification.icon = 'warning';
        notification.color = 'negative';
        break;
      default:
        break;
    }
  } else if (error.request) {
    notification.message = 'El servicio está fuera de línea';
    notification.icon = 'error';
    notification.color = 'negative';
  } else {
    notification.message = `Error: ${error.message}`;
  }

  bus.emit('notify', notification);

  return Promise.reject(error);
};
