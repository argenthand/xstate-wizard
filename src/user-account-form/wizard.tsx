import {useMachine} from "@xstate/react";
import {formMachine} from "./machine.ts";
import UserInformation from "./user-information.tsx";
import AccountInformation from "./account-information.tsx";
import {AccountInformationInputs, UserInformationInputs} from "./types";

function WizardForm() {
  const [state, send] = useMachine(formMachine);

  if (state.matches('idle')) {
    return <button onClick={() => send({type: 'START'})}>Get Started</button>
  }

  if (state.matches('capturing-user-info')) {
    return <UserInformation saveUserInfo={(data: UserInformationInputs) => {
      send({type: 'SAVE.USER', data})
    }} />
  }

  if (state.matches('capturing-account-info')) {
    return <AccountInformation saveAccountInfo={(data: AccountInformationInputs) => {
      send({type: 'SAVE.ACCOUNT', data})
    }} />
  }

  if (state.matches('complete')) {
    return <h4>User details saved successfully!</h4>
  }

  if (state.matches('error')) {
    return <button onClick={() => send({type: 'RETRY'})}>Retry</button>
  }
}

export default WizardForm;
