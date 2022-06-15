import React from 'react';
import { FormFeedback } from 'reactstrap';

export const FormErrorMessage = ({ formErrors }) =>
  formErrors && formErrors.length > 0 ? (
    formErrors.map(error => <FormFeedback key={error}>{error}</FormFeedback>)
  ) : (
    <FormFeedback valid></FormFeedback>
  );
