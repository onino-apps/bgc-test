export const urls: { PRICE_CALCULATOR: string } =
  process.env.NODE_ENV === "production"
    ? {
        PRICE_CALCULATOR: process.env.REACT_APP_RIDE_CALCULATOR_PROD!,
      }
    : {
        PRICE_CALCULATOR: process.env.REACT_APP_RIDE_CALCULATOR_DEV!,
      };
