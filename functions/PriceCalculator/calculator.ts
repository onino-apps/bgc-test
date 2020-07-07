import { IQuerry, Iconfiguration } from "./models";
import * as configuration from "./configuration.json";
import * as Joi from "@hapi/joi";

// Schema used to validate incoming request payloads
const schema = Joi.array().items({
  id: Joi.number().min(0).required(),
  distance: Joi.number().min(configuration.distance_min).required(),
  startTime: Joi.date().required(),
  duration: Joi.number().min(configuration.duration_min).required(),
});

/**
 * Class for price calculation. Requires a configuration object to instanciate
 * @param {Iconfiguration} config - a configuration object
 */
export default class Calculator {
  private config: Iconfiguration;
  constructor(_config: Iconfiguration) {
    this.config = _config;
  }
  /**
   * Take a ride object as parameter and return the ride price in euros
   * @param {IQuerry} d - a ride object
   * @return {number} The ride price in euros
   */
  public getPrice = (d: IQuerry): number => {
    return (
      this.config.initial_charge +
      this.getChargePerMile(d.startTime) * d.distance
    );
  };
  /**
   * Take a start time as parameter and return the value of charge per mile that should be applied for calculation
   * The function apply an additional charge for each corresponding time period it finds in config
   * If two time periods are overlaping, two additional charges will be applied
   * @param {string} startTime - Start time of a ride is iso string format
   * @return {number} the price in euro per mile.
   */
  public getChargePerMile = (startTime: string) => {
    const hour = new Date(startTime).getUTCHours();
    const charge = this.config.busy_periods.reduce((acc, cur) => {
      return (
        acc +
        Number(
          hour >= cur.startTime && (hour < cur.endTime || cur.endTime === 0)
        ) *
          cur.additional_charge
      );
    }, this.config.default_charge);

    return charge * this.config.miles_divider;
  };

  /**
   * Take an object and check compliance using the Joi library
   * Returns an object with error property if any errors
   * Else return an object with a value property
   * @param {object} d - any litteral object
   * @return {object} An object with error or value property.
   */
  public checkArgument = (d: any) => {
    return schema.validate(d);
  };
}

export const calculator = new Calculator(configuration);
