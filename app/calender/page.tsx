"use client";
import { Modal } from "@/components/ui/modal";
import clsx from "clsx";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isToday,
  startOfMonth,
} from "date-fns";
import { useState } from "react";
import BookingList from "../booking/list/page";
import Day from "./day";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calender() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const currentDate = new Date();
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const startDayIndex = getDay(firstDayOfMonth);
  const endDayIndex = 6 - getDay(lastDayOfMonth);
  console.log(currentDate);
  console.log(endDayIndex);
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-center">{format(currentDate, "MMMM yyyy")}</h2>
      </div>
      <div className="grid grid-cols-7">
        {WEEK_DAYS.map((day) => (
          <div key={day} className="text-center">
            {day}
          </div>
        ))}
        {Array.from({ length: startDayIndex }).map((_, index) => (
          <div key={index} className="border p-2" />
        ))}
        {daysInMonth.map((day, index) => {
          return (
            <div
              key={index}
              className={clsx("cursor-pointer border p-2 text-center", {
                "bg-gray-200": isToday(day),
                "text-gray-900": isToday(day),
              })}
              onClick={() => {
                setIsOpen(true);
                setSelectedDate(day);
              }}
            >
              {format(day, "d")}
            </div>
          );
        })}
        {Array.from({ length: endDayIndex }).map((_, index) => (
          <div key={index} className="border p-2" />
        ))}
        {isOpen && (
          <Modal
            title={selectedDate.toDateString()}
            description={selectedDate.toDateString()}
            isOpen
            onClose={() => setIsOpen(false)}
          >
            <Day date={format(selectedDate, "yyyy-MM-dd")} />
          </Modal>
        )}
      </div>
    </div>
  );
}
