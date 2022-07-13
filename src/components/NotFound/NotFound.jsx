import { StayPrimaryLandscapeSharp } from '@material-ui/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';
import plane from '../../assets/images/plane.png';
import grass from '../../assets/images/grass.png';
import './notfound.css';

const NotFound = () => {
  return (
    <div className="notfound">
      <div className="error">
        <div className="sky">
          <h2>
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </h2>
          <div className="grass"></div>
          {/* <img src={grass} className="grass"></img> */}

          <img src={plane} className="plane"></img>
        </div>
      </div>
      <div className="field">
        <h2>Opps...looks like you got lost</h2>

        <NavLink className="homeDirect" to="/">
          Go Home
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
