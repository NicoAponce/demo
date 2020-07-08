import React from "react";
import { fromEvent, interval } from "rxjs";
import { map, takeWhile, takeUntil } from "rxjs/operators";
import {} from "rxjs/ajax";

const Demo = () => {
  const button = document.createElement("button");
  button.innerHTML = "detener";
  document.querySelector("body").append(button);

  const click$ = fromEvent(button, "click");

  interval(1000)
    .pipe(takeUntil(click$))
    .subscribe({
      next: (val) => console.log("next: ", val),
      complete: () => console.log("fin del mundo"),
    });

  return (
    <div>
      <h1>Hola Mundo Cruel</h1>
      <hr />
    </div>
  );
};

export default Demo;
