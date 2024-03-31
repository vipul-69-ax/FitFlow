import { DateInfo } from "../../ts";

export const generateRandomString = (length: number): string =>
  Array.from({ length }, () =>
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(
      Math.floor(Math.random() * 62)
    )
  ).join("");

export function capitalizeWords(sentence: string): string {
  const words = sentence.split(" ");
  const truncatedWords = words.slice(0, 4); // Limit to the first 4 words
  return truncatedWords
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}



export function getDateInfo(): DateInfo {
  const today = new Date();
  const date = today.getDate();
  const day = today.getDay();
  const month = today.getMonth();
  const year = today.getFullYear();

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayName = dayNames[day];
  const monthName = monthNames[month];

  return {
    date,
    day,
    month,
    year,
    dayName,
    monthName,
  };
}
