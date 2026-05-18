/**
 * PWA Install Handler - EduConnect Prompts PRO
 */
let deferredPrompt = null;
const installBtn = document.getElementById('pwa-install-btn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) {
        installBtn.style.display = 'flex';
        installBtn.addEventListener('click', async () => {
            installBtn.style.display = 'none';
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log('[PWA] Instalación:', outcome);
            deferredPrompt = null;
        });
    }
});

window.addEventListener('appinstalled', () => {
    if (installBtn) installBtn.style.display = 'none';
    deferredPrompt = null;
    console.log('[PWA] App instalada correctamente');
});

// Registrar Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/instalar/sw.js')
            .then(reg => console.log('[SW] Registrado:', reg.scope))
            .catch(err => console.error('[SW] Error:', err));
    });
}