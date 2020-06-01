import React from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import { BrComponent, BrPage } from '@bloomreach/react-sdk';
import { Article, AzureADProfile, Footer, HeroBanner, Menu, SharepointFiles } from './components';

axios.interceptors.request.use(config => ({ ...config, withCredentials: true }));

export default function App(props: RouteComponentProps) {

  var channels = process.env.REACT_APP_BR_SUPPORTED_CHANNELS!.split(',');

  var liveCMSBaseUrl = process.env.REACT_APP_LIVE_BR_BASE_URL!;
  var previewCMSBaseUrl = process.env.REACT_APP_PREVIEW_BR_BASE_URL!;
  var siteContextRemovedPath = props.location.pathname;

  channels.forEach((channel) => {
    if (props.location.pathname.startsWith('/site/' + channel)) {
      // Appending channel to live cmsBaseUrl
      liveCMSBaseUrl += '/' + channel;
      siteContextRemovedPath = props.location.pathname.replace('/site/' + channel, '');
    }

    if (props.location.pathname.startsWith('/site/_cmsinternal/' + channel)) {
      // Appending channel to preview cmsBaseUrl
      previewCMSBaseUrl += '/' + channel;
      siteContextRemovedPath = props.location.pathname.replace('/site/_cmsinternal/' + channel, '/site/_cmsinternal');
    }
  });

  // This is to remove the extra `/site` from the route path, for instnce /site/resourceapi/site/user-home-page
  // so that it becomes /site/resourceapi/user-home-page. This is required for live mode only.
  if (siteContextRemovedPath.startsWith('/site') && !siteContextRemovedPath.startsWith('/site/_cmsinternal')) {
    siteContextRemovedPath = props.location.pathname.substring('/site'.length);
  }

  const configuration = {
    httpClient: axios,
    options: {
      live: {
        cmsBaseUrl: liveCMSBaseUrl,
        spaBaseUrl: process.env.REACT_APP_LIVE_SPA_BASE_URL,
      },
      preview: {
        cmsBaseUrl: previewCMSBaseUrl,
        spaBaseUrl: process.env.REACT_APP_PREVIEW_SPA_BASE_URL,
      },
    },
    request: {
      path: `${siteContextRemovedPath}${props.location.search}`,
    },
  };
  const mapping = { Article, 'AzureAD Profile': AzureADProfile, 'Hero Banner': HeroBanner, 'Sharepoint Files': SharepointFiles };

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
