import React, { Component } from "react";
import LunchVenueContext from "../../store";
import Button from "../common/Button";

export default class Search extends Component {
  state = {};

  render() {
    return (
      <LunchVenueContext.Consumer>
        {ctx => (
          <React.Fragment>
            <input
              type="text"
              placeholder="Enter Location 'Chicago' "
              className="input input__big searchbar__space"
              onChange={e => this.setState({ value: e.target.value })}
            />
            <Button
              label="Search"
              onClick={() => ctx.getVenueRecommendations(this.state.value)}
            />
          </React.Fragment>
        )}
      </LunchVenueContext.Consumer>
    );
  }
}
