import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { Entry, NewEntryTypes, HealthCheckRating } from '../types';
import { TextField, DiagnosisSelection, EntryTypeOption, SelectFieldEntry, NumberField } from '../AddPatientModal/FormField';
import { useStateValue } from "../state";
import { EntryType } from '../types';

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type EntryFormValues = UnionOmit<Entry, "id">;

interface Props {
  onSubmit: (values: NewEntryTypes) => void;
  onCancel: () => void;
}

const TypeOptions: EntryTypeOption[] = [
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.OccupationalHealthcare, label: "Occupational Healthcare" },
  { value: EntryType.HealthCheck, label: "HealthCheck" }
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik
      initialValues={{
        Hospital: {
          description: "",
          date: "",
          specialist: "",
          type: "Hospital",
          discharge: {
            date: "",
            criteria: ""
          }
        },
        OccupationalHealthcare: {
          description: "",
          date: "",
          specialist: "",
          type: "OccupationalHealthcare",
          employerName: "",
          sickLeave: {
            startDate: "",
            endDate: ""
          }
        },
        HealthCheck: {
          description: "",
          date: "",
          specialist: "",
          type: "HealthCheck",
          healthCheckRating: HealthCheckRating.Healthy
        },
        entrytype: "Hospital",
        diagnosisCodes: []
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        switch (values.entrytype) {
          case 'Hospital': {
            if (!values.Hospital.date || !/\d{4}-([0][1-9]|[1][0-2])-([0][1-9]|[1][0-9]|[2][0-9]|[3][0-1])/g.test(values.Hospital.date)) {
              errors.date = requiredError;
            }
            if (!values.Hospital.description) {
              errors.description = requiredError;
            }
            if (!values.Hospital.specialist) {
              errors.specialist = requiredError;
            }
            if (!values.Hospital.discharge.date || !/\d{4}-([0][1-9]|[1][0-2])-([0][1-9]|[1][0-9]|[2][0-9]|[3][0-1])/g.test(values.Hospital.discharge.date)) {
              errors.dischargeDate = requiredError;
            }
            if (!values.Hospital.discharge.criteria) {
              errors.dischargeCriteria = requiredError;
            }
            return errors;
          }
          case 'OccupationalHealthcare': {
            if (!values.OccupationalHealthcare.date || !/\d{4}-([0][1-9]|[1][0-2])-([0][1-9]|[1][0-9]|[2][0-9]|[3][0-1])/g.test(values.OccupationalHealthcare.date)) {
              errors.date = requiredError;
            }
            if (!values.OccupationalHealthcare.description) {
              errors.description = requiredError;
            }
            if (!values.OccupationalHealthcare.specialist) {
              errors.specialist = requiredError;
            }
            if (!values.OccupationalHealthcare.employerName) {
              errors.specialistName = requiredError;
            }
          }
          return errors;
          case 'HealthCheck': {
            if (!values.HealthCheck.date || !/\d{4}-([0][1-9]|[1][0-2])-([0][1-9]|[1][0-9]|[2][0-9]|[3][0-1])/g.test(values.HealthCheck.date)) {
              errors.date = requiredError;
            }
            if (!values.HealthCheck.description) {
              errors.description = requiredError;
            }
            if (!values.HealthCheck.specialist) {
              errors.specialist = requiredError;
            }
            if (!(values.HealthCheck.healthCheckRating || values.HealthCheck.healthCheckRating === 0)) {
              errors.specialist = requiredError;
            }
            
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <fieldset className="form-group">
              <SelectFieldEntry
                label="Entry type"
                name="entrytype"
                options={TypeOptions}
              />
            </fieldset>
            {values.entrytype === "Hospital" && (
              <div>
                <Field
                  label="Description"
                  placeholder="Description"
                  name="Hospital.description"
                  component={TextField}
                />
                <Field
                  label="Date"
                  placeholder="YYYY-MM-DD"
                  name="Hospital.date"
                  component={TextField}
                />
                <Field
                  label="Specialist"
                  placeholder="Specialist"
                  name="Hospital.specialist"
                  component={TextField}
                />
                <Field
                  label="Discharge date"
                  placeholder="YYYY-MM-DD"
                  name="Hospital.discharge.date"
                  component={TextField}
                />
                <Field
                  label="Dischage criteria"
                  placeholder="Criteria"
                  name="Hospital.discharge.criteria"
                  component={TextField}
                />
                <DiagnosisSelection
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  diagnoses={Object.values(diagnosis)}
                />
              </div>
            )}
            {values.entrytype === "OccupationalHealthcare" && (
              <div>
                <Field
                  label="Description"
                  placeholder="Description"
                  name="OccupationalHealthcare.description"
                  component={TextField}
                />
                <Field
                  label="Date"
                  placeholder="YYYY-MMM-DD"
                  name="OccupationalHealthcare.date"
                  component={TextField}
                />
                <Field
                  label="Specialist"
                  placeholder="Specialist"
                  name="OccupationalHealthcare.specialist"
                  component={TextField}
                />
                <Field
                  label="Employer name"
                  placeholder="Employer name"
                  name="OccupationalHealthcare.employerName"
                  component={TextField}
                />
                <Field
                  label="Sickleave start date"
                  placeholder="YYYY-MM-DD"
                  name="OccupationalHealthcare.sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="Sickleave end date"
                  placeholder="YYYY-MM-DD"
                  name="OccupationalHealthcare.sickLeave.endDate"
                  component={TextField}
                />
                <DiagnosisSelection
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  diagnoses={Object.values(diagnosis)}
                />
              </div>
            )}
            {values.entrytype === "HealthCheck" && (
              <div>
                <Field
                  label="Description"
                  placeholder="Description"
                  name="HealthCheck.description"
                  component={TextField}
                />
                <Field
                  label="Date"
                  placeholder="YYYY-MMM-DD"
                  name="HealthCheck.date"
                  component={TextField}
                />
                <Field
                  label="Specialist"
                  placeholder="Specialist"
                  name="HealthCheck.specialist"
                  component={TextField}
                />
                <Field
                  label="HealthCheckRating"
                  name="HealthCheck.healthCheckRating"
                  component={NumberField}
                  min={0}
                  max={3}
                />
                <DiagnosisSelection
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  diagnoses={Object.values(diagnosis)}
                />
              </div>
            )}
            {/* <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MMM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Type"
              placeholder="type"
              name="type"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            /> */}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;