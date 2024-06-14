import { useSelector } from "@xstate/react";
import type {FormMachineActor, Snapshot} from "../types";

const selectFirstName = (snapshot: Snapshot) => snapshot.context.firstName;
const selectLastName = (snapshot: Snapshot) => snapshot.context.lastName;
const selectDateOfBirth = (snapshot: Snapshot) => snapshot.context.dateOfBirth;
const selectUsername = (snapshot: Snapshot) => snapshot.context.username;
const selectEmail = (snapshot: Snapshot) => snapshot.context.email;

export function useMachineContext(actorRef: FormMachineActor) {
  const firstName = useSelector(actorRef, selectFirstName);
  const lastName = useSelector(actorRef, selectLastName);
  const dateOfBirth = useSelector(actorRef, selectDateOfBirth);
  const username = useSelector(actorRef, selectUsername);
  const email = useSelector(actorRef, selectEmail);

  return { firstName, lastName, dateOfBirth, username, email };
}
