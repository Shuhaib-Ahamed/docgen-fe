import { useQuery } from "react-query";

export const fetchCountries = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await res.json();

  return data;
};

export const useCountryFetch = () => {
  return useQuery(["countryFetch"], fetchCountries);
};
