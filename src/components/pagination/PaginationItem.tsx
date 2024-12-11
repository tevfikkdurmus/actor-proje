"use client";
import React from "react";

interface PaginationItemProps {
  number: number;
  selected: boolean;
  setActivePage: React.Dispatch<React.SetStateAction<number>>; // Bu doğru tür
}

const PaginationItem: React.FC<PaginationItemProps> = ({
  number,
  selected,
  setActivePage,
}) => {
  return (
    <div
      onClick={() => setActivePage(number)}
      className={`${
        selected ? "bg-slate-400" : "bg-slate-600"
      } w-10 h-10 flex justify-center items-center rounded-full text-white ${
        selected ? "cursor-default" : "cursor-pointer"
      }`}
    >
      {number}
    </div>
  );
};

export default PaginationItem;
