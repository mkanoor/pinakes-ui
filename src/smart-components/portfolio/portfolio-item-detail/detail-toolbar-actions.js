import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { LevelItem } from '@patternfly/react-core';
import ButtonWithSpinner from '../../../presentational-components/shared/button-with-spinner';

const DetailToolbarActions = ({ orderUrl, editUrl, isOpen, setOpen, isFetching }) => ( // eslint-disable-line no-unused-vars
  <Fragment>
    <LevelItem>
      <Link disabled={ isFetching } to={ orderUrl }>
        <ButtonWithSpinner isDisabled={ isFetching } showSpinner={ isFetching } variant="primary">Order</ButtonWithSpinner>
      </Link>
    </LevelItem>
    {
      /**
       *<LevelItem style={ { marginLeft: 16 } }>
       *  <Dropdown
       *    isPlain
       *    onToggle={ setOpen }
       *    onSelect={ () => setOpen(false) }
       *    position={ DropdownPosition.right }
       *    toggle={ <KebabToggle onToggle={ setOpen }/> }
       *    isOpen={ isOpen }
       *    dropdownItems={ [
       *      <DropdownItem aria-label="Edit Portfolio" key="edit-portfolio">
       *        <Link to={ editUrl } role="link" className="pf-c-dropdown__menu-item">
       *            Edit
       *        </Link>
       *      </DropdownItem>
       *    ] }
       *  />
       *</LevelItem>
       */
    }
  </Fragment>
);

DetailToolbarActions.propTypes = {
  orderUrl: PropTypes.string.isRequired,
  editUrl: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
  isFetching: PropTypes.bool
};

DetailToolbarActions.defaultProps = {
  isFetching: false
};

export default DetailToolbarActions;
