import { Iconfiguration } from "./models";
import Calculator from "./calculator";

const mockConfigs: Iconfiguration[] = [
  {
    initial_charge: 1,
    default_charge: 0.5,
    miles_divider: 5,
    distance_min: 1,
    duration_min: 60,
    busy_periods: [
      {
        startTime: 15,
        endTime: 18,
        additional_charge: 3,
      },
    ],
  },
  {
    initial_charge: 3,
    default_charge: 2,
    miles_divider: 5,
    distance_min: 1,
    duration_min: 60,
    busy_periods: [
      {
        startTime: 15,
        endTime: 18,
        additional_charge: 1,
      },
      {
        startTime: 1,
        endTime: 8,
        additional_charge: 2,
      },
    ],
  },
];

describe("Calculator => getPrice", () => {
  test("Return expected value with given config #1", async () => {
    let data = {
      id: 1,
      distance: 2,
      startTime: "2020-06-19T13:01:17.031Z",
      duration: 9000,
    };
    const calculator = new Calculator(mockConfigs[0]);
    expect(calculator.getPrice(data)).toEqual(6);
    data.startTime = "2020-06-19T16:01:17.031Z";
    expect(calculator.getPrice(data)).toEqual(36);
    data.startTime = "2020-06-19T19:01:17.031Z";
    data.distance = 4;
    expect(calculator.getPrice(data)).toEqual(11);
    data.startTime = "2020-06-19T17:01:17.031Z";
    expect(calculator.getPrice(data)).toEqual(71);
  });
  test("Return expected value with given config #2", async () => {
    let data = {
      id: 1,
      distance: 2,
      startTime: "2020-06-19T13:01:17.031Z",
      duration: 9000,
    };
    const calculator = new Calculator(mockConfigs[1]);
    expect(calculator.getPrice(data)).toEqual(23);
    data.startTime = "2020-06-19T01:01:17.031Z";
    expect(calculator.getPrice(data)).toEqual(43);
    data.startTime = "2020-06-19T19:01:17.031Z";
    data.distance = 1;
    expect(calculator.getPrice(data)).toEqual(13);
    data.startTime = "2020-06-19T17:01:17.031Z";
    expect(calculator.getPrice(data)).toEqual(18);
  });
  test("Equal to initial charge when distance is zéro: ", async () => {
    let data = {
      id: 1,
      distance: 0,
      startTime: "2020-06-19T13:01:17.031Z",
      duration: 9000,
    };
    const calculator = new Calculator(mockConfigs[0]);
    expect(calculator.getPrice(data)).toEqual(mockConfigs[0].initial_charge);
  });
});

describe("Calculator => getChargePerMile", () => {
  const calculator = new Calculator(mockConfigs[0]);
  test("Return a number superior or equal to default charge for each hour", async () => {
    const it = new Array(23).fill(0);
    it.forEach((item, i) => {
      const date = new Date();
      date.setUTCHours(i);
      const res = calculator.getChargePerMile(date.toISOString());
      expect(typeof res).toBe("number");
      expect(res).toBeGreaterThanOrEqual(mockConfigs[0].default_charge);
    });
  });
  test("Return always the same number when year, minutes or seconds is changed", async () => {
    const date = new Date();
    const res = calculator.getChargePerMile(date.toISOString());
    const it = new Array(10).fill(0);
    it.forEach((item, i) => {
      date.setUTCMinutes(i * 5);
      const _res = calculator.getChargePerMile(date.toISOString());
      expect(_res).toEqual(res);
    });
    it.forEach((item, i) => {
      date.setUTCSeconds(i * 5);
      const _res = calculator.getChargePerMile(date.toISOString());
      expect(_res).toEqual(res);
    });
    it.forEach((item, i) => {
      date.setUTCFullYear(2020 - i);
      const _res = calculator.getChargePerMile(date.toISOString());
      expect(_res).toEqual(res);
    });
  });
  test("Return expected value from config file", async () => {
    const date = new Date();
    date.setUTCHours(1);
    expect(calculator.getChargePerMile(date.toISOString())).toEqual(0.5 * 5);
    date.setUTCHours(16);
    expect(calculator.getChargePerMile(date.toISOString())).toEqual(3.5 * 5);
    date.setUTCHours(17);
    expect(calculator.getChargePerMile(date.toISOString())).toEqual(3.5 * 5);
    date.setUTCHours(18);
    expect(calculator.getChargePerMile(date.toISOString())).toEqual(0.5 * 5);
  });
});

describe("Calculator => checkArgument", () => {
  const calculator = new Calculator(mockConfigs[0]);
  const data = [
    {
      id: 1,
      distance: 2,
      startTime: "2020-06-19T13:01:17.031Z",
      duration: 9000,
    },
  ];
  test("Return a value on valid data", async () => {
    expect(calculator.checkArgument(data).error).toBeUndefined();
    expect(calculator.checkArgument(data).value).toBeDefined();
  });
  test("Return error on negative value ", async () => {
    data[0].distance = -2;
    expect(calculator.checkArgument(data).error).toBeDefined();
    data[0].distance = 2;
    expect(calculator.checkArgument(data).error).toBeUndefined();
    data[0].duration = -9000;
    expect(calculator.checkArgument(data).error).toBeDefined();
    data[0].duration = 9000;
  });
});
