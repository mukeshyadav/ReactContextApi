import React, { Component } from "react";
import { getVenueRecommendations, getVenueDetails } from "./service/services";

const LunchVenueContext = React.createContext();

class LunchVenueProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venueList: [],
      participants: [{ name: "", vote: null }],
      isResult: false,
      isResultLoader: true
    };
  }

  getVenueRecommendations = data => {
    this.setState(prevState => (prevState.isResultLoader = false));
    getVenueRecommendations(data).then(resData => {
      const venueLists = getVenueDetails(resData);
      if (!venueLists["data"]) {
        this.setState(prevState => (prevState.isResult = false));
      } else {
        this.setState(prevState => (prevState.venueList = venueLists["data"]));
        this.setState(prevState => (prevState.isResult = true));
        this.setState(prevState => (prevState.isResultLoader = true));
      }
    });
  };

  addParticipant = () => {
    this.setState(prevState =>
      prevState.participants.push({ name: "", vote: null })
    );
  };

  onVotingDone = data => {
    const { name, vote } = data;
    const isVote = this.state.participants[name]["vote"];
    if (isVote === null) {
      this.state.participants[name]["vote"] = vote;
      this.setState(
        prevState => (prevState.participants = this.state.participants)
      );
    } else {
      this.state.venueList[this.state.participants[name]["vote"]][
        "voteCount"
      ]--;
      this.state.participants[name]["vote"] = vote;
      this.setState(
        prevState => (prevState.participants = this.state.participants)
      );
      this.setState(prevState => (prevState.venueList = this.state.venueList));
    }
    this.state.venueList[vote]["voteCount"]++;
    this.setState(prevState => (prevState.venueList = this.state.venueList));
    this.setWinningVenue();
  };

  setWinningVenue = () => {
    const venueListArray = this.state.venueList;
    const venueVoteIndex = venueListArray.map(venue => venue.voteCount);
    const winningIndex = venueVoteIndex.reduce(
      (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
      0
    );
    venueListArray.forEach(venue => {
      venue["isWinning"] = false;
    });
    venueListArray[winningIndex]["isWinning"] = true;
    this.setState(prevState => (prevState.venueList = venueListArray));
  };

  render() {
    return (
      <LunchVenueContext.Provider
        value={{
          ...this.state,
          getVenueRecommendations: this.getVenueRecommendations,
          addParticipant: this.addParticipant,
          onVoting: this.onVotingDone
        }}
      >
        {this.props.children}
      </LunchVenueContext.Provider>
    );
  }
}

export { LunchVenueProvider };
export default LunchVenueContext;
