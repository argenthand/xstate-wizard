import {assign, fromPromise, setup} from "xstate";

export const formMachine = setup({
  types: {
    context: {} as {
      firstName: string,
      lastName: string,
      dateOfBirth: string,
      username: string,
      email: string
    },
    input: {} as {
      firstName: string,
      lastName: string,
      dateOfBirth: string,
      username: string,
      email: string,
    },
    events: {} as
      | { type: 'START' }
      | { type: 'BACK' }
      | { type: 'RESET' }
      | {
      type: 'SAVE.USER', data: {
        firstName: string;
        lastName: string;
        dateOfBirth: string;
      }
    }
      | {
      type: 'SAVE.ACCOUNT', data: {
        username: string;
        email: string;
      }
    }
      | { type: 'RETRY' }
  },
  actions: {
    saveUserInfo: assign(({context, event}) => {
      if (event.type !== 'SAVE.USER') {
        return context;
      }
      return {
        ...context,
        firstName: event.data.firstName,
        lastName: event.data.lastName,
        dateOfBirth: event.data.dateOfBirth,
      };
    }),
    saveAccountInfo: assign(({context, event}) => {
      if (event.type !== 'SAVE.ACCOUNT') {
        return context;
      }
      return {
        ...context,
        username: event.data.username,
        email: event.data.email
      }
    }),
    resetContext: assign(() => {
      return {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        email: '',
        username: ''
      }
    }),
    showErrorMessage: () => alert('An error occurred. Please try again.'),
    showUsernameError: () => alert('Username is already taken. Please try a different username.'),
  },
  actors: {
    submitUserAccountInfo: fromPromise(async ({input}) => {
      console.log('Submitting user account details', {...input});
      const randomBit = Math.floor(Math.random() * 2);
      return randomBit === 0 ? await Promise.reject() : await Promise.resolve();
    }),
    checkUsernameAvailability: fromPromise(async ({input}: { input: { username: string; } }) => {
      console.log('Checking username availability', input.username);
      if (input.username.toLowerCase() === 'thesilverhand') {
        return await Promise.reject();
      }
      return await Promise.resolve();
    }),
  }
}).createMachine({
  id: 'form-machine',
  initial: 'idle',
  context: {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    username: ''
  },
  states: {
    'idle': {
      on: {
        START: {
          target: 'capturing-account-info'
        }
      }
    },
    'capturing-user-info': {
      on: {
        'SAVE.USER': {
          actions: ['saveUserInfo'],
          target: 'submitting',
        },
        'BACK': {
          target: 'capturing-account-info'
        }
      }
    },
    'capturing-account-info': {
      on: {
        'SAVE.ACCOUNT': {
          actions: ['saveAccountInfo'],
          target: 'checking-username-availability'
        },
        'RESET': {
          target: 'idle',
          actions: ['resetContext']
        }
      }
    },
    'checking-username-availability': {
      invoke: {
        id: 'checking-username-availability',
        src: 'checkUsernameAvailability',
        input: ({context}) => ({username: context.username}),
        onDone: {
          target: 'capturing-user-info'
        },
        onError: {
          actions: ['showUsernameError'],
          target: 'capturing-account-info'
        }
      }
    },
    'submitting': {
      invoke: {
        id: 'submitting-user-account-info',
        src: 'submitUserAccountInfo',
        input: ({context}) => ({
          userDetails: {
            name: `${context.firstName} ${context.lastName}`,
            dateOfBirth: context.dateOfBirth
          },
          accountDetails: {
            username: context.username,
            email: context.email
          }
        }),
        onDone: {
          target: 'complete',
          actions: ['resetContext']
        },
        onError: {
          actions: ['showErrorMessage'],
          target: 'error'
        }
      }
    },
    'error': {
      on: {
        RETRY: {
          target: 'capturing-user-info'
        }
      }
    },
    'complete': {
      type: 'final'
    }
  }
})
