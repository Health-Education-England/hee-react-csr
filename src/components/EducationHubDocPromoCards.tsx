import {BrProps} from '@bloomreach/react-sdk';
import React from 'react';
import {Promo} from "nhsuk-react-components";

export function EducationHubDocPromoCards(props: BrProps) {
  const {title, documents} = props.component.getModels();

  if (!documents) {
    return null;
 }

  // Builds promo cards
  let promoCards = [];
  let promoGroupCards = [];
  for (const [index, docRef] of documents.entries()) {
    const doc = docRef && props.page.getContent(docRef);

    if (!doc) {
      continue;
   }

    const {title, abstract, image: imageRef, _links} = doc.getData<DocumentData>();

    const image = imageRef && props.page.getContent(imageRef);

    let cardUrl = doc.getUrl();
    if (_links?.site.type === 'internal') {
      cardUrl = _links?.site!.href;
   }

    promoCards.push(
      <Promo
        key={index}
        href={cardUrl}
        imageSrc={image?.getUrl()}
      >
        <Promo.Heading>{title}</Promo.Heading>
        <Promo.Description>{abstract}</Promo.Description>
      </Promo>
    );

    if (((index + 1) % 3 === 0) || (index + 1 === documents.length)) {

      // Adds empty promo cards to fill in the last row with 3 cards
      // in case if it contains less than 3
      if (((index + 1) % 3 !== 0)) {
        for (let j = 0; j < 3 - ((index + 1) % 3); j++) {
          promoCards.push(
            <Promo key={index + j + 1} style={{visibility: 'hidden'}}>
            </Promo>
          );
       }
     }

      promoGroupCards.push(
        <Promo.Group key={(index + 1) / 3}>
          {promoCards}
        </Promo.Group>
      );

      promoCards = [];
   }
 }

  return (
    <>
      <h2>{title}</h2>
      {promoGroupCards}
      <br/>
    </>
  );
}
