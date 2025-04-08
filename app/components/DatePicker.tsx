"use client";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface DatePickerProps {
  date: Date | null;
  setDate: (date: Date | null) => void;
}

export function DatePicker({ date, setDate }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(date);

  const handleDateChange = (newDate: Date | undefined) => {
    setSelectedDate(newDate || null);
    setDate(newDate || null);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-[280px] justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={selectedDate} onSelect={handleDateChange} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
