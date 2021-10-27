<script>
    import { BrowserStorage } from "../clients/BrowserStorage";

    const settings = BrowserStorage.getSettings();

    const saveEventHandler = (e) => {
        e.preventDefault();
        BrowserStorage.saveSettings(settings);
    }
</script>

<form class="pure-form pure-form-aligned">
    <fieldset>
        <legend>Loft AWS Settings</legend>
        
        <div class="pure-control-group">
            <label for="instance">Loft instance name</label>
            <input type="text" id="instance" placeholder="e.g. mydomain_com" bind:value={settings.instanceName} />
        </div>
        
        <div class="pure-control-group">
            <label for="region">AWS region</label>
            <input type="text" id="region" placeholder="e.g. aq-central-9" bind:value={settings.region} />
        </div>
        
        <div class="pure-control-group">
            <label for="tableName">DynamoDB table name</label>
            <input type="text" id="tableName" placeholder="e.g. loft-mydomain_com" bind:value={settings.tableName} />
        </div>
        
        <div class="pure-control-group">
            <label for="queuePrefix">SQS queue prefix</label>
            <input type="text" id="queuePrefix" placeholder="e.g. loft-mydomain_com" bind:value={settings.queuePrefix} />
        </div>
        
        <div class="pure-control-group">
            <label for="identityPoolId">Cognito identity pool id</label>
            <input type="text" id="identityPoolId" placeholder="e.g. aq-central-9:a0b1c2..." bind:value={settings.identityPoolId} />
        </div>
        
        <div class="pure-control-group">
            <label for="userPoolId">Cognito user pool id</label>
            <input type="text" id="userPoolId" placeholder="e.g. aq-central-9_0a1b2c..." bind:value={settings.userPoolId} />
        </div>
        
        <div class="pure-control-group">
            <label for="userPoolWebClientId">Cognito user pool web client id</label>
            <input type="text" id="userPoolWebClientId" placeholder="e.g. 0foo1bar2baz345..." bind:value={settings.userPoolWebClientId} />
        </div>
        
        <div class="pure-controls">
            <button type="submit" class="pure-button pure-button-primary" on:click={saveEventHandler}>Save</button>
        </div>
    </fieldset>
</form>