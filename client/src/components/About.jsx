import React, { useEffect, useState } from "react";
import Physics from "./Physics";

function About() {
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState([]);
  const [display, setDisplay] = useState(false);

  const saveToHistory = (value) => {
    const newHistort = [value, ...history.filter((item) => item !== value)]
    setHistory(newHistort);
    localStorage.setItem("history", JSON.stringify(newHistort))
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setHistory([...history, inputValue]);
    setInputValue("");
    saveToHistory(inputValue);

    window.open(
      `https://www.google.com/search?q=${inputValue}`, "_blank"
    )
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(data);
  },[])

  const clearSearchHistory = () => {
    localStorage.removeItem("history");
    setHistory([]);
  }
  return (
    <>
      <div className="container">
        <form onSubmit={onSubmit}>
          <h1>Google</h1>
          <input
            type="search"
            name="search_query"
            id="search_query"
            onFocus={() => setDisplay(true)}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Google Search"
            onBlur={() => setTimeout(() => {
              setDisplay(false);
            }, 10000)}
          />
          <button type="submit">Search</button>
        </form>
        {history.length > 0 &&
          display &&
          history.map((value, index) => {
            return (
              <label htmlFor="search_query" style={{cursor: "pointer", backgroundColor:"gold", margin:"2px"}} key={index} onClick={() => setInputValue(value)}>
                {index + 1}. {value}
              </label>
            );
          })}
          <button onClick={clearSearchHistory}>Clear History</button>
      </div>
    </>
  );
}

export default About;
