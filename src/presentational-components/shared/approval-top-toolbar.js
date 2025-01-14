import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Level,
  LevelItem,
  PageSection,
  Text,
  TextContent,
  TextVariants
} from '@patternfly/react-core';
import { ToolbarTitlePlaceholder } from './loader-placeholders';
import ApprovalBreadcrumbs from './breadcrumbs';

import './top-toolbar.scss';

export const TopToolbar = ({ children, breadcrumbs }) => (
  <PageSection
    style={{
      backgroundColor: 'var(--pf-global--palette--white)'
    }}
  >
    {breadcrumbs && (
      <Level className="pf-u-mb-md">
        <ApprovalBreadcrumbs breadcrumbs={breadcrumbs} />
      </Level>
    )}
    {children}
  </PageSection>
);

TopToolbar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  breadcrumbs: PropTypes.array,
  paddingBottom: PropTypes.bool,
  className: PropTypes.string
};

TopToolbar.defaultProps = {
  paddingBottom: false
};

export const TopToolbarTitle = ({ title, description, children }) => (
  <Fragment>
    <Level>
      <LevelItem>
        <TextContent className="pf-u-mb-sm">
          <Text component={TextVariants.h1}>
            {title || <ToolbarTitlePlaceholder />}
          </Text>
        </TextContent>
        {description && (
          <TextContent className="pf-u-pt-sm pf-u-mb-md">
            <Text component={TextVariants.p}>{description}</Text>
          </TextContent>
        )}
      </LevelItem>
      {children}
    </Level>
  </Fragment>
);

TopToolbarTitle.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};
