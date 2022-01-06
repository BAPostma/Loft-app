/// <reference lib="webworker" />
declare var self: ServiceWorkerGlobalScope;

import { manifest, version } from "@parcel/service-worker";

const onInstall = async (ev: ExtendableEvent) => {
    const cache = await caches.open(version);
    await cache.addAll(manifest);
}

const onActivate = async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(key => key !== version && caches.delete(key))); // clean up old caches
}

self.addEventListener("install", onInstall);
self.addEventListener("activate", onActivate);

export default null;