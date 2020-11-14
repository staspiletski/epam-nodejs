let localStore: any = null;

const getLocalStore = () => {
  if (localStore === null) {
    localStore = require('data-store')({ path: process.cwd() + '/store.json' });
    localStore.set('token', null);
    localStore.save();
    return localStore;
  }

  return localStore;
};

export default getLocalStore;
