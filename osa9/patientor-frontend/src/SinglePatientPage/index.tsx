import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Header, Container, Icon, Segment, Button } from "semantic-ui-react";

import { apiBaseUrl } from "../constants";
import { Patient, Diagnosis, Entry, HealthCheckEntry, NewEntryTypes } from "../types";
import { useStateValue, addNewPatientSingle, addAllDiagnosis, addEntryToId } from "../state";
import AddEntryModal from "./addEntryModal";

const HospitalEntry = ({entry}: {entry: Entry}) => {
  return (
    <Segment>
      <Header as="h3">
        {entry.date} <Icon name='doctor' />
        </Header>
        <div>
          {entry.description}
        </div>
    </Segment>
  );
};

const OccupationalHealthcareEntry = ({entry}: {entry: Entry}) => {
  return (
    <Segment>
      <Header as="h3">
        {entry.date} <Icon name='stethoscope' />
        </Header>
        <div>
          {entry.description}
        </div>
    </Segment>
  );
};

const HealthCheckEntrySegment = ({entry}: {entry: HealthCheckEntry}) => {
  return (
    <Segment>
      <Header as="h3">
        {entry.date} <Icon name='heartbeat' />
        </Header>
        <div>
          {entry.description}
        </div>
        <Icon color={entry.healthCheckRating === 0 ? 'green' : entry.healthCheckRating === 1 ? 'yellow' : entry.healthCheckRating === 2 ? 'red' : 'black'} name='heart' />
    </Segment>
  );
};

const EntryDetails = ({ entry }: {entry: Entry}) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckEntrySegment entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const SinglePatientPage = () => {
  const [{ singlePatients, diagnosis }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  
  React.useEffect(() => {
    const fetchPatientInfo = async () => {
      /* console.log('called'); */
      try {
        const { data: patientInfoFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(addNewPatientSingle(patientInfoFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if (!(id in singlePatients)) {
      void fetchPatientInfo(); 
    }
  }, []);

  React.useEffect(() => {
    const fetchDiagnosis = async () => {
      console.log('called');
      try {
        const { data: diagnosisFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(addAllDiagnosis(diagnosisFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if (Object.keys(diagnosis).length === 0) {
      void fetchDiagnosis();
    }
  }, []);

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
type NewEntryType = UnionOmit<Entry, "id">;

  const submitNewEntry = async (values: NewEntryTypes) => {
    const newObjNoCodes: NewEntryType = Object.values(values).find(n => n.type === values.entrytype); //eslint-disable-line
    const newObj: NewEntryType = {
      ...newObjNoCodes,
      diagnosisCodes: values.diagnosisCodes
    };
    try {
      const e = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        newObj
      );
      dispatch(addEntryToId(e.data, id));
      closeModal();
    } catch (e) {
      if (typeof e === 'string') {
        console.log(e);
        setError(e);
      }
      else if (e instanceof Error) {
        console.log(e.message);
        setError(e.message);
      }
      else {
        console.log('unknown error type', e);
      }
      setTimeout(() => setError(undefined), 7500);
    }
  };

  const patient = singlePatients[id];
  if (!patient) {
    return (
      <p>loading...</p>
    );
  }

  const iconName = patient.gender === 'male' ? 'mars' : patient.gender === 'female' ? 'venus' : 'genderless';

  return (
    <Container>
      <Container>
        <Header as='h2'>
          {patient.name} <Icon name={iconName} />
        </Header>
      </Container>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <br />
      <Container>
        <Header as='h3'>entries</Header>
        {patient.entries && patient.entries && patient.entries.map(entry => (
          <EntryDetails key={entry.id} entry={entry} />
        ))}
      </Container>
      <br />
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add new entry</Button>
    </Container>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default SinglePatientPage;