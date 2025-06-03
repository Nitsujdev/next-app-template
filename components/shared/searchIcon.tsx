import { SearchIcon } from "lucide-react";
import React from "react";

const SearchIconButton = () => {
  return (
    <div className="bg-primary text-primary-foreground border rounded-full p-2">
      <SearchIcon className="size-4" />
    </div>
  );
};

export default SearchIconButton;
