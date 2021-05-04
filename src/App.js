import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(10);
  const api = `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${pageNumber}`;

  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiData = await fetch(api);
      const apiDataJson = await apiData.json();
      console.log(apiDataJson);
      setDataArray([...apiDataJson]);
    };
    fetchData();
  }, [pageNumber]);

  const MAX_PAGE_NUMBER = 20;

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
      <ul>
        {dataArray.map((data) => (
          <li key={data.id}>{data.title}</li>
        ))}
      </ul>
      <button disabled={pageNumber === 1} onClick={handlePrev}>
        Prev
      </button>
      <span style={{ margin: 5 }}>{pageNumber}</span>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
