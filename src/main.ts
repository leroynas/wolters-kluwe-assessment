import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';

import App from './App.vue';
import Button from './components/Button.vue';
import Modal from './components/Modal.vue';
import nl from './locales/nl.json';

const app = createApp(App);
const i18n = createI18n({
  locale: 'nl',
  messages: { nl },
});

app.use(i18n);

app.component('app-button', Button);
app.component('app-modal', Modal);

app.mount('#app');
