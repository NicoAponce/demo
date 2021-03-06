import React from "react";
import {
  map,
  filter,
  take,
  tap,
  reduce,
  scan,
  first,
  takeWhile,
  takeUntil,
  distinct,
  distinctUntilChanged,
  debounceTime,
  pluck,
  throttleTime,
  sample,
} from "rxjs/operators";
import {
  Observable,
  Subject,
  of,
  fromEvent,
  range,
  asyncScheduler,
  interval,
  timer,
  from,
} from "rxjs";

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

  /**
   ************************************************
   *    Ejemplo sobre range.
   ************************************************
   **/
  const tres$ = range(7, 10, asyncScheduler);

  console.log("inicio");
  tres$.subscribe(console.log);
  console.log("final");

  /**
   ************************************************
   *    Ejemplo sobre range.
   ************************************************
   **/
  interval(1000)
    .pipe(take(15))
    .subscribe((val) => console.log(`int: ${val}`));

  timer(1500, 2400)
    .pipe(take(7))
    .subscribe((val) => console.log(`tim: ${val}`));

  /**
   ************************************************
   *    Ejemplo sobre tap.
   ************************************************
   **/
  range(4, 5)
    .pipe(
      tap((val) => {
        console.log("antes", val);
      }),
      map((val) => val * 10),
      tap({
        next: (val) => console.log("despues", val),
        complete: () => console.log("fin del mundo"),
      })
    )
    .subscribe();

  /**
   ************************************************
   *    Ejemplo sobre reduce.
   ************************************************
   **/
  interval(100)
    .pipe(
      take(10),
      reduce((acc, cur) => acc + cur)
    )
    .subscribe(console.log);

  range(6, 10)
    .pipe(reduce((acc, cur) => acc + cur))
    .subscribe(console.log);

  /**
   ************************************************
   *    Ejemplo sobre scan.
   ************************************************
   **/
  interval(100)
    .pipe(
      take(10),
      scan((acc, cur) => acc + cur)
    )
    .subscribe((val) => console.log(`interval: ${val}`));

  range(4, 10)
    .pipe(scan((acc, cur) => acc + cur))
    .subscribe((val) => console.log(`range: ${val}`));

  /**
   ************************************************
   *    Ejemplo sobre first.
   ************************************************
   **/
  fromEvent(document, "click")
    .pipe(
      map(({ x, y }) => ({ x, y })),
      first((val) => val.x <= 10)
    )
    .subscribe({
      next: (val) => console.log("next: ", val),
      complete: () => console.log("fin del mundo"),
    });

  /**
   ************************************************
   *    Ejemplo sobre takewhile.
   ************************************************
   **/
  fromEvent(document, "click")
    .pipe(
      map(({ x, y }) => ({ x, y })),
      takeWhile((val) => val.x >= 20, true)
    )
    .subscribe({
      next: (val) => console.log("next: ", val),
      complete: () => console.log("fin del mundo"),
    });

  /**
   ************************************************
   *    Ejemplo sobre takeuntil.
   ************************************************
   **/
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

  /**
   ************************************************
   *    Ejemplo sobre distinct.
   ************************************************
   **/
  const person = [
    {
      name: "nicolas",
      age: 22,
      sex: "M",
    },
    {
      name: "Carlos",
      age: 21,
      sex: "M",
    },
    {
      name: "Maria",
      age: 22,
      sex: "F",
    },
    {
      name: "Fer",
      age: 20,
      sex: "F",
    },
    {
      name: "Maria",
      age: 21,
      sex: "F",
    },
  ];

  from(person)
    .pipe(distinct((val) => val.name))
    .subscribe(console.log);

  /**
   ************************************************
   *    Ejemplo sobre distinctUntilChanged.
   ************************************************
   **/
  const colors = [
    { name: "rojo" },
    { name: "azul" },
    { name: "rojo" },
    { name: "rojo" },
    { name: "verde" },
    { name: "azul" },
  ];

  from(colors)
    .pipe(distinctUntilChanged((act, des) => act.name === des.name))
    .subscribe(console.log);

  /**
   ************************************************
   *    Ejemplo sobre debouncetime.
   ************************************************
   **/
  fromEvent(document, "click").pipe(debounceTime(10000)).subscribe(console.log);

  const input = document.createElement("input");
  const body = document.querySelector("body");
  body.append(input);

  fromEvent(input, "keyup")
    .pipe(pluck("target", "value"), debounceTime(1000), distinctUntilChanged())
    .subscribe(console.log);

  /**
   ************************************************
   *    Ejemplo sobre throttleTime.
   ************************************************
   **/
  const input$ = document.createElement("input");
  const body$ = document.querySelector("body");
  body$.append(input$);

  fromEvent(input, "keyup")
    .pipe(
      throttleTime(1000, asyncScheduler, {
        leading: false,
        trailing: true,
      }),
      pluck("target", "value"),
      distinctUntilChanged()
    )
    .subscribe({
      next: (val) => console.log("next: ", val),
      complete: () => console.log("fin del mundo"),
    });

  /**
   ************************************************
   *    Ejemplo sobre sample.
   ************************************************
   **/
  const lol$ = fromEvent(document, "click");

  interval(500).pipe(sample(lol$)).subscribe(console.log);
  return (
    <div>
      <h1>Esto son ejemplos pra no olvidarme de RxJs</h1>
    </div>
  );
};

export default RxJs;
