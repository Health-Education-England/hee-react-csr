import { BrProps } from '@bloomreach/react-sdk';
import React from 'react';
import { Hero } from "nhsuk-react-components";

export function HeroBanner(props: BrProps) {
  const { heroBannerDocument: heroBannerDocumentRef } = props.component.getModels();
  const heroBannerDocument = heroBannerDocumentRef && props.page.getContent(heroBannerDocumentRef);

  if (!heroBannerDocument) {
    return null;
  }

  const { heading, image: imageRef, summaryText } = heroBannerDocument.getData<DocumentData>();

  const image = imageRef && props.page.getContent(imageRef);

  return (
    <>
    <Hero imageSrc={ image?.getUrl() }>
      <Hero.Heading>{ heading }</Hero.Heading>
      <Hero.Text>{ summaryText }</Hero.Text>
    </Hero>
    <br/>
    </>
  );
}
