import {BrProps} from '@bloomreach/react-sdk';
import React from 'react';
import {Promo} from "nhsuk-react-components";

export function EducationHubListing(props: BrProps) {
  const {educationHubTitle, educationHubDocs} = props.component.getModels();

  if (!educationHubDocs) {
    return null;
 }

  // Builds SubHub page (promo) cards
  let educationHubCards = [];
  let educationHubGroupCards = [];
  for (const [index, educationHubDocRef] of educationHubDocs.entries()) {
    const educationHubHomeDoc = educationHubDocRef && props.page.getContent(educationHubDocRef);

    if (!educationHubHomeDoc) {
      continue;
   }

    const {title, abstract, image: imageRef, _links} = educationHubHomeDoc.getData<DocumentData>();

    const image = imageRef && props.page.getContent(imageRef);

    let cardUrl = educationHubHomeDoc.getUrl();
    if (_links?.site.type === 'internal') {
      cardUrl = _links?.site!.href;
   }

    educationHubCards.push(
      <Promo
        key={index}
        href={cardUrl}
        imageSrc={image?.getUrl()}
      >
        <Promo.Heading>{title}</Promo.Heading>
        <Promo.Description>{abstract}</Promo.Description>
      </Promo>
    );

    if (((index + 1) % 3 === 0) || (index + 1 === educationHubDocs.length)) {

      // Adds empty promo cards to fill in the last row with 3 cards
      // in case if it contains less than 3
      if (((index + 1) % 3 !== 0)) {
        for (let j = 0; j < 3 - ((index + 1) % 3); j++) {
          educationHubCards.push(
            <Promo key={index + j + 1} style={{visibility: 'hidden'}}>
            </Promo>
          );
       }
     }

      educationHubGroupCards.push(
        <Promo.Group key={(index + 1) / 3}>
          {educationHubCards}
        </Promo.Group>
      );

      educationHubCards = [];
   }
 }

  return (
    <>
      {educationHubTitle &&
        <h2>Education Hubs</h2>
      }
      {educationHubGroupCards}
      <br/>
    </>
  );
}
