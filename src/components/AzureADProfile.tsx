import { BrProps, BrPageContext } from '@bloomreach/react-sdk';
import React from 'react';
import { SummaryList, BodyText, WarningCallout } from "nhsuk-react-components";

// Renders hardcoded Footer for now
export function AzureADProfile(props: BrProps) {
  const { user } = props.component.getModels();
  const page = React.useContext(BrPageContext);

  if (!user) {
    if (page && page.isPreview()) {
      return (
        <WarningCallout label="Azure AD User Profile">
          <p>This component cannot be previewed in Channel Manager as it needs to get user profile from Azure AD which in turn requires an Azure AD/Office 365 user to be logged in.</p>
        </WarningCallout>
      )
    } else {
      return null;
    }
  }

  return (
    <>
    <h2>Azure AD User Profile</h2>
    <SummaryList noBorder>
      <SummaryList.Row>
        <SummaryList.Key>Name</SummaryList.Key>
        <SummaryList.Value>{user.displayName}</SummaryList.Value>
      </SummaryList.Row>
      <SummaryList.Row>
        <SummaryList.Key>Username</SummaryList.Key>
        <SummaryList.Value>{user.username}</SummaryList.Value>
      </SummaryList.Row>
      <SummaryList.Row>
        <SummaryList.Key>Job Title</SummaryList.Key>
        <SummaryList.Value>{user.jobTitle}</SummaryList.Value>
      </SummaryList.Row>
      <SummaryList.Row>
        <SummaryList.Key>Groups</SummaryList.Key>
        <SummaryList.Value>
          { user.groups.map((group: String, index: string | number | undefined) => (
            <BodyText key={index}>{group}</BodyText>
          )) }
        </SummaryList.Value>
      </SummaryList.Row>
    </SummaryList>
    </>
  );
}
