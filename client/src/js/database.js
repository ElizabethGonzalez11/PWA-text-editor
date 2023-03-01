import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  // First, create a variable, and set it to asyncronously await the opening of the database. Replace the items in all caps
  const dbOpen = await openDB('jate', 1);

  // Now create a variable for the transaction
  const jateTrans = jateDb.transaction('jate', 'readwrite');

  // Now create a variable for the store
  const jateStore = tx.objectStore('jate');

  // Now create a variable named "request" and have it perform the update
  const request = store.put({ id: 1, value: content });

  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};


export const getDb = async () => {
  // You can duplicate the same first lines of code from above, except that the transaction will be 'readonly'
  
  const dbOpen = await openDB('jate', 1);
  const jateTrans = jateDb.transaction('jate', 'readonly');
  const jateStore = tx.objectStore('jate');

  
  const request = store.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');
  
  return result?.value;
};

initdb();