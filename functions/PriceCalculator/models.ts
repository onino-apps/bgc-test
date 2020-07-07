export interface IQuerry {
  id: number;
  distance: number;
  startTime: string; // ISO date
  duration: number; // Duration in SECONDS
}

export interface IResponse extends IQuerry {
  price: number;
}

export interface Iconfiguration {
  initial_charge: number;
  default_charge: number;
  miles_divider: number;
  distance_min: number;
  duration_min: number;
  busy_periods: {
    startTime: number;
    endTime: number;
    additional_charge: number;
  }[];
}
