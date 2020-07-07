import React, { useState, useEffect } from "react";
import { IRide } from "../models/ride.model";
import { urls } from "../configuration/urls";
import { generateRide } from "../utils/generateRides";
import { rideListMock } from "../assets/data/ride-list.mock";

interface Props {
  children: React.ReactNode;
}

interface IRideContext {
  rideList: IRide[];
  getRandomRides: () => void;
  setVisited: (rideId: number) => void;
}

export const RideContext = React.createContext({} as IRideContext);

export const RideProvider: React.FC<Props> = ({ children }) => {
  const [rideList, setrideList] = useState([] as IRide[]);

  useEffect(() => {
    getPrices(rideListMock);
  }, []);

  const getRandomRides = () => {
    getPrices(generateRide());
  };

  const getPrices = async (list: IRide[]) => {
    try {
      const res = await fetch(urls.PRICE_CALCULATOR, {
        method: "POST",
        body: JSON.stringify(list),
        headers: { "Content-Type": "application/json" },
      });
      const calculatedList: IRide[] = await res.json();
      setrideList(calculatedList);
    } catch (e) {
      alert(`Error: "calculator api is not responding correctly"`);
      setrideList(list.map((d) => ({ ...d, price: 0 })));
    }
  };

  const setVisited = (rideId: number) => {
    setrideList((rideList) => {
      return rideList.map((ride) => ({
        ...ride,
        visited: ride.id === rideId ? true : ride.visited,
      }));
    });
  };

  return (
    <RideContext.Provider
      value={{
        rideList,
        getRandomRides,
        setVisited,
      }}
    >
      {children}
    </RideContext.Provider>
  );
};
