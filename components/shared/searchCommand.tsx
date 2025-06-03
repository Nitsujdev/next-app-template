import React from "react";

const searchCommand = () => {
  return (
    <div className="hidden md:flex flex-row items-center bg-background text-foreground rounded-full px-2 py-1 gap-0.5 ml-auto">
      <span className="text-xs">⌘</span>K
    </div>
  );
};

export default searchCommand;
