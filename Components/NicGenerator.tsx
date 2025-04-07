"use client";

import { useState } from "react";

interface MonthData {
  month: string;
  days: number;
}

interface ExtractedData {
  year: string;
  dayList: string;
  character: string;
}

interface DayAndGenderResult {
  day: string;
  month: string;
  gender: string;
}

const d_array: MonthData[] = [
  { month: "January", days: 31 },
  { month: "February", days: 29 },
  { month: "March", days: 31 },
  { month: "April", days: 30 },
  { month: "May", days: 31 },
  { month: "June", days: 30 },
  { month: "July", days: 31 },
  { month: "August", days: 31 },
  { month: "September", days: 30 },
  { month: "October", days: 31 },
  { month: "November", days: 30 },
  { month: "December", days: 31 },
];

export default function NICValidator() {
  const [nicNumber, setNicNumber] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const handleValidate = () => {
    setError("");
    setBirthday("");
    setGender("");

    if (validation(nicNumber)) {
      const extractedData: ExtractedData = extractData(nicNumber);
      const findedData: DayAndGenderResult = findDayANDGender(
        extractedData.dayList,
        d_array
      );

      const month = findedData.month;
      const year = extractedData.year;
      const day = findedData.day;
      const gender = findedData.gender;
      const bday = `${day}-${month}-${year}`;
      const birthdayDate = new Date(
        bday.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
      );
      const formattedBirthday = getFormattedDate(birthdayDate);

      setBirthday(formattedBirthday);
      setGender(gender);
    } else {
      setError("You Entered NIC Number Is wrong");
    }
  };

  const handleClear = () => {
    setNicNumber("");
    setError("");
    setBirthday("");
    setGender("");
  };

  return (
    <div className="max-w-md mx-auto mt-56 p-6 bg-gray-200 rounded-lg shadow-xl">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          NIC Number
        </label>
        <input
          type="text"
          id="nicNumber"
          value={nicNumber}
          onChange={(e) => setNicNumber(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Your NIC No"
          autoFocus
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>

      <div className="mb-4">
        {birthday && (
          <h6 className="block text-gray-700 text-lg mb-2">
            Date Of Birth (DOB): <span className="font-bold">{birthday}</span>
          </h6>
        )}
        {gender && (
          <h6 className="block text-gray-700 text-lg mb-2">
            {" "}
            Gender:<span className="font-bold"> {gender} </span>
          </h6>
        )}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={handleValidate}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Validate
        </button>
        <button
          onClick={handleClear}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

function findDayANDGender(
  days: string,
  d_array: MonthData[]
): DayAndGenderResult {
  let dayList = parseInt(days);
  let month = "";
  const result: DayAndGenderResult = { day: "", month: "", gender: "" };

  if (dayList < 500) {
    result.gender = "Male";
  } else {
    result.gender = "Female";
    dayList = dayList - 500;
  }

  for (let i = 0; i < d_array.length; i++) {
    if (d_array[i].days < dayList) {
      dayList = dayList - d_array[i].days;
    } else {
      month = d_array[i].month;
      break;
    }
  }
  result.day = dayList.toString(); // Convert number to string to match type
  result.month = month;
  return result;
}

function extractData(nicNumber: string): ExtractedData {
  const result: ExtractedData = { year: "", dayList: "", character: "" };

  if (nicNumber.length === 10) {
    result.year = nicNumber.substr(0, 2);
    result.dayList = nicNumber.substr(2, 3);
    result.character = nicNumber.substr(9, 1);
  } else if (nicNumber.length === 12) {
    result.year = nicNumber.substr(0, 4);
    result.dayList = nicNumber.substr(4, 3);
    result.character = "no";
  }
  return result;
}

function validation(nicNumber: string): boolean {
  if (
    nicNumber.length === 10 &&
    !isNaN(parseInt(nicNumber.substr(0, 9))) &&
    isNaN(parseInt(nicNumber.substr(9, 1).toLowerCase())) &&
    ["x", "v"].includes(nicNumber.substr(9, 1).toLowerCase())
  ) {
    return true;
  } else if (nicNumber.length === 12 && !isNaN(parseInt(nicNumber))) {
    return true;
  }
  return false;
}

function getFormattedDate(date: Date): string {
  const year = date.getFullYear();
  const month = (1 + date.getMonth()).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${day}-${month}-${year}`;
}
