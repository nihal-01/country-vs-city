import React from "react";
import Question from "../components/Question";
import Cards from "../components/Cards";
import { Link } from "react-router-dom";

import styled from "styled-components";

function Home() {
  return (
    <Wrapper>
      <nav>
        <Link to='/'>
          <h2>COUNTRY vs CITY</h2>
        </Link>
        <Link to='/subscribe'>Subscribe</Link>
      </nav>
      <div className='question-card-wrapper' id='cards'>
        <Question />
        <Cards />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .question-card-wrapper {
    width: 90vw;
    margin: 0 auto;
  }
  nav {
    display: flex;
    justify-content: space-between;
    height: 3em;
    border-bottom: 1px solid #dadcde;
    align-items: center;

    h2 {
      font-size: 16px;
      padding-left: 30px;
    }
    a {
      padding-right: 30px;
      color: black;
      text-decoration: none;

      &:hover {
        color: #4eafa8;
      }
    }
  }
`;

export default Home;
