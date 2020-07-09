import React from 'react';
import { BrComponentContext, BrManageMenuButton, BrPageContext } from '@bloomreach/react-sdk';
import { Header, Button, Form, Breadcrumb } from "nhsuk-react-components";

interface HeaderTheme {
  whiteHeaderBg: boolean,
  orgName: string,
  orgSplit: string,
  orgDescriptor: string
}

interface HeaderThemeModels {
  headerTheme: HeaderTheme
}

interface MenuLinkProps {
  item: MenuModels['menu']['siteMenuItems'][0];
}

function MenuLink({ item }: MenuLinkProps) {
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

  const currentUrl = page.toJSON()!._links!.site.href;

  // Temp. hack to render `Logout` button only for spring-security
  // secured `/user-home-page` page
  let renderLogoutButton = false;
  if (currentUrl.endsWith('/user-home-page')) {
    renderLogoutButton = true;
  }

  // Builds logo url based on current page path
  const channels = process.env.REACT_APP_BR_SUPPORTED_CHANNELS!.split(',');
  let logoUrl = '/site';
  channels.forEach((channel) => {
    if (currentUrl.indexOf('/site/' + channel) !== -1 || currentUrl.indexOf('/site/_cmsinternal/' + channel) !== -1) {
      logoUrl = '/site/' + channel;
    }
  });

  const { menu } = component.getModels<MenuModels>();
  const { headerTheme } = component.getModels<HeaderThemeModels>();

  return (
    <>
    <Header orgName={ headerTheme.orgName } orgSplit={ headerTheme.orgSplit } orgDescriptor={headerTheme.orgDescriptor!} white={ headerTheme.whiteHeaderBg }>
      <Header.Container>
        <Header.Logo href={ logoUrl} />
        <Header.Content>
          <Header.MenuToggle />
          <Header.Search action={"/site/search"}/>
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

    {/* <Breadcrumb>
      <Breadcrumb.Item href="/level/one">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="/level/two">Training</Breadcrumb.Item>
      <Breadcrumb.Item href="/level/three">Specialty</Breadcrumb.Item>
      <Breadcrumb.Item href="/level/three">Surgery</Breadcrumb.Item>
      <Breadcrumb.Back href="/level/three">Paediatric Surgery</Breadcrumb.Back>
    </Breadcrumb> */}
    </>
  );
}
