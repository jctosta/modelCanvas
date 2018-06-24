import i18next from 'i18next';
import messages from './messages';

console.log(messages.resources);

i18next.init({
  interpolation: {
    escapeValue: false,
  },
  lng: 'pt',
  resources: messages.resources,
});

export default i18next;
