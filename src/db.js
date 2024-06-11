import { openDB } from 'idb';

const dbPromise = openDB('image-store', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('images')) {
      db.createObjectStore('images');
    }
  },
});

export const setImage = async (key, val) => {
  const db = await dbPromise;
  await db.put('images', val, key);
};

export const getImage = async (key) => {
  const db = await dbPromise;
  return await db.get('images', key);
};

export const deleteImage = async (key) => {
  const db = await dbPromise;
  await db.delete('images', key);
};
