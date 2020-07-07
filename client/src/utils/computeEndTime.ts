import { IRide } from "./../models/ride.model";
export const computeEndTime = ({
  startTime,
  duration,
}: IRide): string | Error => {
  try {
    return new Date(
      new Date(startTime).getTime() + duration * 1000
    ).toISOString();
  } catch (e) {
    console.log("Unable to parse with given arguments");
    return "Error";
  }
};
