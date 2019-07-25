import React from "react";
import styled from "@emotion/styled";
import * as Styles from "../../common.styles";

const FooterWrapper = styled.footer`
  ${Styles.container}
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
`;

const Copyright = styled.section`
  text-align: right;
  color: #f0eed5;
  white-space: nowrap;
`;

const Logo = styled.a`
  &:hover, &:focus, &:active {
    opacity: 0.8;
  }
`;

const Text = styled.p`
  margin: 10px 0px 0px;
`;

const Link = styled.a`
  color: #ff9749;
  transition: color ease-in-out 250ms;

  &:hover, &:focus, &:active {
    color: #f00000;
  }
`;

function AppFooter() {
  return (
    <FooterWrapper>
      <a
        rel="license"
        href="http://creativecommons.org/licenses/by-nc-nd/4.0/">
        <img
          src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png"
          alt="Creative Commons License"
          width="88"
          height="31"
        />
      </a>
      <Copyright>
        <Logo
          href="https://htmlacademy.ru">
          <img
            src="img/logo-htmla.svg"
            alt="HTML Academy"
            width="144"
            height="49"
          />
        </Logo>
        <Text>
          {`Сделано в `}
          <Link href="https://htmlacademy.ru">{`HTML Academy`}</Link>
        </Text>
      </Copyright>
    </FooterWrapper>
  );
}

export default AppFooter;
