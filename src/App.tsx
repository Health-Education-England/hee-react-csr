import React from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import { BrComponent, BrPage } from '@bloomreach/react-sdk';
import { AzureADProfile, Footer, HeroBanner, Menu,  SharepointFiles } from './components';

axios.interceptors.request.use(config => ({ ...config, withCredentials: true }));

export default function App(props: RouteComponentProps) {

  // This is to remove the extra `/site` from the route path, for instnce /site/resourceapi/site/user-home-page
  // so that it becomes /site/resourceapi/user-home-page. This is required for live mode only.
  var siteContextRemovedPath = props.location.pathname;
  if (props.location.pathname.startsWith('/site') && !props.location.pathname.startsWith('/site/_cmsinternal')) {
    siteContextRemovedPath = props.location.pathname.substring('/site'.length);
  }

  const configuration = {
    httpClient: axios,
    options: {
      live: {
        cmsBaseUrl: process.env.REACT_APP_LIVE_BR_BASE_URL!,
        spaBaseUrl: process.env.REACT_APP_LIVE_SPA_BASE_URL,
      },
      preview: {
        cmsBaseUrl: process.env.REACT_APP_PREVIEW_BR_BASE_URL!,
        spaBaseUrl: process.env.REACT_APP_PREVIEW_SPA_BASE_URL,
      },
    },
    request: {
      path: `${siteContextRemovedPath}${props.location.search}`,
    },
  };
  const mapping = { 'AzureAD Profile': AzureADProfile, 'Hero Banner': HeroBanner, 'Sharepoint Files': SharepointFiles };

  return (
    <BrPage configuration={configuration} mapping={mapping}>
      <header>
        <nav className="navbar navbar-expand-sm navbar-dark sticky-top bg-dark" role="navigation">
          <div className="container">
            {/* <BrPageContext.Consumer>
              { page => (
                <Link to={page!.getUrl('/')} className="navbar-brand">
                  { page!.getTitle() || 'brXM + React + Hello = ♥️'}
                </Link>
              ) }
            </BrPageContext.Consumer> */}
            <div className="collapse navbar-collapse">
              <BrComponent path="menu">
                <Menu />
              </BrComponent>
            </div>
          </div>
        </nav>
      </header>
      <BrComponent path="hero" />
      <div className="nhsuk-width-container">
        <main className="nhsuk-main-wrapper" id="maincontent">
          {/* <BrPageContext.Consumer>
            { page => (
              <Label isPageHeading>{ page!.getTitle() }</Label>
            ) }
          </BrPageContext.Consumer> */}
          <BrComponent path="main" />
        </main>
      </div>
      <Footer />
    </BrPage>
  );
}
