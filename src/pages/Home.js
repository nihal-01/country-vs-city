import React from "react";
import Question from "../components/Question";
import Cards from "../components/Cards";
import Hero from "../components/Hero";

import styled from "styled-components";

function Home() {
  return (
    <Wrapper>
      <Hero />
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
    min-height: 100vh;
  }
`;

export default Home;
