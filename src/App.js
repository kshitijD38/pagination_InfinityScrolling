import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [limit] = useState(10);
  const api = `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${pageNumber}`;

  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiData = await fetch(api);
      const apiDataJson = await apiData.json();
      setDataArray([...apiDataJson]);
    };
    fetchData();
  }, [api]);

  const MAX_PAGE_NUMBER = 10;
  const pageNumberArray = new Array(MAX_PAGE_NUMBER)
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

  const apiData1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const paginateApiData = (page, limit) => {
    const firstItem = page * limit - limit;
    const lastItem = page * limit;
    return apiData1.slice(firstItem, lastItem);
  };
  console.log(paginateApiData(1, 5));

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
      <button disabled={pageNumber === MAX_PAGE_NUMBER} onClick={handleNext}>
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
