import {BrProps} from '@bloomreach/react-sdk';
import React from 'react';
import {Promo} from "nhsuk-react-components";

export function SubHubListing(props: BrProps) {
  const {subHubListingTitle, subHubDocs} = props.component.getModels();

  if (!subHubDocs) {
    return null;
 }

  // Builds SubHub page (promo) cards
  let specialtyCards = [];
  let specialtyGroupedCards = [];
  for (const [index, subHubDocRef] of subHubDocs.entries()) {
    const subHubDoc = subHubDocRef && props.page.getContent(subHubDocRef);

    if (!subHubDoc) {
      continue;
   }

    const {title, abstract, image: imageRef, _links} = subHubDoc.getData<DocumentData>();

    const image = imageRef && props.page.getContent(imageRef);

    let cardUrl = subHubDoc.getUrl();
    if (_links?.site.type === 'internal') {
      cardUrl = _links?.site!.href;
   }

    specialtyCards.push(
      <Promo
        key={index}
        href={cardUrl}
        imageSrc={image?.getUrl()}
      >
        <Promo.Heading>{title}</Promo.Heading>
        <Promo.Description>{abstract}</Promo.Description>
      </Promo>
    );

    if (((index + 1) % 3 === 0) || (index + 1 === subHubDocs.length)) {

      // Adds empty promo cards to fill in the last row with 3 cards
      // in case if it contains less than 3
      if (((index + 1) % 3 !== 0)) {
        for (let j = 0; j < 3 - ((index + 1) % 3); j++) {
          specialtyCards.push(
            <Promo key={index + j + 1} style={{visibility: 'hidden'}}>
            </Promo>
          );
       }
     }

      specialtyGroupedCards.push(
        <Promo.Group key={(index + 1) / 3}>
          {specialtyCards}
        </Promo.Group>
      );

      specialtyCards = [];
   }
 }

  return (
    <>
      <h2>{subHubListingTitle}</h2>
      {specialtyGroupedCards}
      <br/>
    </>
  );
}
