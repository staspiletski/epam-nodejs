import fs from 'fs';

const errorService = {
  async createUnhandledRejectionError() {
    throw new Error('Some error');
  },

  createUncaughtException() {
    fs.readFile('somefile.txt', (err, data) => {
      if (err) throw err;
    });
  },
};

export default errorService;
