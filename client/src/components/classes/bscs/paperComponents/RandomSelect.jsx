import React, { useEffect, useState } from "react";
import {
  shortQuestions,
  longQuestions,
} from "../../../books/computer/chapter5";
import {
  shortQuestions1,
  longQuestions1,
} from "../../../books/computer/chapter1";
import { semesterSeven } from "../pastpapers/7thsemsterpastpaper";

function RandomSelect() {
  const [selectedShortQuestions, setSelectedShortQuestions] = useState([]);
  const [selectedLongQuestions, setSelectedLongQuestions] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState([]);
  const [value, setValue] = useState(0);
  const [longValue, setLongValue] = useState(0);
  const [type, setType] = useState("important");
  const [showInfo, setShowInfo] = useState(false);
  const [questionType, setQuestionType] = useState("");
  const [longQuestionType, setLongQuestionType] = useState("");
  const [year, setYear] = useState(2022);
  const [course, setCourse] = useState("");

  const handleQuestionsQuantity = (e) => {
    const quantity = parseInt(e.target.value);
    setValue(quantity);
  };

  const handleLongQuestionsQuantity = (e) => {
    const quantity = parseInt(e.target.value);
    setLongValue(quantity);
  };

  const generatePaper = () => {
    // if (selectedChapter.length === 0) {
    //   alert("Please select at least one chapter")
    //   return
    // }
    let allShortQuestions = [];
    if (selectedChapter.includes(1))
      allShortQuestions = allShortQuestions.concat(shortQuestions1);
    if (selectedChapter.includes(2))
      allShortQuestions = allShortQuestions.concat(shortQuestions);

    const filterByType = allShortQuestions.filter(
      (question) => question.type === type,
    );
    const shuffled = filterByType.sort(() => 0.5 - Math.random());

    let allLongQuestions = [];
    if (selectedChapter.includes(1))
      allLongQuestions = allLongQuestions.concat(longQuestions);
    if (selectedChapter.includes(2))
      allLongQuestions = allLongQuestions.concat(longQuestions1);

    const filterLongByType = allLongQuestions.filter(
      (question) => question.type === type,
    );
    const shuffledLong = filterLongByType.sort(() => 0.5 - Math.random());

    setSelectedLongQuestions(shuffledLong.slice(0, longValue));
    setSelectedShortQuestions(shuffled.slice(0, value));
  };

  const chapterSelect = (chapter) => {
    setSelectedChapter((prevChapters) => {
      if (prevChapters.includes(chapter)) {
        return prevChapters.filter((ch) => ch !== chapter);
      } else {
        return [...prevChapters, chapter];
      }
    });
  };

  const generate15marks = () => {
    setValue(3);
    setLongValue(0);
    generatePaper();
  };
  const generate25marks = () => {
    setValue(3);
    setLongValue(1);
    generatePaper();
  };
  const generate35marks = () => {
    setValue(5);
    setLongValue(1);
    generatePaper();
  };
  const generate50marks = () => {
    setValue(6);
    setLongValue(2);
    generatePaper();
  };

  useEffect(() => {
    generatePaper();
  }, [value, longValue, type, selectedChapter]);
  return (
    <div className="random-container">
      <input
        type="number"
        name="amount"
        id="amount"
        placeholder="How much Short"
        onChange={handleQuestionsQuantity}
      />
      <input
        type="number"
        name="longAmount"
        id="lomgAmount"
        placeholder="How much Long"
        onChange={handleLongQuestionsQuantity}
      />
      <button onClick={generatePaper}>Generate</button>
      <h3>Random Short Questions</h3>

      <input
        type="checkbox"
        name="chapter1"
        id="chapter1"
        onChange={() => chapterSelect(1)}
      />
      <label htmlFor="chapter1">Chapter1</label>

      <input
        type="checkbox"
        name="chapter2"
        id="chapter2"
        onChange={() => chapterSelect(2)}
      />
      <label htmlFor="chapter2">Chapter2</label>

      <select
        name="type"
        id="type"
        onChange={(e) => {
          setType(e.target.value);
          generatePaper();
        }}
      >
        <option value="important">Important</option>
        <option value="normal">Normal</option>
      </select>

      <div className="paperSelector">
        <div className="buttonsDiv">
          <button
            className="paperBtn"
            id="btn1"
            onClick={generate15marks}
            onMouseEnter={() => setShowInfo(1)}
            onMouseLeave={() => setShowInfo(false)}
          >
            Generate 15 marks
          </button>
          <button
            className="paperBtn"
            id="btn2"
            onClick={generate25marks}
            onMouseEnter={() => setShowInfo(2)}
            onMouseLeave={() => setShowInfo(false)}
          >
            Generate 25 marks
          </button>
          <button
            className="paperBtn"
            id="btn3"
            onClick={generate35marks}
            onMouseEnter={() => setShowInfo(3)}
            onMouseLeave={() => setShowInfo(false)}
          >
            Generate 35 marks
          </button>
          <button
            className="paperBtn"
            id="btn4"
            onClick={generate50marks}
            onMouseEnter={() => setShowInfo(4)}
            onMouseLeave={() => setShowInfo(false)}
          >
            Generate 50 marks
          </button>
        </div>

        {showInfo === 1 && (
          <div className="paperInfo">
            <h4>Paper Type #1 </h4>|<h5>No Choice</h5>|
            <p>
              <b>3</b> S/Qs === 3 x 5 = 15{" "}
            </p>
            |<p>No Long Questions</p>|<strong>Total Marks: 15</strong>
          </div>
        )}

        {showInfo === 2 && (
          <div className="paperInfo">
            <h4>Paper Type #2 </h4>|<h5>No Choice</h5>|
            <p>
              <b>3</b> S/Qs === 3 x 5 = 15{" "}
            </p>
            |
            <p>
              <b>1</b> L/Qs === 1 x 10 = 10
            </p>
            |<strong>Total Marks: 25</strong>
          </div>
        )}

        {showInfo === 3 && (
          <div className="paperInfo">
            <h4>Paper Type #3 </h4>|<h5>No Choice</h5>|
            <p>
              <b>5</b> S/Qs === 5 x 5 = 25{" "}
            </p>
            |
            <p>
              <b>1</b> L/Qs === 1 x 10 = 10
            </p>
            |<strong>Total Marks: 35</strong>
          </div>
        )}

        {showInfo === 4 && (
          <div className="paperInfo">
            <h4>Paper Type #2 </h4>|<h5>No Choice</h5>|
            <p>
              <b>6</b> S/Qs === 6 x 5 = 30{" "}
            </p>
            |
            <p>
              <b>2</b> L/Qs === 2 x 10 = 20
            </p>
            |<strong>Total Marks: 50</strong>
          </div>
        )}
      </div>

      <h2>Short Questions</h2>
      <ol>
        {selectedShortQuestions.map((value, index) =>
          value.type === type ? (
            <li
              className="question"
              key={index}
              contentEditable="true"
              suppressContentEditableWarning="true"
            >
              {value.question}
            </li>
          ) : null,
        )}
      </ol>
      <h2>Long Questions</h2>
      <ol>
        {selectedLongQuestions.map((value, index) =>
          value.type === type ? (
            <li
              className="question"
              key={index}
              contentEditable="true"
              suppressContentEditableWarning="true"
            >
              {value.question}
            </li>
          ) : null,
        )}
      </ol>

      <select
        name="questionType"
        id="questionType"
        onChange={(e) => setQuestionType(e.target.value)}
      >
        <option value="">Choose</option>
        <option value="short">Short Questions from Past Paper</option>
      </select>

      <select
        name="longQuestionType"
        id="longQuestionType"
        onChange={(e) => setLongQuestionType(e.target.value)}
      >
        <option value="">Choose</option>
        <option value="long">Long Questions from Past Paper</option>
      </select>

      <select
        name="year"
        id="year"
        value={year}
        onChange={(e) => setYear(parseInt(e.target.value))}
      >
        <option value={2022}>2022</option>
        <option value={2023}>2023</option>
        <option value={2024}>2024</option>
        <option value={2025}>2025</option>
      </select>

      <select name="book" id="book" onChange={(e) => setCourse(e.target.value)}>
        <option value="">Select Course</option>
        <option value="numerical computing">numerical computing</option>
        <option value="technical and business writing">technical and business writing</option>
        <option value="software project management">software project management</option>
      </select>

      <div className="bscsQuest">
        <h2>BSCS</h2>
        <ol>
          <h1>Short Questions</h1>
          {semesterSeven.map((item, index) => 
            item.category === questionType &&
            item.year === year &&
            item.Subject === course ? (
              <>
              <li
                key={index}
                className="question"
                contentEditable="true"
                suppressContentEditableWarning="true"
              >
                {item.question}
              </li>
              </>
            ) : null,
          )}
        </ol>

        <ol>
          <h1>Long Questions</h1>
          {semesterSeven.map((item, index) =>
            item.category === longQuestionType &&
            item.year === year &&
            item.Subject === course ? (
              <li
                key={index}
                className="question"
                contentEditable="true"
                suppressContentEditableWarning="true"
              >
                {item.question}
              </li>
            ) : null,
          )}
        </ol>
      </div>
    </div>
  );
}

export default RandomSelect;
