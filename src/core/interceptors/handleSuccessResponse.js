import { bus } from "src/core/common/global-event-bus";

export const handleSuccessResponse = (response) => {
  const notification = {
    message: '',
    icon: 'done',
    color: 'positive'
  }

  const message = response?.data?.message;
  if (message) {
    notification.message = message;
    bus.emit('notify', notification);
  }

  // Retorna la respuesta completa si no hay datos específicos
  return response.data.data;
};
