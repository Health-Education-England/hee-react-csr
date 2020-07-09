import {BrProps} from '@bloomreach/react-sdk';
import React from 'react';
import {Promo} from "nhsuk-react-components";

export function TrainingByLearningStage(props: BrProps) {
  const {trainingByLearningStageTitle, trainingByLearningStageDocs} = props.component.getModels();

  if (!trainingByLearningStageDocs) {
    return null;
 }

  // Builds SubHub page cards
  let subHubCards = [];
  for (const [index, trainingByLearningDocRef] of trainingByLearningStageDocs.entries()) {
    const trainingByLearningDoc = trainingByLearningDocRef && props.page.getContent(trainingByLearningDocRef);

    if (!trainingByLearningDoc) {
      continue;
   }

    const {title, abstract, image: imageRef, _links} = trainingByLearningDoc.getData<DocumentData>();

    const image = imageRef && props.page.getContent(imageRef);

    let cardUrl = trainingByLearningDoc.getUrl();
    if (_links?.site.type === 'internal') {
      cardUrl = _links?.site!.href;
   }

    subHubCards.push(
      <Promo
        key={index}
        href={cardUrl}
        imageSrc={image?.getUrl()}
      >
        <Promo.Heading>{title}</Promo.Heading>
        <Promo.Description>{abstract}</Promo.Description>
      </Promo>
    );
 }

  return (
    <>
      <h2>{trainingByLearningStageTitle}</h2>
      <Promo.Group>
        {subHubCards}
      </Promo.Group>
      <br/>
    </>
  );
}
