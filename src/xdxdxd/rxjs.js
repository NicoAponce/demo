import React from "react";
import { map, filter } from "rxjs/operators";
import { Observable, Subject, of, fromEvent } from "rxjs";

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

  /**
   ************************************************
   *    Ejemplo sobre Subject.
   ************************************************
   **/
  const obs2$ = new Observable((subs) => {
    const lol = setInterval(() => {
      subs.next(Math.random());
    }, 3000);

    return () => {
      clearInterval(lol);
    };
  });

  const subj$ = new Subject();
  obs2$.subscribe(subj$);

  subj$.subscribe((num1) => console.log("num1: ", num1));
  subj$.subscribe((num2) => console.log("num2: ", num2));

  /**
   ************************************************
   *    Ejemplo sobre Of.
   ************************************************
   **/
  const uno$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9);
  uno$
    .pipe(
      map((val) => val * 7),
      filter((val) => val % 2 === 0)
    )
    .subscribe(console.log);

  /**
   ************************************************
   *    Ejemplo sobre FromEvent.
   ************************************************
   **/
  const dos$ = fromEvent(document, "click");

  dos$.subscribe(({ x, y }) => {
    console.log(`valor de X: ${x},
     valor de Y: ${y}`);
  });
  return (
    <div>
      <h1>Esto son ejemplos pra no olvidarme de RxJs</h1>
    </div>
  );
};

export default RxJs;
