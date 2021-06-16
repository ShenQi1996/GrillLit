import React from 'react';
import Hero from './hero';
import Github from '../../stylesheets/github.png';
import LinkedIn from '../../stylesheets/linkedin-logo.png';
import AngelList from '../../stylesheets/angelList-logo.png';

class Home extends React.Component {

  render() {
    return (
      <div className="home-container">
        <Hero/>
        {/* <div className="content2"></div>
        <footer>
          
        </footer> */}
        {/* <div className="home_wrapper"> */}
          
          
{/*           
          <div className="home_wrapper_detail">
            <div className="main-splash-home-box1">
            <h1 className="main-splash-home-txt">
              Welcome to GrillLit!
               
            </h1>
            <h1>Plan and organize your next group picnic here

            </h1>
            <ul>Here at GrillLit we make it simple to coordinate a large group grill out in minutes
              <li>1. Sign up with a new account if you don’t already have an account</li>
              <li>2. Create an event, including location, and a list of items for people to bring</li>
              <li>3. Guests will join the event and choose which items they will be bringing</li>
            </ul>
            <h1>In a matter of minutes you can can plan, organize, and invite multiple people as well as organize who would bring what.

            </h1>
            <h1>It’s simple easy and fast

            </h1>
            <h1 className="last-txt-splash">Lets git GrillLit</h1> 
            </div>
            <div className="main-splash-home-box2">
           
            </div>
          </div> */}



        {/* </div> */}



          <footer className="footer-splash">


          <div className="footer-flex">

            <div className="profile-box" >
              <p>Shen(Sam) Qi</p>
              
              <div>
                <a target="_blank" href="https://github.com/ShenQi1996"><img className="info-logo" src={Github} alt="gitHub"/></a>
                <a target="_blank" href="https://www.linkedin.com/in/shenqi1993/"><img className="info-logo" src={LinkedIn} alt="LinkedIn"/></a>
                <a target="_blank" href="https://angel.co/u/shen-sam-qi"><img className="info-logo" src={AngelList} alt="AngelList"/></a>
              </div>
            </div>


            <div className="profile-box" >
              <p>Christopher Sweeting</p>
              
              <div>
                <a target="_blank" href="https://github.com/chrisweeting"><img className="info-logo" src={Github} alt="gitHub"/></a>
                <a target="_blank" href="https://www.linkedin.com/in/christopher-sweeting-6878211a3/"><img className="info-logo" src={LinkedIn} alt="LinkedIn"/></a>
                <a target="_blank" href=""><img className="info-logo" src={AngelList} alt="AngelList"/></a>
              </div>
            </div>


            <div className="profile-box" >
              <p>Abir Mahamud</p>
              
              <div>
                <a target="_blank" href="https://github.com/Abir-Al-Mahamud"><img className="info-logo" src={Github} alt="gitHub"/></a>
                <a target="_blank" href="https://www.linkedin.com/in/abir-mahamud-2495571b3/"><img className="info-logo" src={LinkedIn} alt="LinkedIn"/></a>
                <a target="_blank" href="https://angel.co/u/abir-mahamud"><img className="info-logo" src={AngelList} alt="AngelList"/></a>
              </div>
            </div>


            <div className="profile-box" >
              <p>Joseph Sipiorski</p>

              <div>
                <a target="_blank" href="https://github.com/JosefSipi"><img className="info-logo" src={Github} alt="gitHub"/></a>
                <a target="_blank" href="https://www.linkedin.com/in/joseph-sipiorski-590452195/"><img className="info-logo" src={LinkedIn} alt="LinkedIn"/></a>
                <a target="_blank" href="https://angel.co/u/joseph-sipiorski"><img className="info-logo" src={AngelList} alt="AngelList"/></a>
              </div>

            </div>

          </div>


          </footer>

      </div>
    );
  }
}

export default Home;