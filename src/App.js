import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [limit] = useState(10);
  // const api = `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${pageNumber}`;
  const api = `https://jsonplaceholder.typicode.com/todos`;
  const [dataArray, setDataArray] = useState([]);
  // const [totalArray, setTotalArray] = useState([]);
  const [pageLength, setPageLength] = useState(0);

  function paginateApiData(page, limit, apiData1) {
    const firstItem = page * limit - limit;
    const lastItem = page * limit;
    return apiData1.slice(firstItem, lastItem);
  }

  useEffect(() => {
    const fetchData = async () => {
      const apiData = await fetch(api);
      const apiDataJson = await apiData.json();
      setPageLength(apiDataJson.length);
      // setTotalArray(apiDataJson);
      setDataArray(paginateApiData(pageNumber, limit, apiDataJson));
    };
    fetchData();

    // return () => setDataArray([]);
  }, [pageNumber, limit, api]);

  const pageNumberArray = new Array(Math.ceil(pageLength / limit))
    .fill(1)
    .map((_, index) => index + 1);

  const handlePrev = () => {
    if (pageNumber !== 1) {
      setPageNumber(pageNumber - 1);
    }
  };
  const handleNext = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <div className="app">
      <h1 style={{ color: "black" }}>Pagination / Infinite Scrolling</h1>
      <ul>
        {dataArray.map((data) => (
          <li key={data.id}>{data.title}</li>
        ))}
      </ul>
      <button disabled={pageNumber === 1} onClick={handlePrev}>
        Prev
      </button>
      <button
        disabled={pageNumber === Math.ceil(pageLength / limit)}
        onClick={handleNext}
      >
        Next
      </button>
      <div>
        {pageNumberArray.map((ele, index) => (
          <button
            key={index}
            onClick={(e) => {
              setPageNumber(ele);
            }}
            style={{
              cursor: "pointer",
              border: "none",
              backgroundColor: "transparent"
            }}
          >
            {ele}
          </button>
        ))}
      </div>
    </div>
  );
}
