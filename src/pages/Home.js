
import React from "react";
import MainWrapper from "../components/layout/MainWrapper";
import MapWrapper from "../components/map/MapWrapper";

function Home() {

  return (
    <MainWrapper>
        <div className="main-left">
          <MapWrapper />
        </div>
        <div className="main-right">
          <div className="form-controls">Forms</div>
          <footer>Built by Anand & Christian</footer>
        </div>
    </MainWrapper>
  );
}
/**
 
<div className="main-container">
      <div className="main-wrapper">
        <div className="main-left">Map</div>
        <div className="main-right">
          <div className="form-controls">Forms</div>
          <footer>Built by Anand & Christian</footer>
        </div>
      </div>
    </div>

 */

export default Home;
