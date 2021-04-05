import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Hero() {
  return (
    <Wrapper>
      <div className='images'>
        <img
          src='https://cdn.pixabay.com/photo/2016/12/09/11/50/romania-1894745_1280.jpg'
          alt=''
        />
        <img
          src='https://cdn.pixabay.com/photo/2016/01/19/17/59/city-1150012_1280.jpg'
          alt=''
        />
      </div>
      <div className='wrapper'></div>
      <div className='text-wrapper'>
        <h2>What do you love about living in the country / city?.</h2>
        <a href='#cards'>
          <button>ADD YOUR THOUGHTS</button>
        </a>
      </div>
      <div className='header'>
        <Link to='/'>
          <h2>COUNTRY vs CITY</h2>
        </Link>
        <Link to='/subscribe'>
          <button>subscribe</button>
        </Link>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;

  .images {
    display: grid;
    grid-template-columns: 1fr 1fr;

    img {
      width: 100%;
      height: 100vh;
      object-fit: cover;
    }
  }
  .wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    background: black;
    top: 0;
    left: 0;
    opacity: 0.4;
  }
  .text-wrapper {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    h2 {
      color: white;
      padding: 0 40px;
    }
    a {
      text-decoration: none;
    }

    button {
      margin-top: 1.5em;
      padding: 10px 20px;
      cursor: pointer;
      border: none;
      outline: none;
      border-radius: 3px;
      background: #4eafa8;
      color: white;
      font-size: 12px;
      font-weight: bold;
      transition: 0.3s all linear;

      &:hover {
        background: #157972;
      }
    }
  }
  .header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 20px;

    a {
      text-decoration: none;
    }

    h2 {
      color: white;
      font-size: 16px;
      letter-spacing: 1px;
    }
    button {
      border: none;
      outline: none;
      cursor: pointer;
      text-transform: capitalize;
      padding: 5px 10px;
      letter-spacing: 1px;
      border-radius: 3px;
      background: white;
    }
  }
`;

export default Hero;
