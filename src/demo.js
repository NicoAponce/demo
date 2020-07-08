import React from "react";
import { fromEvent, asyncScheduler } from "rxjs";
import { pluck, throttleTime, distinctUntilChanged } from "rxjs/operators";
import {} from "rxjs/ajax";

const Demo = () => {
  
  return (
    <div>
      <h1>Hola Mundo Cruel</h1>
      <hr />
    </div>
  );
};

export default Demo;
