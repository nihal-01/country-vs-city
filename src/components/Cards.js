import React from "react";
import styled from "styled-components";
import CountryCard from "./CountryCard";
import CityCard from "./CityCard";

import { useGlobalContext } from "../context/context";

function Cards() {
  const { countryData, cityData, loading, dataError } = useGlobalContext();

  if (loading) {
    return (
      <div className='loading-wrapper'>
        <div className='loading'></div>
      </div>
    );
  }
  if (dataError) {
    return <p className='data-error'>No Cards Found !!!</p>;
  }
  return (
    <Wrapper>
      <section className='card-wrapper'>
        <CountryCard data={countryData} />
        <CityCard data={cityData} />
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 2em;

  .card-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 700px;
    gap: 3em;
  }

  @media (max-width: 600px) {
    .card-wrapper {
      display: block;
    }
  }
`;

export default Cards;
