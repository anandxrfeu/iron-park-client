
import React from "react";
import MainWrapper from "../../components/layout/MainWrapper";
import MapWrapper from "../../components/map/MapWrapper";
import './Home.css'
import SearchIcon from '../../assets/images/magifying-glass.svg'

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
                  <div className="search-form__icon">
                    <img src={SearchIcon} alt="search-icon" />
                  </div>
                  <input
                    type="search"
                    name="search"
                    placeholder="Search by street name..."
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
