self.addEventListener('install', function(e) {
  self.skipWaiting();
});
self.addEventListener('activate', function(e) {
  clients.claim();
});
// Minimal fetch handler to ensure SW is active. Do not cache aggressively here.
self.addEventListener('fetch', function(e) {
  // let the network do its job; this SW only enables PWA installability
});
