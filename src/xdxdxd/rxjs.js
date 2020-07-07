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

  /**
   ************************************************
   *    Ejemplo sobre unsubscribe.
   ************************************************
   **/
  const obs1$ = new Observable((obs) => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      obs.next(count);
    }, 1000);

    return () => {
      clearInterval(interval);
      console.log("fin del interval");
    };
  });

  const obs1 = obs1$
    .pipe(map((val) => val * 10))
    .subscribe((val) => console.log("valor: ", val));

  setTimeout(() => {
    obs1.unsubscribe();
    console.log("fin del timeOut");
  }, 10000);
  return (
    <div>
      <h1>Esto son ejemplos pra no olvidarme de RxJs</h1>
    </div>
  );
};

export default RxJs;
