import React from "react";
import Input from "../common/Input/";

const TableBody = props => {
  return (
    <tbody>
      {props.data.map((participant, i) => {
        return (
          <tr key={i}>
            <td className="td--title">
              <Input
                type="text"
                placeholder="Enter name"
                className="input input__block input__medium"
              />
            </td>

            {props.venue.map((venue, x) => {
              return (
                <td key={x}>
                  <label>
                    <input
                      type="radio"
                      name={`v${i}`}
                      onChange={() => props.onVoting({ name: i, vote: x })}
                    />
                    <span className="td__highlight" />
                  </label>
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
