import React from "react";
import LunchVenueContext from "../../store";
import Button from "../common/Button/";
import TableHead from "./createTableHead";
import TableBody from "./createTableBody";

const Table = props => {
  return (
    <LunchVenueContext.Consumer>
      {ctx =>
        ctx.isResult ? (
          ctx.isResultLoader ? (
            <React.Fragment>
              <div className="result-container">
                <table className="table" cellPadding="0" cellSpacing="0">
                  <TableHead data={ctx.venueList} />
                  <TableBody
                    data={ctx.participants}
                    venue={ctx.venueList}
                    onVoting={ctx.onVoting}
                  />
                </table>
              </div>
              <Button
                label="Add Participant"
                onClick={() => ctx.addParticipant()}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="loader">Loader</div>
            </React.Fragment>
          )
        ) : (
          <React.Fragment>
            <div className="loader">
              Please enter Location and click search...
            </div>
          </React.Fragment>
        )
      }
    </LunchVenueContext.Consumer>
  );
};

export default Table;
