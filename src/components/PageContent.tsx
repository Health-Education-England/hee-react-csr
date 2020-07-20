import {BrProps, BrPageContext} from "@bloomreach/react-sdk";
import React from "react";
import {
  ActionLink,
  Container,
  Row,
  Col,
  Promo,
  Panel,
  CareCard as NHSUKCareCard,
  Button
} from "nhsuk-react-components";

interface CardData {
  title: string;
  imageUrl: string | undefined;
  summary: string;
  linkLabel: string;
  linkUrl: string | undefined;
}

function PanelCard(cardData: CardData) {
  return (
    <Panel.Group>
      <Panel>
        <h3>{cardData.title}</h3>
        <div dangerouslySetInnerHTML={{__html: cardData.summary}} />
        {cardData.linkLabel && cardData.linkUrl && (
          <ActionLink href={cardData.linkUrl}>
            {cardData.linkLabel}
          </ActionLink>
        )}
      </Panel>
    </Panel.Group>
  );
}

function PromoCard(cardData: CardData) {
  return (
    <Promo.Group>
      <Promo
        href={cardData.linkUrl || undefined}
        imageSrc={cardData.imageUrl || undefined}
      >
        <Promo.Heading>{cardData.title}</Promo.Heading>
        <Promo.Description dangerouslySetInnerHTML={{__html: cardData.summary}}>
        </Promo.Description>
      </Promo>
    </Promo.Group>
  );
}

function CareCard(cardData: CardData) {
  return (
    <NHSUKCareCard type="urgent">
      <NHSUKCareCard.Heading>{cardData.title}</NHSUKCareCard.Heading>
      <NHSUKCareCard.Content>
        <div dangerouslySetInnerHTML={{__html: cardData.summary}} />
      </NHSUKCareCard.Content>
    </NHSUKCareCard>
  );
}

function Section({section} : any) {
  const page = React.useContext(BrPageContext);

  if (!page) {
    return null;
  }

  let card;

  if (section.cardType) {

    // Builds CardData
    let cardData = {} as CardData;
    const cardDoc = section.cardDocument && page.getContent(section.cardDocument);

    if (cardDoc) {
      const {title, image: imageRef, abstract, _links} = cardDoc.getData<DocumentData>();

      cardData.title = cardData.linkLabel = title;

      const cardImage = imageRef && page?.getContent(imageRef);
      cardData.imageUrl = cardImage?.getUrl();
      cardData.summary = '<p>' + abstract + '</p>';
      cardData.linkLabel = title;

      cardData.linkUrl = cardDoc.getUrl();
      if (_links?.site.type === 'internal') {
        cardData.linkUrl = _links?.site!.href;
     }
   }

    cardData.title = section.cardTitle || cardData.title;
    if (!cardData.imageUrl) {
      const cardImage = section.cardImage && page.getContent(section.cardImage);
      cardData.imageUrl = cardImage?.getUrl();
    }
    cardData.summary = section.cardSummary || cardData.summary;
    cardData.linkLabel = section.cardLinkLabel || cardData.linkLabel;
    cardData.linkUrl = section.cardLinkUrl || cardData.linkUrl;

    switch (section.cardType) {
      case "promo":
        card = <PromoCard  {...cardData} />;
        break;
      case "care":
        card = <CareCard {...cardData} />;
        break;
      case "panel":
      default:
        card = <PanelCard {...cardData} />;
   }
 }

  let mainLink;

  if (section.mainLinkLabel && section.mainLinkUrl) {
    const mainLinkType = section.mainLinkType ? section.mainLinkType : 'actionLink';

    switch (mainLinkType) {
      case "primaryButton":
        mainLink =
          <Button href={section.mainLinkUrl} disabled={section.mainLinkDisabled}>
            {section.mainLinkLabel}
          </Button>
        break;
      case "secondaryButton":
        mainLink =
          <Button href={section.mainLinkUrl} disabled={section.mainLinkDisabled} secondary>
            {section.mainLinkLabel}
          </Button>
        break;
      case "actionLink":
      default:
        mainLink =
          <ActionLink href={section.mainLinkUrl}>
            {section.mainLinkLabel}
          </ActionLink>
   }
 }

  return (
    <Row>
      <Col width="two-thirds">
        <div dangerouslySetInnerHTML={{__html: section.mainBody.value}} />
        {mainLink}
      </Col>
      <Col width="one-third">{card}</Col>
    </Row>
  );
}

export function PageContent(props: BrProps) {
  const {document: documentRef} = props.component.getModels();
  const document = documentRef && props.page.getContent(documentRef);

  if (!document) {
    return null;
 }

  const {sections} = document.getData<DocumentData>();

  return (
    <>
      <Container>
      {sections.map((section: any, index: number) => (
        <Section key={index} section={section} />
      ))}
      </Container>
      <br/>
    </>
  );
}
