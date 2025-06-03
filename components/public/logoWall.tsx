"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

const LogoWall = () => {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col items-center sm:flex-row justify-between gap-8 w-full opacity-50">
      <Image
        src={
          theme === "dark"
            ? "/brand/luftloch_light.svg"
            : "/brand/luftloch_dark.svg"
        }
        alt="luftloch"
        width={1}
        height={1}
        className="w-24"
      />
      <Image
        src={
          theme === "dark"
            ? "/brand/luftloch_light.svg"
            : "/brand/luftloch_dark.svg"
        }
        alt="luftloch"
        width={1}
        height={1}
        className="w-24"
      />
      <Image
        src={
          theme === "dark"
            ? "/brand/luftloch_light.svg"
            : "/brand/luftloch_dark.svg"
        }
        alt="luftloch"
        width={1}
        height={1}
        className="w-24"
      />
      <Image
        src={
          theme === "dark"
            ? "/brand/luftloch_light.svg"
            : "/brand/luftloch_dark.svg"
        }
        alt="luftloch"
        width={1}
        height={1}
        className="w-24"
      />
      <Image
        src={
          theme === "dark"
            ? "/brand/luftloch_light.svg"
            : "/brand/luftloch_dark.svg"
        }
        alt="luftloch"
        width={1}
        height={1}
        className="w-24"
      />
    </div>
  );
};

export default LogoWall;
