import { BrProps } from '@bloomreach/react-sdk';
import React from 'react';
import {
  Col,
  Container,
  ErrorMessage,
  Panel,
  Row,
  Select,
  Table
} from "nhsuk-react-components";

function getFormattedDateForProgrammeStatus(time: number) {
  return new Date(time).toLocaleString('en-GB', {year: 'numeric', month: 'long'});
}

interface Programme {
  self: string,
  contractType: string,
  durationInYears: number,
  numberOfVacancies: number,
  regionName: string,
  regionPageUrl: string,
  reopeningCalendar: number,
  specialty: string
  subSpecialtyName: string
}

export function ProgrammeListingByAPI(props: BrProps) {
  const { programmeListingTitle, currentPageType, programmes } = props.component.getModels();

  const [region, setRegion] = React.useState<string>('All');
  const [subSpecialty, setSubSpecialty] = React.useState<string>('All');

  if (!programmes) {
    return null;
  }

  // Builds region select box component
  const programmeRegions = [...new Set(programmes.map((programme: Programme) => programme.regionName))] as string[];

  let regionSelectBox = [];
  let regionSelectOptions = [];
  if (programmeRegions && programmeRegions.length > 1) {
    programmeRegions.unshift('All');

    for (const [index, regionName] of programmeRegions.entries()) {
      regionSelectOptions.push(
        <Select.Option key={index} value={regionName}>
          {regionName}
        </Select.Option>
      );
    }

    regionSelectBox.push(
      <Select
        key="region"
        id="region"
        label="Filter by Local Team"
        onChange={event => setRegion((event.target as HTMLInputElement).value)}>
        {regionSelectOptions}
      </Select>
    );
  }


  // Builds subspecialty select box component
  const programmeSubSpecialties = [...new Set(programmes.map((programme: Programme) => programme.subSpecialtyName))] as string[];

  let subSpecialtySelectBox = [];
  let subSpecialtySelectOptions = [];
  if (programmeSubSpecialties && programmeSubSpecialties.length > 1) {
    programmeSubSpecialties.unshift('All');

    for (const [index, subSpecialtyName] of programmeSubSpecialties.entries()) {
      subSpecialtySelectOptions.push(
        <Select.Option key={index} value={subSpecialtyName}>
          {subSpecialtyName}
        </Select.Option>
      );
    }

    subSpecialtySelectBox.push(
      <Select
        key="subSpecialty"
        id="sub-specialty"
        label="Filter by Programme type"
        onChange={event => setSubSpecialty((event.target as HTMLInputElement).value)}>
        {subSpecialtySelectOptions}
      </Select>
    );
  }

  let filteredProgrammes = programmes;
  if (region !== 'All') {
    filteredProgrammes = filteredProgrammes.filter((programme: Programme) => programme.regionName === region);
  }

  if (subSpecialty !== 'All') {
    filteredProgrammes = filteredProgrammes.filter((programme: Programme) => programme.subSpecialtyName === subSpecialty);
  }

  let programmeTableRows = [];
  for (const [index, {
    specialty,
    subSpecialtyName,
    self: programmePageUrl,
    regionName,
    regionPageUrl,
    durationInYears,
    contractType,
    numberOfVacancies,
    reopeningCalendar
  }] of filteredProgrammes.entries()) {

    let status = 'Open';
    if (!numberOfVacancies) {
      status = 'Closed';
    }

    if (!numberOfVacancies && reopeningCalendar) {
      status = 'Closed - Reopens ' + getFormattedDateForProgrammeStatus(reopeningCalendar);
    }

    let programmePageUrlPathPrefix = '';
    if ('specialty' === currentPageType) {
      programmePageUrlPathPrefix = specialty + '/' + subSpecialtyName;
    } else if ('subspecialty' === currentPageType) {
      programmePageUrlPathPrefix = subSpecialtyName
    }

    programmePageUrlPathPrefix = programmePageUrlPathPrefix.toLowerCase().replace(' ', '-') + '/programme';

    programmeTableRows.push(
      <Table.Row key={index}>
        <Table.Cell>
          <a href={programmePageUrlPathPrefix + programmePageUrl}>{subSpecialtyName} at {regionName}</a>
        </Table.Cell>
        <Table.Cell>
          <a href={regionPageUrl}>{regionName}</a>
        </Table.Cell>
        <Table.Cell>{durationInYears} Years, {contractType}</Table.Cell>
        <Table.Cell>
          {numberOfVacancies === 0
            ? <ErrorMessage visuallyHiddenText={status}>
                {status}
              </ErrorMessage>
            : <span style={{color: 'green', fontWeight: 600}}>
                {status}
              </span>
          }
        </Table.Cell>
      </Table.Row>
    );
  }

  return (
    <>
      <Container>
        <Row>
          <Col width="full">
            <Panel>
              <h2>{ programmeListingTitle }</h2>
              <Panel.Group>
                <Panel>
                  {regionSelectBox}
                  {subSpecialtySelectBox}
                </Panel>
              </Panel.Group>
              {/* <Details.ExpanderGroup>
                <Details expander>
                  <Details.Summary>List view</Details.Summary>
                  <Details.Text> */}
                  <Table.Panel>
                    <Table>
                      <Table.Head>
                        <Table.Row>
                          <Table.Cell>Training programme</Table.Cell>
                          <Table.Cell>Local team</Table.Cell>
                          <Table.Cell>Duration</Table.Cell>
                          <Table.Cell>Status</Table.Cell>
                        </Table.Row>
                      </Table.Head>
                      <Table.Body>{programmeTableRows}</Table.Body>
                    </Table>
                  </Table.Panel>
                  {/* </Details.Text>
                </Details>
                <Details expander>
                  <Details.Summary>Map view</Details.Summary>
                  <Details.Text>
                    Yet to be implemented
                  </Details.Text>
                </Details>
              </Details.ExpanderGroup> */}
            </Panel>
          </Col>
        </Row>
      </Container>
      <br/>
    </>
  );
}
