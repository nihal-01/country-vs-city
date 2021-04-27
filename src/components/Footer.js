import React from "react";
import styled from "styled-components";
import { FaInstagram, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <Wrapper>
      <div className='copyright-wrapper'>
        <p>© 2021 CountryFolkVsCityFolk All rights reserved</p>
      </div>
      <div className='social-media-wrapper'>
        <button>
          <FaTwitter />
        </button>
        <button>
          <FaInstagram />
        </button>
        <button>
          <FaFacebook />
        </button>
        <button>
          <FaLinkedin />
        </button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  width: 100%;
  background: #333;
  height: 4em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;

  .copyright-wrapper {
    p {
      color: white;
    }
  }

  .social-media-wrapper {
    button {
      margin-left: 15px;
      background: transparent;
      border: none;
      cursor: pointer;
      outline: none;
      color: white;
      font-size: 18px;
    }
  }
`;

export default Footer;
