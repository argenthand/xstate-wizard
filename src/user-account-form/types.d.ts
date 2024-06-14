import {formMachine} from "./machine.ts";
import type {Actor, SnapshotFrom} from "xstate";

export type UserInformationInputs = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
}

export type AccountInformationInputs = {
  username: string;
  email: string;
}

export type Snapshot = SnapshotFrom<typeof formMachine>;
export type FormMachineActor = Actor<typeof formMachine>;
