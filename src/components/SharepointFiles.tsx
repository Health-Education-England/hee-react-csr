import { BrProps, BrPageContext } from '@bloomreach/react-sdk';
import React from 'react';
import { ContentsList, SummaryList, WarningCallout } from "nhsuk-react-components";

// Renders hardcoded Footer for now
export function SharepointFiles(props: BrProps) {
  const { sharepointSiteFiles } = props.component.getModels();
  const page = React.useContext(BrPageContext);

  if (!sharepointSiteFiles) {
    if (page && page.isPreview()) {
      return (
        <WarningCallout label="Sharepoint Documents">
          <p>This component cannot be previewed in Channel Manager as it needs to list files from Sharepoint which in turn requires an Azure AD/Office 365 user to be logged in.</p>
        </WarningCallout>
      )
    } else {
      return null;
    }
  }

  return (
    <>
    <h2>Sharepoint Documents</h2>
    { Object.keys(sharepointSiteFiles).map((key, index) => {
      return (
        <ContentsList key={index}>
          <SummaryList.Row><b>{key}</b></SummaryList.Row>
          { sharepointSiteFiles[key].map((item: { url: string | undefined; title: string; fileType: string; modifiedBy: string; modifiedDate: number; }, index: string | number | undefined) => {
            return (
              <>
              <p>
              <ContentsList.Item href={item.url} key={index} target="_blank">
                {item.title}
              </ContentsList.Item>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[{item.fileType}] [Last Modified By: {item.modifiedBy}, Date: {new Date(item.modifiedDate).toUTCString()}]
              </p>
            </>
            )
          }) }
        </ContentsList>
      )
    }) }
    </>
  );
}
