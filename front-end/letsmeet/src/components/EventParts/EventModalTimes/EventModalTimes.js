import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Badge';

/*
  This component displays the modal of suggested times for an event when the
  creator clicks on the Choose Final Time button on the Event page. The creator
  can choose the final time from the list of suggested times. 

  Props: 
    - suggestedTimes: a list of suggested times
    - onChecked: TODO
*/

const eventModalTimes = (props) => {

  let badge;
  if (props.suggestedTimes) {
    if (props.suggestedTimes.data.length !== 0) {
      badge = props.suggestedTimes.data.map((time, index) =>
        <div key={index} className="form-check mt-1">
        <input
          className="form-check-input mt-2"
          type="radio"
          name="exampleRadios"
          id="exampleRadios1"
          day={time.Day}
          date={time.Date}
          time={time.Time}
          onClick={props.onChecked}
        />
        <label className="form-check-label" htmlFor="exampleRadios1">
          <h5>
            <Badge className="text-left" variant="primary">
              {time.Day}, {time.Date} @ {time.Time}
            </Badge>
          </h5>
        </label>
      </div>
      )
    } else {
      badge = <div><p className="text-primary h6">No suggestions available. Either no availabilities match up or wait for more invitees to respond.</p></div>;
    }
  } else {
    badge = <div><p className="text-primary h6">No suggestions available. Either no availabilities match up or wait for more invitees to respond.</p></div>;
  }

  return (
    <div>
      <hr />
      {badge}
    </div>
  );
};

export default eventModalTimes;
