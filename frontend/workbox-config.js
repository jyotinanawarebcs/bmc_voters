// workbox-config.js
module.exports = {
    // Defines where the service worker will be generated
    globDirectory: 'dist/',
    // Defines the file types to precache
    globPatterns: [
        '**/*.{json,html,ico,js,ttf,png}', // Added common asset extensions like ttf and png
    ],
    // Defines the name of the service worker file
    swDest: 'dist/sw.js',
    
    // Optional: Set to true if you want to skip the installation phase
    skipWaiting: true,
    
    // Optional: Set to true if you want to immediately claim control
    clientsClaim: true,
};