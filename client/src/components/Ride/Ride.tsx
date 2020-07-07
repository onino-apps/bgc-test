import React from "react";
import styles from "./Ride.module.scss";
import { IRide } from "../../models/ride.model";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);

interface Props {
  ride: IRide;
  onClick: (ride: IRide) => void;
  exceeded: boolean;
}

export const Ride: React.FC<Props> = ({ ride, onClick, exceeded }) => {
  return (
    <div
      className={cx("container", { exceeded })}
      onClick={() => onClick(ride)}
    >
      <div className={cx("left")}>
        <div>{ride.id}</div>
        <div>{ride.visited && "clicked"}</div>
      </div>

      <div className={cx("right")}>
        {`${ride.price} €` || "Result not available"}
      </div>
    </div>
  );
};
