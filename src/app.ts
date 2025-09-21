import App from './components/App.svelte';
import * as aws from './Cloud';
import './styles.scss';

if ('serviceWorker' in navigator) {
  const serviceWorker = new URL('./serviceWorker.ts', import.meta.url);
  navigator.serviceWorker.register(serviceWorker, { type: 'module' }).catch(err => {
    console.log(`Service worker registration failed: ${err}`);
  });
}

// Configure AWS Amplify SDK with persisted settings
aws.ConfigureSDK();

const target = document.getElementById('app');
if (!target) {
  throw new Error('Mount element #app not found');
}

const app = new App({
  target,
  props: { }
});

// Handle HMR disposal in dev
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    app.$destroy();
  });
}

export default app;
