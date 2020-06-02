import { BrProps, BrPageContext } from '@bloomreach/react-sdk';
import React from 'react';
import { Panel, ContentsList } from "nhsuk-react-components";

export function Article(props: BrProps) {
  const { articleDocument: articleDocumentRef } = props.component.getModels();
  const articleDocument = articleDocumentRef && props.page.getContent(articleDocumentRef);
  const page = React.useContext(BrPageContext);

  if (!articleDocument || !page) {
    return null;
  }

  const { title, summary, relatedNews } = articleDocument.getData<DocumentData>();

  // Builds Related Articles Links
  let relatedLinks: any[] = [];
  for (let relatedNewsRef of relatedNews) {
    const relatedArticleDocument = relatedNewsRef && props.page.getContent(relatedNewsRef);

    if (!relatedArticleDocument) {
      continue;
    }

    const { title, _links } = relatedArticleDocument.getData<DocumentData>();

    let relatedArticleUrl = relatedArticleDocument.getUrl();
    if (_links?.site.type === 'internal') {
      relatedArticleUrl = _links?.site!.href;
    }

    relatedLinks.push(
      <ContentsList.Item href={relatedArticleUrl} key={relatedArticleUrl}>
        {title}
      </ContentsList.Item>
    );
  }

  return (
    <>
      <Panel>
        <h2>{ title }</h2>
        <div dangerouslySetInnerHTML={{ __html: summary.value }} />
      </Panel>
      <ContentsList>
        <h3>Related Articles</h3>
        { relatedLinks }
      </ContentsList>
    </>
  );
}
