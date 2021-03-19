import React, { Component } from 'react';
import { string } from 'prop-types';
import { FormattedMessage, injectIntl } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { obfuscatedCoordinates } from '../../util/maps';
import { Map, PropertyGroup } from '../../components';
import config from '../../config';

import css from './ListingPage.module.css';

class SectionMapMaybe extends Component {
  constructor(props) {
    
    super(props);
    this.state = { isStatic: true };
  }

  render() {
    const { className, rootClassName, geolocation, publicData, listingId, options, intl } = this.props;

    if (!geolocation) {
      return null;
    }

    const address = publicData && publicData.location ? publicData.location.address : '';
    const place = publicData && publicData.courseLocations ? publicData.courseLocations : '';
    const classes = classNames(rootClassName || css.sectionMap, className);
    const cacheKey = listingId ? `${listingId.uuid}_${geolocation.lat}_${geolocation.lng}` : null;

    const selectedOptions = publicData && publicData.courseLocations ? publicData.courseLocations : [];
    const configOptions = options.filter(o => selectedOptions.find(s => s === o.key)).map(e => {
      e.label = intl.formatMessage({ id: `CourseLocations.${e.key.toString()}` })
      return e
    });

    console.log(configOptions)

    const mapProps = config.maps.fuzzy.enabled
      ? { obfuscatedCenter: obfuscatedCoordinates(geolocation, cacheKey) }
      : { address, center: geolocation };
    const map = <Map {...mapProps} useStaticMap={this.state.isStatic} />;

    return (
      <div className={classes}>
        <h2 className={css.locationTitle}>
          <FormattedMessage id="ListingPage.locationTitle" />
        </h2>
        <PropertyGroup
          id="ListingPage.courseLocation"
          options={configOptions}
          selectedOptions={selectedOptions}
          twoColumns={configOptions.length > 5}
        />
        {this.state.isStatic ? (
          <button
            className={css.map}
            onClick={() => {
              this.setState({ isStatic: false });
            }}
          >
            {map}
          </button>
        ) : (
          <div className={css.map}>{map}</div>
        )}
      </div>
    );
  }
}

SectionMapMaybe.defaultProps = {
  rootClassName: null,
  className: null,
  geolocation: null,
  listingId: null,
};

SectionMapMaybe.propTypes = {
  rootClassName: string,
  className: string,
  geolocation: propTypes.latlng,
  listingId: propTypes.uuid,
};

export default injectIntl(SectionMapMaybe);
