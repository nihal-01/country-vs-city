import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Subscribe() {
  return (
    <Wrapper>
      <nav>
        <Link to='/'>
          <h2>COUNTRY vs CITY</h2>
        </Link>
        <Link to='/'>Home</Link>
      </nav>
      <div className='sub-wrapper'>
        <div>
          <h2>Like fun Country or City Stuff??</h2>
          <p>
            Get added to our mailing list for exclusive deals on fun stuff that
            only a country/city lover would love!
          </p>
          <div className='form-wrapper'>
            <h3>I'm in!</h3>
            <p>
              Adding yourself to our list qualifies you to be the first to
              recive discounts and exclusive first looks at the coolest things
              on the internet that Country/City Lovers will.. well.. fall in
              love with.
            </p>
            <form onSubmit={(e) => e.preventDefault()}>
              <input type='text' id='name' placeholder='First and last name' />
              <br />
              <input type='text' placeholder='example@email.com' id='email' />
              <br />
              <label className='label'>What are you interested in?</label>
              <br />
              <select name='' id=''>
                <option value='country'>Country stuff</option>
                <option value='city'>City stuff</option>
              </select>
              <br />
              <button type='submit'>SUBSCRIBE</button>
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
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
  .sub-wrapper {
    display: flex;
    justify-content: center;
    max-width: 100%;
    text-align: center;
    margin-top: 2em;
    padding: 15px;

    h2 {
      font-size: 16px;
      letter-spacing: 1px;
      color: #4eafa8;
    }
    p {
      font-size: 14px;
      letter-spacing: 1px;
      margin-top: 0.5em;
    }

    .form-wrapper {
      background: #4eafa8;
      margin-top: 2em;
      padding: 25px;
      max-width: 800px;

      h3 {
        color: white;
      }

      p {
        color: white;
        letter-spacing: 0px;
        margin-bottom: 1em;
        line-height: 19px;
        letter-spacing: 0.5px;
      }

      input {
        padding: 6px 8px;
        width: 100%;
        max-width: 200px;
        margin-bottom: 0.8em;
        outline: none;
        border: none;
        font-size: 12px;
      }

      .label {
        color: #222;
        font-size: 14px;
      }

      select {
        outline: none;
        letter-spacing: 1px;
        margin-top: 0.3em;
        border: none;
        background: white;
      }

      button {
        background: #4d4d4d;
        margin-top: 1.2em;
        border: none;
        outline: none;
        cursor: pointer;
        color: white;
        width: 100%;
        max-width: 200px;
        height: 27px;
        letter-spacing: 1px;
        font-weight: bold;
      }
    }
  }
`;

export default Subscribe;
