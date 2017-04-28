import React from 'react';
import { Route } from 'react-router';
import { PageContainer as PhenomicPageContainer } from 'phenomic';

import AppContainer from './AppContainer';
import Page from './layouts/Page';
import PageError from './layouts/PageError';
import Homepage from './layouts/Homepage';
import DocsPage from './layouts/DocsPage';

const PageContainer = (props) => (
  <PhenomicPageContainer
    { ...props }
    layouts={{
      Page,
      PageError,
      Homepage,
      DocsPage,
    }}
    defaultLayout= 
    {props.location.pathname && props.location.pathname.startsWith("/docs/") ? "DocsPage" : "Page"}
  />
)
 
export default (
  <Route component={AppContainer}>
    <Route path='*' component={PageContainer} />
  </Route>
)
