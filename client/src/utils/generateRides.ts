import { IRide } from "./../models/ride.model";

const NB_RIDES_MAX: number = 10;
const DISTANCE_MAX: number = 5;
const DISTANCE_MIN: number = 1;
const DURATION_MAX: number = 6000;
const DURATION_MIN: number = 60;

export const generateRide = (): IRide[] => {
  const nb_rides = Math.floor((Math.random() + 0.5) * NB_RIDES_MAX);
  return new Array(nb_rides).fill(0).map((d, i) => ({
    id: i + 1,
    distance: DISTANCE_MIN + Math.floor(Math.random() * DISTANCE_MAX),
    duration: DURATION_MIN + Math.floor(Math.random() * DURATION_MAX),
    startTime: new Date(
      new Date().getTime() - Math.random() * 1000 * 3600 * 24 * 365
    ).toISOString(),
  }));
};
