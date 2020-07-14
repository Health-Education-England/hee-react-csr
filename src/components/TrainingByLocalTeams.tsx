import {BrProps} from '@bloomreach/react-sdk';
import React from 'react';
import {ContentsList} from "nhsuk-react-components";

export function TrainingByLocalTeams(props: BrProps) {
  const {trainingByLocalTeamsTitle, trainingByLocalTeamsLinks}: {trainingByLocalTeamsTitle: string, trainingByLocalTeamsLinks: Link[]} = props.component.getModels();

  if (!trainingByLocalTeamsLinks) {
    return null;
 }

  return (
    <>
      <h2>{trainingByLocalTeamsTitle}</h2>
        <ContentsList>
          {trainingByLocalTeamsLinks.map((link, index) => {
            return (
              <ContentsList.Item key={index} href={link.url}>
                <h3>{link.label}</h3>
              </ContentsList.Item>
            )
         })}
        </ContentsList>
        <br/>
    </>
  );
}
