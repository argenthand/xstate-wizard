import { useSelector } from "@xstate/react";
import type {FormMachineActor, Snapshot} from "../types";

const idle = (snapshot: Snapshot) => snapshot.matches('idle');
const capturingUserInfo = (snapshot: Snapshot) => snapshot.matches('capturing-user-info');
const capturingAccountInfo = (snapshot: Snapshot) => snapshot.matches('capturing-account-info');
const complete = (snapshot: Snapshot) => snapshot.matches('complete');
const error = (snapshot: Snapshot) => snapshot.matches('error');
const submitting = (snapshot: Snapshot) => snapshot.matches('submitting');

export function useMachineState(actorRef: FormMachineActor) {
  const isIdle = useSelector(actorRef, idle);
  const isCapturingUserInfo = useSelector(actorRef, capturingUserInfo);
  const isCapturingAccountInfo = useSelector(actorRef, capturingAccountInfo);
  const isComplete = useSelector(actorRef, complete);
  const isError = useSelector(actorRef, error);
  const isSubmitting = useSelector(actorRef, submitting);

  return { isIdle, isCapturingUserInfo, isCapturingAccountInfo, isComplete, isError, isSubmitting };
}
