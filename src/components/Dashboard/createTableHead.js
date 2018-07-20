import React from "react";

const TableHead = props => (
  <thead>
    <tr>
      <th width="34%">Participants</th>
      {props.data.map((venue, i) => {
        const { category, name, rating, url, isWinning } = venue;
        return (
          <th width="22%" key={i} className={isWinning ? "th__highlight" : ""}>
            <h3>
              <a href={url}>{name}</a>
            </h3>
            <h4>{category}</h4>
            <span>{rating}</span>
          </th>
        );
      })}
    </tr>
  </thead>
);

export default TableHead;
