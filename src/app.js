import App from './components/App.svelte';
import * as aws from './Cloud';

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register(new URL("serviceWorker.ts", import.meta.url), { type: "module" }).catch(function(err) {
        console.log(`Service worker registration failed: ${err}`);
    });
}

aws.ConfigureSDK();

const target = document.getElementById("app");
const app = new App({
    target: target,
    props: {
        name: 'Loft',
    },
});

if (module.hot) {
    // Bypass default Svelte behaviour of appending, breaking hot reload.
    // https://github.com/orlov-vo/parcel-transformer-svelte/issues/10#issuecomment-764620003
    module.hot.dispose(() => app.$destroy());
}

export default app;