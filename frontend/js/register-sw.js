// navigator is an object that represent for browser and information about it
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then((reg) => console.log('service worker registered', reg))
        .catch((err) => console.log('service worker is not registered', err))
}

const indexedDB = window.indexedDB
if (!indexedDB) {
    console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}
let db = null;

const req = indexedDB.open('todo', Math.random() + 1)

req.onupgradeneeded = async (e) => {
    console.log('init db')
    db = await e.target.result;
    const task = db.createObjectStore('task', {keyPath: 'taskID'})
    task.createIndex('content', 'content')
    task.createIndex('deadline', 'deadline')
    task.createIndex('status', 'status')
    task.createIndex('userID', 'userID')
    task.createIndex('projectID', 'projectID')
    task.createIndex('assignee', 'assignee')

    const project = db.createObjectStore('project', {keyPath: 'projectID'})
    project.createIndex('projectName', 'projectName')

    const project_user = db.createObjectStore('project_user', {keyPath: 'projectID'})
    project_user.createIndex('userID', 'userID')

    const user = db.createObjectStore('user', {keyPath: 'userID'})
    user.createIndex('username', 'username')
    user.createIndex('password', 'password')
    console.log('init db success !')
}

req.onsuccess = (e) => {
    db = e.target.result
    console.log('on success', db)
}

req.onerror = function (e) {
    console.error(e.target.error.message);
}


// let deferredPrompt;
// const downloadButton = document.querySelector('.download-button');
//
// window.addEventListener('beforeinstallprompt', (e) => {
//     // Stash the event so it can be triggered later.
//     deferredPrompt = e;
//     console.log('beforeinstallprompt')
//     // Make the Download App button visible.
//     downloadButton.style.display = 'inline-block';
// });
//
// downloadButton.addEventListener('click', (e) => {
//     deferredPrompt.prompt(); // This will display the Add to Home screen dialog.
//     deferredPrompt.userChoice
//         .then(choiceResult => {
//             if (choiceResult.outcome === 'accepted') {
//                 console.log('User accepted the A2HS prompt');
//             } else {
//                 console.log('User dismissed the A2HS prompt');
//             }
//             deferredPrompt = null;
//         });
// })
