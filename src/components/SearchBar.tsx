import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ChevronDown, Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="bg-white p-4 flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2 w-full lg:w-auto lg:flex-1">
        <Button
          variant="outline"
          size="sm"
          className="text-[#6B7A99] border-[#D5E0F2]"
        >
          All
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
        <div className="relative flex-1 max-w-sm w-full">
          <Search className="absolute left-2 top-[26px] w-4 h-4 text-[#6B7A99]" />
          <div className="flex items-center py-4">
            <Input
              placeholder="Name"
              value={value}
              onChange={onChange}
              className="max-w-sm pl-7"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
