import classes from "./CoinCard.module.css";
import { useState, useEffect } from "react";

function CoinCard(props: any) {
  const [color, setColor] = useState("#00dc00");

  useEffect(() => {
    if (props.percent < 0) {
      setColor("red");
    }
  }, [color, props.percent]);
  return (
    <div className={classes.card}>
      <div className={classes.cardHeader}>
        <img alt={props.title} height={50} src={props.image} width={50} />
        <p className={classes.p}>{props.title}</p>
      </div>
      <div className={classes.cardBody}>
        <p className={classes.p}>Price changes:</p>
        <p style={{ color: color }} className={classes.p}>
          {props.percent.toFixed(2)} %
        </p>
      </div>
      <div className={classes.cardBody}>
        <p className={classes.p}>Price:</p>
        <p className={classes.p}> {props.price.toFixed(2)} €</p>
      </div>
    </div>
  );
}

export default CoinCard;
