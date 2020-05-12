import React from 'react';
import { Footer as NHSFooter } from "nhsuk-react-components";

// Renders hardcoded Footer for now
export default function Footer() {
  return (
    <NHSFooter>
      <NHSFooter.List columns>
        <NHSFooter.ListItem href="https://www.nhs.uk/nhs-sites/">NHS sites</NHSFooter.ListItem>
        <NHSFooter.ListItem href="https://www.nhs.uk/about-us/">About us</NHSFooter.ListItem>
        <NHSFooter.ListItem href="https://www.nhs.uk/contact-us/">Contact us</NHSFooter.ListItem>
        <NHSFooter.ListItem href="https://www.nhs.uk/personalisation/login.aspx">
          Profile editor login
        </NHSFooter.ListItem>
        <NHSFooter.ListItem href="https://www.nhs.uk/about-us/sitemap/">Sitemap</NHSFooter.ListItem>
        <NHSFooter.ListItem href="https://www.nhs.uk/accessibility/">Accessibility</NHSFooter.ListItem>
        <NHSFooter.ListItem href="https://www.nhs.uk/our-policies/">Our policies</NHSFooter.ListItem>
        <NHSFooter.ListItem href="https://www.nhs.uk/our-policies/cookies-policy/">
          Cookies
        </NHSFooter.ListItem>
      </NHSFooter.List>
      <NHSFooter.Copyright>&copy; Crown copyright</NHSFooter.Copyright>
    </NHSFooter>
  );
}
