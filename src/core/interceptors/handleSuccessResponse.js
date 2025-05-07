// import { Notify } from 'quasar';

export const handleSuccessResponse = (response) => {
  // let resp = {
  //   message:'',
  //   data: null,
  // }

  if (response.data) {
    // if(response.data.message){
    //   Notify.create({
    //     message: response.data.message,
    //     type: 'positive',
    //   });
    // }
  }

  // Retorna la respuesta completa si no hay datos específicos
  return response.data.data;
};
