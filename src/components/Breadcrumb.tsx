import React from 'react';
import {BrProps} from '@bloomreach/react-sdk';
import {Breadcrumb as NHSUKBreadCrumb} from "nhsuk-react-components";

interface Link {
  label: string;
  url: string;
}

export function Breadcrumb(props: BrProps) {
  const {breadCrumbLinks} = props.component.getModels();

  if (!breadCrumbLinks) {
    return null;
  }

  return (
    <NHSUKBreadCrumb>
      {breadCrumbLinks.map((link: Link, index: string | number | undefined) => {
        return (
          <NHSUKBreadCrumb.Item href={link.url}>{link.label}</NHSUKBreadCrumb.Item>
        )
      })}
    </NHSUKBreadCrumb>
  );
}
