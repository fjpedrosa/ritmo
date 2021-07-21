import React, { useEffect, useState } from "react";
import "./main.css";
import Card from "./components/Card";
import Spinner from "./components/Spinner";
import Filters from "./components/Filters";
import moment from "moment";
import { hot } from "react-hot-loader";

// const API_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
// const API_KEY = "h1cU04oP2OM8dblrnkYzgkByOMcVlhwK";

function App() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    sort: "",
    page: undefined,
    fl: "",
    fq: "",
    begin_date: moment().format("YYYYMMDD"),
    end_date: moment().format("YYYYMMDD"),
  });
  useEffect(() => {
    const calcParams = () => {
      let params = "";
      let filtersProps = Object.keys(filters);
      filtersProps.forEach((filterValue) => {
        if (!!filters[filterValue])
          params += `&${filterValue}=${filters[filterValue]}`;
      });
      return params;
    };
    const fetchPosts = async () => {
      setError(false);
      setLoading(true);
      try {
        await fetch(
          `${process.env.REACT_APP_API_URL}?api-key=${
            process.env.REACT_APP_API_KEY
          }${calcParams()}`,
          {
            method: "get",
          }
        )
          .then((resp) => resp.json())
          .then((resp) => {
            if (resp.status === "OK") {
              // Filter in case response returns array with empty objects
              setNews(
                resp.response.docs.filter(
                  (oneNew) => Object.keys(oneNew).length
                )
              );
            } else {
              setError(true);
            }
          });
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [filters]);

  return (
    <div className="app">
      <Filters state={filters} setState={setFilters} />
      <div className={"app__content"}>
        {loading && <Spinner size={80} />}
        {error && (
          <h1 style={{ color: "darkred" }}>
            Looks like there was an error... please refresh
          </h1>
        )}
        {!loading && !error && !news.length && (
          <h1 style={{ color: "rgba(23, 141, 232, 1)" }}>
            No news found with these filters
          </h1>
        )}
        {!error &&
          !loading &&
          news.map((oneNew, newIndex) => {
            return <Card key={oneNew._id} document={oneNew} />;
          })}
      </div>
    </div>
  );
}

export default hot(module)(App);
