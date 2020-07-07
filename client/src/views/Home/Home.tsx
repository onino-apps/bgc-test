import React, { useContext } from "react";
import styles from "./Home.module.scss";
import classnames from "classnames/bind";
import { RideComponent } from "../../components/Ride/RideComponent";
import { RideContext } from "../../providers/RideProvider";

const cx = classnames.bind(styles);

interface Props {}

export const Home: React.FC<Props> = () => {
  const { rideList, getRandomRides } = useContext(RideContext);
  return (
    <div className={cx("container")}>
      <button onClick={getRandomRides}>GET RANDOM RIDES</button>
      <div className={cx("ride-list-container")}>
        {rideList && rideList[0] ? (
          rideList.map((ride, i) => (
            <RideComponent ride={ride} key={`ride-${i}`} />
          ))
        ) : (
          <p>Loading data</p>
        )}
      </div>
    </div>
  );
};
