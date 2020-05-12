import React from 'react';
import { BrComponentContext, BrManageMenuButton, BrPageContext } from '@bloomreach/react-sdk';
import { Header, Button, Form } from "nhsuk-react-components";

interface MenuLinkProps {
  item: MenuModels['menu']['siteMenuItems'][0];
}

function MenuLink({ item }: MenuLinkProps) {
  // const page = React.useContext(BrPageContext)!;

  if (!item._links.site) {
    return <Header.NavItem disabled>{item.name}</Header.NavItem>;
  }

  return <Header.NavItem href={item._links.site.href}>{item.name}</Header.NavItem>;

  /* if (item._links.site.type === TYPE_LINK_EXTERNAL) {
    return <Header.NavItem href={item._links.site.href}>{item.name}2</Header.NavItem>;
  }
  return <Header.NavItem href={page.getUrl(item._links.site)}>{item.name}3</Header.NavItem>; */
}

function Logout() {
  return (
    <>
    <br/><br/>&nbsp;
    <Form action="/site/logout" method="post">
      &nbsp;&nbsp;<Button secondary>Logout</Button>
    </Form>
    </>
  );
}

export function Menu() {
  const component = React.useContext(BrComponentContext);
  const page = React.useContext(BrPageContext);

  if (!component || !page) {
    return null;
  }

  // Temp. hack to render `Logout` button only for spring-security
  // secured `/user-home-page`
  let renderLogoutButton = false;
  if (page.toJSON()!._links!.site.href.endsWith('/user-home-page')) {
    renderLogoutButton = true;
  }

  const { menu } = component.getModels<MenuModels>();

  return (
    <Header orgName="Health Education England" orgSplit="Library and Knowledge Services" orgDescriptor="NHS Foundation Trust">
      <Header.Container>
        <Header.Logo href="/site" />
        <Header.Content>
          <Header.MenuToggle />
          <Header.Search />
          { renderLogoutButton && <Logout /> }
        </Header.Content>
      </Header.Container>
      {/* <Header.Container>
        <Header.Content>
          <Button href="/login">Login</Button>
        </Header.Content>
      </Header.Container> */}
      <Header.Nav className={page.isPreview() ? 'has-edit-button' : ''}>
        {/* <Header.NavItem href="/" mobileOnly>
          Home
        </Header.NavItem> */}
        <BrManageMenuButton menu={menu} />
        { menu.siteMenuItems.map((item, index) => (
          <MenuLink key={index} item={item} />
        )) }
      </Header.Nav>
    </Header>
  );
}
