import { useQuasar } from 'quasar';

export function useConfirmDialog() {
  const $q = useQuasar();

  const confirm = (message, title = 'Confirmar', okLabel = 'Confirmar', cancelLabel = 'Cancelar') => {
    return new Promise((resolve) => {
      $q.dialog({
        title,
        html: true,
        message: `<div class="row items-center q-gutter-x-md non-selectable">
                    <i class="q-icon material-icons notranslate text-warning" style="font-size: 28px;">warning</i>
                    <div class="col">
                      <span>${message}</span>
                    </div>
                  </div>`,
        persistent: true,
        ok: {
          label: okLabel,
          color: 'primary',
          flat: true
        },
        cancel: {
          label: cancelLabel,
          color: 'primary',
          flat: true
        },
        class: 'q-card--flat no-shadow'
      }).onOk(() => {
        resolve(true);
      }).onCancel(() => {
        resolve(false);
      }).onDismiss(() => {
        resolve(false);
      });
    });
  };

  return { confirm };
}
