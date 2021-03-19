import React from 'react';
import { FormattedMessage, injectIntl } from '../../util/reactIntl';
import { PropertyGroup } from '../../components';

import css from './ListingPage.module.css';

const SectionInstrumentsMaybe = props => {
  const { options, provided_option, publicData, intl } = props;
  if (!publicData) {
    return null;
  }

  const selectedOptions = publicData && publicData.musicInstruments ? publicData.musicInstruments : [];
  const selectedConfigOptions = options.filter(o => selectedOptions.find(s => s === o.key));

  const instrumentProvided = publicData && publicData.instrumentProvided ? publicData.instrumentProvided : false;
  let instrumentProvidedContent;

  if (instrumentProvided == "true") {
    instrumentProvidedContent = <p>{intl.formatMessage({ id: `ListingPage.instrumentProvided` })}</p>;
  } else {
    instrumentProvidedContent = <p>{intl.formatMessage({ id: `ListingPage.instrumentNotProvided` })}</p>;
  }

  return (
    <div className={css.sectionFeatures}>
      <h2 className={css.featuresTitle}>
        <FormattedMessage id="ListingPage.instrumentsTitle" />
      </h2>
      <PropertyGroup
        id="ListingPage.musicInstruments"
        options={selectedConfigOptions}
        selectedOptions={selectedOptions}
        twoColumns={selectedConfigOptions.length > 5}
      />
      <p>{instrumentProvidedContent}</p>
    </div>
  );
};

export default injectIntl(SectionInstrumentsMaybe);
