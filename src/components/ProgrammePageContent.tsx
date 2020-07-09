import {BrProps, BrPageContext} from "@bloomreach/react-sdk";
import React from "react";
import {
  ActionLink,
  Button,
  CareCard as NHSUKCareCard,
  Col,
  Container,
  ErrorMessage,
  Fieldset,
  Images,
  Panel,
  Promo,
  Row,
  SummaryList
} from "nhsuk-react-components";

interface CardData {
  title: string;
  imageUrl: string | undefined;
  summary: string;
  linkLabel: string;
  linkUrl: string | undefined;
}

function getFormattedDateForProgrammeStatus(time: number) {
  return new Date(time).toLocaleString('en-GB', {year: 'numeric', month: 'long'});
}

function getProgrammeStatus(numberOfVacancies: number, reopeningCalendar: number | undefined) {
  let programmeStatus = 'Open';
  if (!numberOfVacancies) {
    programmeStatus = 'Closed';
 }

  if (!numberOfVacancies && reopeningCalendar) {
    programmeStatus = 'Closed - Reopens ' + getFormattedDateForProgrammeStatus(reopeningCalendar);
 }

  return programmeStatus;
}

function getPartTimeContactTypeLabel(partTimeContactType: string | undefined) {
  if (!partTimeContactType) {
    return '';
 }

  let partTimeContactTypeLabel = '';
  switch (partTimeContactType) {
    case 'ltft':
      partTimeContactTypeLabel = 'LTFT Applications considered';
      break;
    default:
      break;
 }

  return partTimeContactTypeLabel;
}

function getQualificationTypeLabel(qualificationType: string | undefined) {
  if (!qualificationType) {
    return '';
 }

  let qualificationTypeLabel = '';
  switch (qualificationType) {
    case 'cct':
      qualificationTypeLabel = 'Certificate of Completion of Training';
      break;
    default:
      break;
 }

  return qualificationTypeLabel;
}

function getEducationTypeLabel(educationType: string | undefined) {
  if (!educationType) {
    return '';
 }

  let educationTypeLabel = '';
  switch (educationType) {
    case 'higher':
      educationTypeLabel = 'Higher';
      break;
    default:
      break;
 }

  return educationTypeLabel;
}

function ProgrammeDetails({trainingType, document} : any) {
  const {model: {
    competitionRatio,
    contractType,
    durationInYears,
    educationType,
    entryRequirementsLinkUrl,
    gmcNTSScore,
    numberOfVacancies,
    partTimeContractType,
    qualification,
    reopeningCalendar,
    totalPosts
 }} = document;

  // Builds programme status
  let status = 'Open';
  if (!numberOfVacancies) {
    status = 'Closed';
 }

  if (!numberOfVacancies && reopeningCalendar) {
    status = 'Closed - Reopens ' + getFormattedDateForProgrammeStatus(reopeningCalendar);
 }

  const programmeStatus = getProgrammeStatus(numberOfVacancies, reopeningCalendar);

  return (
    <Panel.Group>
      <Panel>
        <SummaryList noBorder>
          <SummaryList.Row>
            <SummaryList.Key>Status</SummaryList.Key>
            <SummaryList.Value>
              {numberOfVacancies === 0
                ? <ErrorMessage visuallyHiddenText={status}>
                    {programmeStatus}
                  </ErrorMessage>
                : <span style={{color: 'green', fontWeight: 600}}>
                    {programmeStatus}
                  </span>
             }
            </SummaryList.Value>
          </SummaryList.Row>
          <SummaryList.Row>
            <SummaryList.Key>Number of vacancies</SummaryList.Key>
            <SummaryList.Value>{numberOfVacancies}/{totalPosts}</SummaryList.Value>
          </SummaryList.Row>
          <SummaryList.Row>
            <SummaryList.Key>Competition ratio</SummaryList.Key>
            <SummaryList.Value>{competitionRatio}</SummaryList.Value>
          </SummaryList.Row>
          <SummaryList.Row>
            <SummaryList.Key>GMC NTS Score</SummaryList.Key>
            <SummaryList.Value>{gmcNTSScore}</SummaryList.Value>
          </SummaryList.Row>
          <SummaryList.Row>
            <SummaryList.Key>Entry requirements</SummaryList.Key>
            <SummaryList.Value>
              <a href={entryRequirementsLinkUrl}> View person specification</a>
            </SummaryList.Value>
          </SummaryList.Row>
        </SummaryList>
      </Panel>
      <Panel>
        <SummaryList noBorder>
          <SummaryList.Row>
            <SummaryList.Key>Learning stage</SummaryList.Key>
            <SummaryList.Value>{trainingType}</SummaryList.Value>
          </SummaryList.Row>
          <SummaryList.Row>
            <SummaryList.Key>Programme type</SummaryList.Key>
            <SummaryList.Value>{getEducationTypeLabel(educationType)}</SummaryList.Value>
          </SummaryList.Row>
          <SummaryList.Row>
            <SummaryList.Key>Duration</SummaryList.Key>
            <SummaryList.Value>{durationInYears} Years, {contractType}</SummaryList.Value>
          </SummaryList.Row>
          <SummaryList.Row>
            <SummaryList.Key>Part time offered</SummaryList.Key>
            <SummaryList.Value>{getPartTimeContactTypeLabel(partTimeContractType)}</SummaryList.Value>
          </SummaryList.Row>
          <SummaryList.Row>
            <SummaryList.Key>Qualification</SummaryList.Key>
            <SummaryList.Value>{getQualificationTypeLabel(qualification)}</SummaryList.Value>
          </SummaryList.Row>
        </SummaryList>
      </Panel>
    </Panel.Group>
  )
}

function KeyStaffs({keyStaffs}: any) {
  const page = React.useContext(BrPageContext);

  if (!keyStaffs || !page) {
    return null;
  }

  let keyStaffPanelGroups = [];
  let keyStaffPanels = [];
  for (const [index, keyStaffRef] of keyStaffs.entries()) {
    const keyStaffDoc = page.getContent(keyStaffRef);

    if (!keyStaffDoc) {
      continue;
    }

    const {name, title, department, image: imageRef} = keyStaffDoc.getData<DocumentData>();

    const image = imageRef && page.getContent(imageRef);

    keyStaffPanels.push(
      <Panel key={index}>
        {image &&
          <Images
            src={image.getUrl()}
            alt={name}
            srcSet={image.getUrl() + ' 640w'} />
        }
        <h3>{name}</h3>
        <p>{department}</p>
        <p>{title}</p>
      </Panel>
    );

    if (((index + 1) % 3 === 0) || (index + 1 === keyStaffs.length)) {

      // Adds empty promo cards to fill in the last row with 3 cards
      // in case if it contains less than 3
      if (((index + 1) % 3 !== 0)) {
        for (let j = 0; j < 3 - ((index + 1) % 3); j++) {
          keyStaffPanels.push(
            <Panel key={index + j + 1} style={{visibility: 'hidden'}}>
            </Panel>
          );
        }
      }

      keyStaffPanelGroups.push(
        <Panel.Group key={(index + 1) / 3}>
          {keyStaffPanels}
        </Panel.Group>
      );

      keyStaffPanels = [];
    }
  }

  return(
    <>
      <h2>Key Staff</h2>
      {keyStaffPanelGroups}
    </>
  );
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
        <Promo.Description>
          <div dangerouslySetInnerHTML={{__html: cardData.summary}} />
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

function Section({sectionIndex, trainingType, document} : any) {
  const page = React.useContext(BrPageContext);
  const {model: {programmeSections}} = document;
  const section = programmeSections[sectionIndex];
  let card;

  if (section.cardType) {

    // Builds CardData
    let cardData = {} as CardData;
    const cardDoc = section.cardDocument && page?.getContent(section.cardDocument);

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
    const cardImage = section.cardImage && page?.getContent(section.cardImage);
    cardData.imageUrl = cardImage?.getUrl();
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

  let additionalSections;

  if (section.renderProgrammeDetails) {
    additionalSections = <ProgrammeDetails trainingType={trainingType} document={document} />;
 }

  if (section.renderKeyStaffSectionBelowThisSection) {
    additionalSections = <KeyStaffs keyStaffs={document.model.keyStaffs} />;
 }

  return (
    <>
      <Row>
        <Col width="two-thirds">
          <div dangerouslySetInnerHTML={{__html: section.mainBody.value}} />
          {mainLink}
        </Col>
        <Col width="one-third">{card}</Col>
      </Row>
      <Row>
        <Col width="full">
          {additionalSections}
        </Col>
      </Row>
    </>
  );
}

export function ProgrammePageContent(props: BrProps) {
  const {subSpecialty, regionName, trainingType, document: documentRef} = props.component.getModels();
  const document = documentRef && props.page.getContent(documentRef);

  if (!document) {
    return null;
 }

  const {programmeSections} = document.getData<DocumentData>();

  return (
    <>
      <Container>
        <Fieldset>
          <Fieldset.Legend>{trainingType}</Fieldset.Legend>
        </Fieldset>
        <Fieldset>
          <Fieldset.Legend isPageHeading>{subSpecialty} at {regionName}</Fieldset.Legend>
        </Fieldset>
        {programmeSections.map((section: any, index: number) => (
          <Section key={index} sectionIndex={index} trainingType={trainingType} document={document} />
        ))}
      </Container>
      <br/>
    </>
  );
}
