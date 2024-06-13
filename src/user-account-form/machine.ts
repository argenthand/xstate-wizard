import {assign, fromPromise, setup} from "xstate";

export const formMachine = setup({
  types: {
    context: {} as {
      firstName: string,
      lastName: string,
      dateOfBirth: Date,
      username: string,
      email: string,
    },
    events: {} as
      | { type: 'START' }
      | { type: 'SAVE.USER', data: {
        firstName: string;
        lastName: string;
        dateOfBirth: Date;
      } }
      | { type: 'SAVE.ACCOUNT', data: {
        username: string;
        email: string;
      } }
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
        email: event.data.email,
      }
    }),
    resetContext: assign(() => {
      return {
        firstName: '',
        lastName: '',
        dateOfBirth: new Date(),
        email: '',
        username: ''
      }
    }),
    showErrorMessage: () => alert('An error occurred. Please try again.'),
  },
  actors: {
    submitUserAccountInfo: fromPromise(async ({input}) => {
      console.log('Submitting user account details', {...input});
      return await Promise.resolve();
    })
  }
}).createMachine({
  id: 'form-machine',
  initial: 'idle',
  context: {
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(),
    username: '',
    email: ''
  },
  states: {
    'idle': {
      on: {
        START: {
          target: 'capturing-user-info'
        }
      }
    },
    'capturing-user-info': {
      on: {
        'SAVE.USER': {
          actions: ['saveUserInfo'],
          target: 'capturing-account-info',
        }
      }
    },
    'capturing-account-info': {
      on: {
        'SAVE.ACCOUNT': {
          actions: ['saveAccountInfo'],
          target: 'submitting'
        }
      }
    },
    'submitting': {
      invoke: {
        id: 'submitting-user-account-info',
        src: 'submitUserAccountInfo',
        input: ({context}) => ({...context}),
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
          target: 'capturing-account-info'
        }
      }
    },
    'complete': {
      type: 'final'
    }
  }
})
