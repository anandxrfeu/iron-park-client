
import React from "react";
import MainWrapper from "../../components/layout/MainWrapper";
import MapWrapper from "../../components/map/MapWrapper";
import './Home.css'

function Home() {

  return (
    <MainWrapper>
        <div className="main-left">
          <MapWrapper />
        </div>
        <div className="main-right">
          <div className="form-controls">
            <form className="search-form">
              <div className="search-form__search">
                  <input
                    type="search"
                    name="search"
                    placeholder="Search..."
                    // value={state.password}
                    // error={errors.password}
                    // onChange={handleChange}
                  />
                </div>

              <div className="search-form__cta">
                <button  className="search-form__btn" type="submit">PARK</button>
              </div>
            </form>
          </div>
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
