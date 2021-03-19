import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import { FormSpy } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage } from '../../util/reactIntl';
import { findOptionsForSelectFilter } from '../../util/search';
import { propTypes } from '../../util/types';
import config from '../../config';
import { Button, FieldBoolean, FieldCheckboxGroup, FieldRadioButton, Form } from '../../components';

import css from './EditListingInstrumentsForm.module.css';
import { transitionsToRequested } from '../../util/transaction';

const EditListingInstrumentsFormComponent = props => (
  <FinalForm
    {...props}
    mutators={{ ...arrayMutators }}
    render={formRenderProps => {
      const {
        intl,
        disabled,
        ready,
        rootClassName,
        className,
        name,
        handleSubmit,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        filterConfig,
      } = formRenderProps;

      const classes = classNames(rootClassName || css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = disabled || submitInProgress;

      const { updateListingError, showListingsError } = fetchErrors || {};
      const errorMessage = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingInstrumentsForm.updateFailed" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingInstrumentsForm.showListingFailed" />
        </p>
      ) : null;

      const instrumentProvidedName = "instrumentProvided"
      const instrumentProvidedOptions = findOptionsForSelectFilter('instrumentProvided', filterConfig);


      const options = findOptionsForSelectFilter('musicInstruments', filterConfig).map(e => {
        e.label = intl.formatMessage({ id: `Instruments.${e.key}` })
        return e
      }).sort((a, b) => (a.label > b.label) ? 1 : -1);

      return (
        <Form className={classes} onSubmit={handleSubmit} >
          {errorMessage}
          {errorMessageShowListing}

          <FieldCheckboxGroup className={css.instruments} id={name} name={name} options={options} />

          

          <div className={css.instruments}>
            <FormattedMessage id="EditListingInstrumentsForm.instrumentProvided" />
            <FieldRadioButton
              id={`${"id"}-option-id1`}
              name={instrumentProvidedName}
              label={intl.formatMessage({ id: "EditListingInstrumentsForm.instrumentProvidedTrue" })}
              value="true"
            />
            <FieldRadioButton
              id={`${"id"}-option-id2`}
              name={instrumentProvidedName}
              label={intl.formatMessage({ id: "EditListingInstrumentsForm.instrumentProvidedFalse" })}
              value="false"
            />
          </div>
          

          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

EditListingInstrumentsFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchErrors: null,
  filterConfig: config.custom.filters,
};

EditListingInstrumentsFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  name: string.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  filterConfig: propTypes.filterConfig,
};

const EditListingInstrumentsForm = EditListingInstrumentsFormComponent;

export default EditListingInstrumentsForm;
