import { openDB } from 'idb';

const dbPromise = openDB('podcasts-store', 1, {
  upgrade(db) {
    db.createObjectStore('podcasts');
    db.createObjectStore('episodes');
    db.createObjectStore('date');
  },
});

//DATE
export async function getDate(key) {
  return (await dbPromise).get('date', key);
}
export async function setDate(key, val) {
  return (await dbPromise).put('date', val, key);
}

//PODCASTS
export async function getAllPodcasts() {
  return (await dbPromise).getAll('podcasts');
}
export async function setPodcasts(podcastsList) {
  const db = await dbPromise;
  const transaction = db.transaction(["podcasts"], "readwrite");
  return new Promise(resolve => {
    podcastsList.forEach((element, index) => {
      transaction.objectStore("podcasts").put(element, index);
    });
    transaction.oncomplete = () => {
      resolve();
    }
  });
}

//EPISODES
export async function getAllEpisodes() {
  const db = await dbPromise;
  let cursor = await db.transaction(["episodes"], "readwrite").store.openCursor();
  let list = [];
  while(cursor) {
    if (Date.now() - cursor.value.date < 86400000) {
      list.push(cursor.value);
    } else {
      cursor.delete();
    }
    cursor = await cursor.continue();
  }
  return list;
}
export async function getEpisodesById(key) {
  return (await dbPromise).get('episodes', key);
}
export async function setEpisodes(key, val) {
  const objectFunctionLess = JSON.parse(JSON.stringify(val));
  return (await dbPromise).put('episodes', objectFunctionLess, key);
}