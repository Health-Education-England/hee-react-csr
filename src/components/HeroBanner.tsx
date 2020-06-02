import { BrProps } from '@bloomreach/react-sdk';
import React from 'react';
import { Hero } from "nhsuk-react-components";

export function HeroBanner(props: BrProps) {
  const { heroBannerDocument: heroBannerDocumentRef } = props.component.getModels();
  const heroBannerDocument = heroBannerDocumentRef && props.page.getContent(heroBannerDocumentRef);

  if (!heroBannerDocument) {
    return null;
  }

  const { heading, summaryText } = heroBannerDocument.getData<DocumentData>();

  return (
    <Hero>
      <Hero.Heading>{ heading }</Hero.Heading>
      <Hero.Text>{ summaryText }</Hero.Text>
    </Hero>
  );
}
