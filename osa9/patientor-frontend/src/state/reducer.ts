import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

interface AddEntryIdInterface {
  entry: Entry;
  id: string;
}

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT_SINGLE";
      payload: Patient;
    }
  | {
    type: "ADD_DIAGNOSIS";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY_TO_ID";
    payload: AddEntryIdInterface;
  };

export const setPatientList = (patientList: Patient[]):Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList
  };
};

export const addEntryToId = (entry: Entry, id: string):Action => {
  return {
    type: "ADD_ENTRY_TO_ID",
    payload: {
      entry,
      id
    }
  };
};

export const addNewPatient = (patient: Patient):Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const addNewPatientSingle = (patient: Patient):Action => {
  return {
    type: "ADD_PATIENT_SINGLE",
    payload: patient
  };
};

export const addAllDiagnosis = (diagnoseList: Diagnosis[]):Action => {
  return {
    type: "ADD_DIAGNOSIS",
    payload: diagnoseList
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
      case "ADD_DIAGNOSIS":
        return {
          ...state,
          diagnosis: {
            ...action.payload.reduce(
              (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
              {}
            ),
            ...state.patients
          }
        };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case 'ADD_ENTRY_TO_ID': {
      const id = action.payload.id;
      const patient = state.singlePatients[id];
      patient.entries = patient.entries.concat(action.payload.entry);
      return {
        ...state,
        singlePatients: {
          ...state.singlePatients,
          [id]: patient
        }
      };
    }
    case "ADD_PATIENT_SINGLE":
      return {
        ...state,
        singlePatients: {
          ...state.singlePatients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};
