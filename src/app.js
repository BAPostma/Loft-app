import * as aws from './Cloud';
import { Authentication } from './clients/Authentication';
import { BrowserStorage } from './clients/BrowserStorage';
import { Database } from './clients/Database';
import { Queueing } from './clients/Queueing';
import { Stats } from './services/Stats';

aws.ConfigureSDK();

import App from './components/App.svelte';

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

// (async () => {    
//     await Authentication.signIn("", "");
//     const credentials = await Authentication.AwsCredentials();

//     const settings = BrowserStorage.getSettings();

//     let db = new Database(credentials, settings.tableName);
//     let queue = new Queueing(credentials, `${settings.queuePrefix}${settings.instanceName}`);

//     let stats = new Stats(db, queue);
//     let totalEmail = await stats.emailsReceived();
//     console.log(totalEmail);
    
//     let qDepths = await stats.queueDepths();
//     console.log(qDepths);
    
//     await Authentication.signOut();
// })();
