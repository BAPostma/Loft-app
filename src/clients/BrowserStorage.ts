export class BrowserStorage {
    private static readonly SETTINGS_KEY = "loft-app-client-settings";

    static getSettings(): ISettings {
        const serialised = window.localStorage.getItem(this.SETTINGS_KEY);
        return JSON.parse(serialised) ?? {};
    }

    static saveSettings(settings: ISettings) {
        const serialised = JSON.stringify(settings);
        window.localStorage.setItem(this.SETTINGS_KEY, serialised);
    }
}

export interface ISettings {
    region: string,
    identityPoolId: string,
    userPoolId: string,
    userPoolWebClientId: string,
    tableName: string,
    queuePrefix: string,
    instanceName: string
}