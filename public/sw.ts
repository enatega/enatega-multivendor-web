/// <reference lib="webworker" />

import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { ExpirationPlugin } from 'workbox-expiration';

/* eslint-env serviceworker */
declare const self: ServiceWorkerGlobalScope;

// 👇 Injected by Workbox at build time
precacheAndRoute(self.__WB_MANIFEST);

// ✅ Background Sync Plugin for GraphQL mutations
const bgSyncPlugin = new BackgroundSyncPlugin('graphql-mutations-queue', {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours
});

// ✅ Cache GraphQL Queries
registerRoute(
  ({ url, request }) =>
    url.pathname.startsWith('/graphql') && request.method === 'POST',
  new NetworkFirst({
    cacheName: 'graphql-cache',
    networkTimeoutSeconds: 3,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60, // 1 hour
      }),
    ],
  }),
  'POST'
);

// ✅ Background Sync for Mutations (usually the same POST path)
registerRoute(
  ({ url, request }) =>
    url.pathname.startsWith('/graphql') && request.method === 'POST',
  new NetworkFirst({
    plugins: [bgSyncPlugin],
  }),
  'POST'
);
