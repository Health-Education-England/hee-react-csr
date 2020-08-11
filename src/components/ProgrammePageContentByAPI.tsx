import {BrProps} from "@bloomreach/react-sdk";
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

function ProgrammeDetails({programme} : any) {
  const {
    trainingType,
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
  } = programme;

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
  let keyStaffPanelGroups = [];
  let keyStaffPanels = [];
  for (const [index, keyStaff] of keyStaffs.entries()) {

    if (!keyStaff) {
      continue;
    }

    const {name, title, department, imageUrl} = keyStaff;

    keyStaffPanels.push(
      <Panel key={index}>
        {imageUrl &&
          <Images
            src={imageUrl}
            alt={name}
            srcSet={imageUrl + ' 640w'} />
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

function Section({sectionIndex, programme} : any) {
  const {programmeSections} = programme;
  const section = programmeSections[sectionIndex];
  let card;

  if (section.cardType) {

    // Builds CardData
    let cardData = {} as CardData;
    cardData.title = section.cardTitle;
    cardData.imageUrl = section.cardImageUrl;
    cardData.summary = section.cardSummary;
    cardData.linkLabel = section.cardLinkLabel;
    cardData.linkUrl = section.cardLinkUrl;

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
    additionalSections = <ProgrammeDetails programme={programme} />;
 }

  if (section.renderKeyStaffSectionBelowThisSection) {
    additionalSections = <KeyStaffs keyStaffs={programme.keyStaffs} />;
 }

  return (
    <>
      <Row>
        <Col width="two-thirds">
          <div dangerouslySetInnerHTML={{__html: section.mainBody}} />
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

export function ProgrammePageContentByAPI(props: BrProps) {
  const {programme} = props.component.getModels();

  if (!programme) {
    return null;
  }

  const {subSpecialtyName, trainingType, regionName, programmeSections} = programme;

  return (
    <>
      <Container>
        <Fieldset>
          <Fieldset.Legend>{trainingType}</Fieldset.Legend>
        </Fieldset>
        <Fieldset>
          <Fieldset.Legend isPageHeading>{subSpecialtyName} at {regionName}</Fieldset.Legend>
        </Fieldset>
        {programmeSections.map((section: any, index: number) => (
          <Section key={index} sectionIndex={index} programme={programme} />
        ))}
      </Container>
      <br/>
    </>
  );
}
