import React, { useState } from "react";
import type { FC } from "react";
import { ClockContext, clockDefault } from "../../utils/contexts";

interface IClockProvider {
  children: React.ReactNode;
}
export const ClockProvider: FC<IClockProvider> = ({ children }) => {
  const [seconds, setSeconds] = useState(clockDefault.seconds);

  return (
    <ClockContext.Provider
      value={{
        seconds,
        setSeconds,
      }}
    >
      {children}
    </ClockContext.Provider>
  );
};
