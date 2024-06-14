import {useActorRef} from "@xstate/react";
import {formMachine} from "./machine.ts";
import UserInformation from "./user-information.tsx";
import AccountInformation from "./account-information.tsx";
import {AccountInformationInputs, UserInformationInputs} from "./types";
import {useMachineState} from "./hooks/use.machine.state.ts";
import {useMachineContext} from "./hooks/use.machine.context.ts";

function WizardForm() {
  const actorRef = useActorRef(formMachine);

  const {
    isIdle,
    isCapturingUserInfo,
    isCapturingAccountInfo,
    isComplete,
    isError,
    isSubmitting
  } = useMachineState(actorRef);
  const {
    firstName,
    lastName,
    dateOfBirth,
    username,
    email
  } = useMachineContext(actorRef);

  if (isIdle) {
    return <button onClick={() => actorRef.send({type: 'START'})}>Get Started</button>
  }

  if (isCapturingUserInfo) {
    return <UserInformation saveUserInfo={(data: UserInformationInputs) => {
      actorRef.send({type: 'SAVE.USER', data: {
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth.toISOString().split('T')[0]
      }})
    }} goToAccountInfo={() => {
      actorRef.send({type: 'BACK'})
    }} defaultValues={{
      firstName,
      lastName,
      dateOfBirth: new Date(dateOfBirth)
    }} />
  }

  if (isCapturingAccountInfo) {
    return <AccountInformation saveAccountInfo={(data: AccountInformationInputs) => {
      actorRef.send({type: 'SAVE.ACCOUNT', data})
    }} resetForm={() => {
      actorRef.send({type: 'RESET'})
    }} defaultValues={{
      username,
      email
    }} />
  }

  if (isComplete) {
    return <h4>User details saved successfully!</h4>
  }

  if (isSubmitting) {
    return <h4>Submitting...</h4>
  }

  if (isError) {
    return <button onClick={() => actorRef.send({type: 'RETRY'})}>Retry</button>
  }
}

export default WizardForm;
