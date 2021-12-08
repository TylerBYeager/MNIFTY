import React from "react";
import Jumbotron from "../components/Jumbotron";



// we have an error message
//  appear if the user hits an invalid route.
const NoMatch = () => {
  return (
    <div>
      <Jumbotron>
        <h1>404 Page Not Found</h1>
        <br/>
        <h1>
          Sorry, the page you are looking for is on vacation and won't be back for at least 10-24 business days.
        </h1>
      </Jumbotron>
    </div>
  );
};

export default NoMatch;