import React, { useContext } from "react";
import type { FC } from "react";
import { MantineProvider, Select } from "@mantine/core";
import { Muscle_grp } from "@prisma/client";
import { TableStatsContext } from "../../utils/contexts";
import stat from "../../styles/Stats.module.css";

const SelectMuscleGrp: FC = () => {
  // Context
  const { muscleGrp, setMuscleGrp } = useContext(TableStatsContext);

  // Convert list of enums into an array
  const muscleGrps = Object.keys(Muscle_grp);

  // Set default value of select dropdown (All), then map rest of muscle groups
  const selectOptions = [{ value: "ALL", label: "All" }];
  muscleGrps.map((group, i) => {
    selectOptions.push({
      value: `${group}`,
      label: `${group[0].toUpperCase() + group.slice(1).toLowerCase()}`,
    });
  });

  return (
    <>
      <MantineProvider theme={{ colorScheme: "light" }}>
        <h6 className={stat.header}>Exercises</h6>
        <Select
          label="Select a muscle group"
          defaultValue={"All"}
          value={muscleGrp}
          onChange={(e: string) => setMuscleGrp(e)}
          data={selectOptions}
          maxDropdownHeight={420}
          transition="scale-y"
          transitionDuration={100}
          transitionTimingFunction="ease"
          styles={{
            label: { color: "white" },
          }}
          style={{
            marginTop: "-.5em",
          }}
        />
      </MantineProvider>
    </>
  );
};

export default SelectMuscleGrp;
