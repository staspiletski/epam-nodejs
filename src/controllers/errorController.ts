import errorService from '../services/errorService';

const errorController = {
  createUnhandledRejectionError() {
    errorService.createUnhandledRejectionError();
  },

  createUncaughtException() {
    errorService.createUncaughtException();
  },
};

export default errorController;
