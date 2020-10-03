import React, { useState, useEffect } from "react";
import sheldon from "../assets/sheldon.png";
import leonard from "../assets/leonard.png";
import penny from "../assets/penny.png";
import rajesh from "../assets/rajesh.png";
import howard from "../assets/howard.png";
import freezer from "../assets/freezer.png";
import "./styles.css";
/**
 *
 * @param {*} name Vector que contiene los nombres y/o referencia para la imagen de los personajes
 * @param {*} i Número de la posición del personaje en el arreglo
 * @param {*} soda El número de la bebida ingresado
 * @param {*} queuei Número de duplicados en esa posición del arreglo
 * @param {*} coun Contador de posiciones de cada personaje y/o sus duplicados
 * @param {*} open Número decimal para encontrar quien especificamente tiene la bebida
 * @constant verifyLast Encuentra el personaje o duplicado específico que tiene la bebida y lo muestra más grande
 */
const verifyLast = (name, i, soda, queuei, coun, open) => {
  if (i == soda && coun / queuei == open) {
    return (
      <img
        style={{ height: "140px" }}
        src={name}
        alt="name"
        key={Math.random()}
      />
    );
  } else {
    return <img src={name} alt="name" key={Math.random()} />;
  }
};
/**
 *
 * @param {*} queue Arreglo con las cantidades de los duplicados y personajes adentro
 * @param {*} soda La bebida cuya ubicación se quiere averiguar y/o numero decimal para ubicar al personaje
 * @param {*} len Longitud del arreglo de personajes
 * @constant printAct Imprime cada iteración de la fila como queda luego de los duplicados
 */
const printAct = (queue, soda, len) => {
  let code = [],
    coun = 1;
  let open = soda;
  soda = Math.ceil(soda);
  code.push(<img src={freezer} alt="freezer" key={len} />);
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < queue[i]; j++) {
      switch (i) {
        case 0:
          code.push(verifyLast(sheldon, i, soda - 1, queue[i], coun, open));
          break;
        case 1:
          code.push(verifyLast(leonard, i, soda - 1, queue[i], coun, open));
          break;
        case 2:
          code.push(verifyLast(penny, i, soda - 1, queue[i], coun, open));
          break;
        case 3:
          code.push(verifyLast(rajesh, i, soda - 1, queue[i], coun, open));
          break;
        case 4:
          code.push(verifyLast(howard, i, soda - 1, queue[i], coun, open));
          break;
        default:
          code += "error";
          break;
      }
      coun++;
    }
  }
  return code;
};
/**
 *
 * @param {*} person Arreglo con los personajes adentro
 * @param {*} soda La bebida cuya ubicación se quiere averiguar
 * @constant checkDrink Encuentra al personaje y/o duplicado en especifico que tiene la bebida
 */
const checkDrink = (person, soda) => {
  let acc = 0,
    oldacc = 0,
    n = 0,
    pass = false,
    len = person.length,
    code = [];
  let queue = [1, 1, 1, 1, 1];
  if (soda <= 0) {
    return (
      <div>
        {soda ? <h3 className="mybox">Nadie quizo gaseosa</h3> : <></>}
        <div>{printAct(queue, soda, len)}</div>
      </div>
    );
  }
  if (soda <= person.length) {
    return (
      <div>
        {soda ? (
          <h3 className="mybox">
            La bebida {soda} la tiene {person[soda - 1]}
          </h3>
        ) : (
          <></>
        )}
        <div>{printAct(queue, soda, len)}</div>
      </div>
    );
  }
  while (acc < soda && !pass) {
    code.push(<div key={Math.random()}>{printAct(queue, soda, len)}</div>);
    acc += len * Math.pow(2, n);
    n++;
    queue = queue.map(function (x) {
      return x * 2;
    });
    if (acc + len * Math.pow(2, n) >= soda) {
      pass = true;
      oldacc = acc;
      acc += len * Math.pow(2, n);
      var numInPlace = Math.pow(2, n);
      var remainder = soda - oldacc;
      var place = remainder / numInPlace;
      code.push(<div key={Math.random()}>{printAct(queue, place, len)}</div>);
    }
  }
  return (
    <div>
      {soda ? (
        <h3 className="mybox">
          La bebida {soda} la tiene {person[Math.ceil(place - 1)]}
        </h3>
      ) : (
        <></>
      )}
      <div>{code}</div>
    </div>
  );
};
/**
 * @constant Resultos Componente que muestra los resultados de la busqueda de la bebida y el personaje
 */
const Results = () => {
  const [number, setNumber] = useState(0);
  useEffect(() => {
    setNumber(number);
  }, [number]);
  return (
    <div>
      <div className="mybox">
        <input
          type="number"
          placeholder=""
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      {checkDrink(["Sheldon", "Leonard", "Penny", "Rajesh", "Howard"], number)}
    </div>
  );
};
export default Results;
