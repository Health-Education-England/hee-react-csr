import { BrProps } from '@bloomreach/react-sdk';
import React from 'react';
import { Panel } from "nhsuk-react-components";

export function Article(props: BrProps) {
  const { articleDocument: articleDocumentRef } = props.component.getModels();
  const articleDocument = articleDocumentRef && props.page.getContent(articleDocumentRef);

  if (!articleDocument) {
    return null;
  }

  const { title, summary } = articleDocument.getData<DocumentData>();

  return (
    <Panel>
      <h2>{ title }</h2>
      <div dangerouslySetInnerHTML={{ __html: summary.value }} />
    </Panel>
  );
}
