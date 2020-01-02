import React, { useState, useEffect, Fragment } from "react";

export default function Counter(props) {
  const { appFianlResult } = props;
  const [exeTimes, setExeTimes] = useState(0);

  return (
    <Fragment>
      <h3>{appFianlResult === "YES" ? "Oh Yeahhhhh~~~" : "DO IT!!!"}</h3>
    </Fragment>
  );
}
