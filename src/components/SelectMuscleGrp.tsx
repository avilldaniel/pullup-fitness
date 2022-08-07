import { Select } from "@mantine/core";
import { Muscle_grp } from "@prisma/client";
import React, { useContext, useEffect } from "react";
import { TableStatsContext } from "../utils/contexts";

const SelectMuscleGrp = () => {
  const { muscleGrp, setMuscleGrp } = useContext(TableStatsContext);
  // Convert list of enums into an array
  const muscleGrps = Object.keys(Muscle_grp);

  // Items to render for select dropdown
  const selectOptions = [{ value: "ALL", label: "All" }];

  useEffect(() => {
    muscleGrps.map((group, i) => {
      selectOptions.push({
        value: `${group}`,
        label: `${group[0].toUpperCase() + group.slice(1).toLowerCase()}`,
      });
    });
  });

  return (
    <>
      <Select
        label="Select a muscle group"
        defaultValue={"All"}
        value={muscleGrp}
        onChange={(e: string) => setMuscleGrp(e)}
        data={selectOptions}
        transition="scale-y"
        transitionDuration={100}
        transitionTimingFunction="ease"
      />
    </>
  );
};

export default SelectMuscleGrp;
