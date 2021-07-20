import React from "react";
import classnames from "classnames";
import moment from "moment";

const Filters = ({ state, setState }) => {
  const handleFilterChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };
  const handleDateChange = (e) => {
    setState((s) => ({
      ...s,
      [e.target.name]: moment(e.target.value).format("YYYYMMDD"),
    }));
  };
  return (
    <div className={"filters"}>
      <div className={"filters-container"}>
        <div className={"filters__goup"}>
          <label htmlFor="sort">
            <strong>Sort by:&nbsp;</strong>
          </label>
          <select
            className={classnames("filters__item", "filters__select")}
            name="sort"
            id="sort"
            value={state.sort}
            onChange={handleFilterChange}
          >
            <option hidden value={""}>
              Sort by...
            </option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="relevance">Relevance</option>
          </select>
        </div>
        <div className={"filters__goup"}>
          <label htmlFor="page">
            <strong>Page:&nbsp;</strong>
          </label>
          <input
            type="number"
            id="page"
            placeholder="i.e. 0"
            min={0}
            max={100}
            className={classnames("filters__item", "filters__page")}
            name="page"
            onChange={handleFilterChange}
          />
        </div>
        <div className={"filters__goup"}>
          <label htmlFor="fl">
            <strong>Field list:&nbsp;</strong>
          </label>
          <input
            type="string"
            id="fl"
            placeholder="i.e. example"
            className={classnames("filters__item", "filters__field")}
            name="fl"
            onChange={handleFilterChange}
          />
        </div>
        <div className={"filters__goup"}>
          <label htmlFor="fq">
            <strong>Filter query:&nbsp;</strong>
          </label>
          <input
            type="string"
            id="fq"
            placeholder="i.e. example"
            className={classnames("filters__item", "filters__field")}
            name="fq"
            onChange={handleFilterChange}
          />
        </div>
        <div className={"filters__goup"}>
          <label htmlFor="begin_date">
            <strong>Start date:&nbsp;</strong>
          </label>
          <input
            className={classnames("filters__item", "filters__date")}
            type="date"
            id="begin_date"
            name="begin_date"
            value={moment(state.begin_date).format("YYYY-MM-DD")}
            onChange={handleDateChange}
          />
        </div>
        <div className={"filters__goup"}>
          <label htmlFor="end_date">
            <strong>End date:&nbsp;</strong>
          </label>
          <input
            className={classnames("filters__item", "filters__date")}
            type="date"
            id="end_date"
            name="end_date"
            value={moment(state.end_date).format("YYYY-MM-DD")}
            onChange={handleDateChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
