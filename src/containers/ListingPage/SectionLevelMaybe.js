import React from 'react';
import { FormattedMessage, injectIntl } from '../../util/reactIntl';
import { PropertyGroup } from '../../components';

import css from './ListingPage.module.css';

const SectionInstrumentsMaybe = props => {
  const { options, publicData, intl } = props;
  if (!publicData) {
    return null;
  }

  const selectedOptions = publicData && publicData.level ? publicData.level : [];
  const selectedConfigOptions = options.filter(o => selectedOptions.find(s => s === o.key)).map(e => {
    e.label = intl.formatMessage({ id: `Levels.${e.key.toString()}` })
    return e
  });

  return (
    <div className={css.sectionFeatures}>
      <h2 className={css.featuresTitle}>
        <FormattedMessage id="ListingPage.levelTitle" />
      </h2>
      <PropertyGroup
        id="ListingPage.level"
        options={selectedConfigOptions}
        selectedOptions={selectedOptions}
        twoColumns={selectedConfigOptions.length > 5}
      />
    </div>
  );
};

export default injectIntl(SectionInstrumentsMaybe);
