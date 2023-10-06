import React from 'react'
import { Icon } from 'semantic-ui-react'

const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>{props.company}</h4>
            <ul className="footer-links">
              <li><a href="">{props.s1p1}</a></li>
              <li><a href="#">{props.s1p2}</a></li>
              <li><a href="#">{props.s1p3}</a></li>
            </ul>
          </div>
          <div className="col">
            <h4>{props.client}</h4>
            <ul className="footer-links">
              <li><a href="#">{props.s2p1}</a></li>
              <li><a href="#">{props.s2p2}</a></li>
              <li><a href="#">{props.s2p2}</a></li>
            </ul>
          </div>
          <div className="col">
            <h4>{props.media}</h4>
            <div className="icons">
              <Icon bordered inverted color='black' name={props.icon1} />
              <Icon bordered inverted color='blue' name={props.icon2} />
              <Icon bordered inverted color='pink' name={props.icon3} />
            </div>
          </div>
        </div>
        <div className="EndOfPage">
          <h4>{props.endOfPage}</h4>
          <ul className="EndOfPage-links">
            <li><a href="https://business.gov.au/legal-notices/privacy">{props.endp1}</a></li>
            <li><a href="#">{props.endp2}</a></li>
            <li><a href="https://business.gov.au/legal/fair-trading/codes-of-conduct">{props.endp3}</a></li>
          </ul>
          <div className="col-md">
            <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
