import { Notify } from 'quasar';

export const handleErrorResponse = (error) => {

  let message = 'Error desconocido';
  let icon = 'user'
  let color = 'negative'

  if (error.response) {
    message = `${error.response.data.detail}`

    switch (error.response.status) {
      case 400:
          icon = ''
          color = 'warning'
        break;
      case 500:
        icon = 'warning'
        break;
      default:
          console.log('shopapi muñaño');
        break;
    }
  } else if (error.request) {
    message = 'El servicio esta fuera de linea'
    icon = 'error'
    color = 'negative'
  } else {
    message = `Error: ${error.message}`
  }

  Notify.create({
    color: color,
    message: message,
    icon: icon
  });

}

