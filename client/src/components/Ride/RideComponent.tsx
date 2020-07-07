import React, { useContext } from "react";
import { Ride } from "./Ride";
import { RideContext } from "../../providers/RideProvider";
import { formatDuration } from "../../utils/formatDuration";
import { computeEndTime } from "../../utils/computeEndTime";
import { IRide } from "../../models/ride.model";
import { DISTANCE_LIMIT } from "../../configuration/constants";

interface Props {
  ride: IRide;
}

const buildMessage = (d: IRide) =>
  `${formatDuration(d.duration)} ${computeEndTime(d)}`;

export const RideComponent: React.FC<Props> = ({ ride }) => {
  const { setVisited } = useContext(RideContext);
  const onRideClick = (ride: IRide) => {
    setVisited(ride.id);
    alert(buildMessage(ride));
  };
  return (
    <Ride
      ride={ride}
      onClick={onRideClick}
      exceeded={ride.distance > DISTANCE_LIMIT}
    />
  );
};
