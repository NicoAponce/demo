import React from "react";
import { map, filter } from "rxjs/operators";
import { Observable } from "rxjs";

const RxJs = () => {
  /**
   ************************************************
   *    Ejemplo numero uno sobre observable.
   ************************************************
   **/
  const observer = {
    next: (val) => console.log("valor Next: ", val),
    error: (err) => console.log("valor error: ", err),
    complete: () => console.log("fin del mundo"),
  };

  const obs$ = new Observable((obs) => {
    obs.next(1);
    obs.next(3);
    obs.next(2);
    obs.next(5);
  });

  obs$
    .pipe(
      map((val) => val * 15),
      filter((val) => val > 20)
    )
    .subscribe(observer);

  
  return (
    <div>
      <h1>Esto son ejemplos pra no olvidarme de RxJs</h1>
    </div>
  );
};

export default RxJs;
