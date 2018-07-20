import React, { Component } from "react";
import Header from "../components/Header/";
import SearchBar from "../components/Search/";
import Dashboard from "../components/Dashboard";
import { LunchVenueProvider } from "../store";

class App extends Component {
  render() {
    return (
      <LunchVenueProvider>
        <div className="wrapper">
          <Header title="LunchPlace" />
          <SearchBar />
          <Dashboard />
        </div>
      </LunchVenueProvider>
    );
  }
}

export default App;
