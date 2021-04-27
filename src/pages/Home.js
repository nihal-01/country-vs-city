import React from "react";
import Question from "../components/Question";
import Cards from "../components/Cards";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { useGlobalContext } from "../context/context";
import logo from "../assets/Transparent.png";
import subscribeImg from "../assets/subscription.png";

import { FaArrowUp } from "react-icons/fa";

function Home() {
  const {
    isLogged,
    saveSubscribeData,
    modalOpen,
    setModalOpen,
    unSubscribe,
  } = useGlobalContext();

  const [value, setValue] = React.useState({
    name: "",
    email: "",
    intrest: "country",
  });

  const [currentPosition, setCurrentPosition] = React.useState(window.scrollY);

  const handleSubmit = (e) => {
    e.preventDefault();

    saveSubscribeData(value);
    setModalOpen(false);
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  function logit() {
    setCurrentPosition(window.pageYOffset);
  }

  React.useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", logit);
    }
    watchScroll();
    return () => {
      window.removeEventListener("scroll", logit);
    };
  });

  return (
    <Wrapper>
      {modalOpen && (
        <div className='modal-wrapper'>
          <div className='modal'>
            <button className='btn-close' onClick={() => setModalOpen(false)}>
              x
            </button>
            <div>
              <img src={subscribeImg} alt='' />
              <h2>Like fun Country or City Stuff??</h2>
              <p>
                Get added to our mailing list for exclusive deals on fun stuff
                that only a country/city lover would love!
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <h3>I'm in!</h3>
              <p>
                Adding yourself to our list qualifies you to be the first to
                recive discounts and exclusive first looks at the coolest things
                on the internet that Country/City Lovers will.. well.. fall in
                love with.
              </p>
              <input
                required
                type='text'
                name='name'
                placeholder='First and last name'
                onChange={handleChange}
              />
              <br />
              <input
                required
                type='text'
                placeholder='example@email.com'
                name='email'
                onChange={handleChange}
              />
              <br />
              <label className='label'>What are you interested in?</label>
              <br />
              <select
                name='intrest'
                value={value.intrest}
                onChange={handleChange}>
                <option value='country'>Country stuff</option>
                <option value='city'>City stuff</option>
              </select>
              <br />
              <button type='submit'>SUBSCRIBE</button>
            </form>
          </div>
        </div>
      )}

      {currentPosition > 90 && !modalOpen && (
        <div className='go-to-top'>
          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              })
            }>
            <FaArrowUp />
          </button>
        </div>
      )}

      <nav>
        <Link to='/'>
          <img src={logo} alt='' className='logo-png' />
        </Link>

        {isLogged && (
          <button className='unsubscribe-btn' onClick={() => unSubscribe()}>
            Unsubscribe
          </button>
        )}
      </nav>
      <div className='question-card-wrapper' id='cards'>
        <Question />
        <Cards />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  min-height: calc(100vh - 4em);
  .question-card-wrapper {
    width: 90vw;
    margin: 0 auto;
  }
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 2em;

    h2 {
      font-size: 16px;
      padding-left: 30px;
    }
    a {
      padding-right: 30px;
      color: black;
      text-decoration: none;

      &:hover {
        color: #4e78af;
      }
    }
  }
  .logo-png {
    width: 170px;
    padding: 10px;
  }
  .modal-wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #000000d1;
    z-index: 1;
    overflow-y: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    .modal {
      background: white;
      width: 100%;
      max-width: 600px;
      position: relative;
      margin: 20px;

      .btn-close {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: none;
        outline: none;
        background: white;
        font-weight: bold;
      }

      div {
        background: #a9c5ff;
        text-align: center;
        padding: 10px;

        h2 {
          color: black;
          font-size: 16px;
          margin-top: 1em;
        }
        p {
          font-size: 14px;
          letter-spacing: 1px;
          margin-top: 0.5em;
          margin-bottom: 10px;
        }
      }

      form {
        text-align: center;
        padding: 10px;

        h3 {
          margin-top: 1.5em;
        }
        p {
          font-size: 14px;
          letter-spacing: 1px;
          margin-top: 0.5em;
          margin-bottom: 1em;
        }
        input {
          margin-bottom: 0.5em;
          outline: none;
          width: 80%;
          padding: 6px;
          background: #e8f0fe;
          border: none;
          letter-spacing: 0.5px;
          font-size: 12px;
        }
        label {
          font-size: 13px;
        }
        select {
          width: 80%;
          outline: none;
          padding: 3px;
          border: none;
          background: #e8f0fe;
          margin-top: 5px;
          letter-spacing: 1px;
        }
        button {
          margin-top: 1em;
          border: none;
          outline: none;
          width: 80%;
          background: #54b385;
          color: white;
          padding: 5px;
          font-weight: bold;
          cursor: pointer;
          margin-bottom: 7px;
        }
      }
    }
  }

  @media (min-width: 720px) {
    .modal {
      display: grid;
      grid-template-columns: 1fr 1fr;

      .btn-close {
        background: #a9c5ff !important;
      }
    }
  }

  .unsubscribe-btn {
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }

  .go-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 1;

    button {
      border: none;
      outline: none;
      background: black;
      color: white;
      width: 35px;
      height: 35px;
      cursor: pointer;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export default Home;
