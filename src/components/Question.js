import React from "react";
import { useGlobalContext } from "../context/context";
import styled from "styled-components";

function Question() {
  const [text, setText] = React.useState("");
  const [value, setValue] = React.useState("country");
  const [alert, setAlert] = React.useState({
    show: false,
    content: "",
    color: "",
  });

  const { addCard } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text) {
      setAlert({ show: false, content: "", color: "" });
      addCard(value, text);
      setAlert({
        show: true,
        content: `One Item Added To ${value.toUpperCase()}`,
        color: "green",
      });
      setText("");
    } else {
      setAlert({
        show: true,
        content: "Enter something to add !!!",
        color: "darkred",
      });
    }
  };

  React.useEffect(() => {
    const timout = setTimeout(() => {
      setAlert({ show: false, content: "", color: "" });
    }, 3000);

    return () => clearTimeout(timout);
  }, [alert.show]);

  return (
    <Wrapper>
      <h2 className='qst'>
        What do you love about living in the country / city?.
      </h2>
      <div className='question'>
        What I love best about living in{" "}
        <select value={value} onChange={(e) => setValue(e.target.value)}>
          <option value='country'>Country</option>
          <option value='city'>City</option>
        </select>{" "}
        is...
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Add your reason here'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type='submit'>ADD</button>
      </form>
      {alert.show && (
        <p className='error-text' style={{ color: alert.color }}>
          {alert.content}
        </p>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .question {
    font-size: 17px;
    color: #222;
    letter-spacing: 1px;
    margin-top: 1.5em;

    select {
      outline: none;
      letter-spacing: 1px;
      outline: none;
      border: none;
      padding: 2px 4px;
    }
  }
  form {
    display: grid;
    grid-template-columns: auto 100px;
    margin-top: 1em;
    width: 400px;
    max-width: 95%;

    input {
      padding: 5px;
      outline: none;
      width: 100%;
    }

    button {
      cursor: pointer;
      outline: none;
      border: none;
      background: #4eafa8;
      color: white;
      font-weight: bold;
      transition: 0.3s all linear;

      &:hover {
        background: #157972;
      }
    }
  }
  .error-text {
    color: red;
    font-size: 14px;
    margin-top: 5px;
  }
  .qst {
    text-align: center;
    margin-top: 1.5em;
    font-size: 20px;
    color: #4eafa8;
  }
`;

export default Question;
