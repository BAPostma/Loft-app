import * as aws from './Cloud';
import { Authentication } from './clients/Authentication';
import { BrowserStorage } from './clients/BrowserStorage';
import { Database } from './clients/Database';
import { Queueing } from './clients/Queueing';
import { Stats } from './services/Stats';

import App from './components/App.svelte';

const app = new App({
  target: document.body,
  props: {
    name: 'Loft',
  },
});

export default app;

(async () => {
    aws.ConfigureSDK();
    
    await Authentication.signIn("", "");
    const credentials = await Authentication.AwsCredentials();

    const settings = BrowserStorage.getSettings();

    let db = new Database(credentials, settings.tableName);
    let queue = new Queueing(credentials, `${settings.queuePrefix}${settings.instanceName}`);

    let stats = new Stats(db, queue);
    let totalEmail = await stats.emailsReceived();
    console.log(totalEmail);
    
    let qDepths = await stats.queueDepths();
    console.log(qDepths);
    
    await Authentication.signOut();
})();
