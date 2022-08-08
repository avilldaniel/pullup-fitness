import { FormEvent, ReactNode, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import modalFetcher from "../fetchers/modalFetcher";
import { Button, Checkbox, Modal, TextInput } from "@mantine/core";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customExerSchema } from "../schemas/zodSchemas";
import { IModalExers } from "../utils/types";
import OrangeLoader from "./OrangeLoader";
import { TableStatsContext } from "../utils/contexts";
import { useUserStore } from "../utils/zustand-stores";
import { useFetchStats } from "../react-query-hooks/useFetchStats";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Exercise, Exercise_stat } from "@prisma/client";

const ModalExers = () => {
  // Zustand
  const username = useUserStore((state) => state.username);

  // Context
  const { muscleGrp } = useContext(TableStatsContext);

  // States
  // const [diffArray, setDiffArray] = useState<string[]>([]);
  const [presetExer, setPresetExer] = useState<string[]>([]);
  const [presetOpened, setPresetOpened] = useState(false);
  const [customOpened, setCustomOpened] = useState(false);
  const [invalidCustom, setInvalidCustom] = useState(false);
  const [invalidPreset, setInvalidPreset] = useState(false);

  // Fetch user stats
  // const { data: stats } = useFetchStats();

  const {
    isLoading,
    isError,
    data: diffArray,
  } = useQuery(
    ["exercise-diff"],
    async () => {
      const res = await axios.get("/api/exercises/differenceExercises", {
        params: {
          username,
          muscleGrp,
        },
      });

      // returns array of Exercises {id, name, muscleGrp, creator}
      return res.data;
    },
    {
      // run query only when preset modal is opened
      enabled: !!presetOpened,
    }
  );

  const queryClient = useQueryClient();
  const addStatsMutation = useMutation(
    async () => {
      const res = await axios.post("/api/stats/addStats", {
        username,
        muscleGroup: muscleGrp,
        newExers: presetExer,
        creatorName: "admin",
      });
      return res.data;
    },
    {
      onSuccess: (data) => {
        queryClient.setQueriesData(
          ["stats", username],
          (oldData: Exercise_stat[] | undefined) => {
            return [...oldData!, ...data];
          }
        );
        queryClient.setQueriesData(
          ["exercise-diff"],
          (oldData: Exercise[] | undefined) => {
            return oldData?.filter((exercise) => {
              exercise.id !== data.id;
            });
          }
        );
      },
    }
  );

  // react-hook-form (useForm) + Zod to validate custom exercise input:
  // 1 <= custom exercise name length <= 30
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(customExerSchema),
  });

  // recommended way to reset custom exercise form after submission
  // from react-hook-form docs
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ customExerSchema });
    }
  }, [formState, reset]);

  // Convert items to JSX checkboxes to insert into <Checkbox.Group>
  let checkItems: React.ReactNode[];
  if (diffArray && !isError) {
    // if (diffArray && !isError) {
    checkItems = diffArray.map((exercise: Exercise) => {
      // console.log("exercise:", exercise);
      return (
        <Checkbox
          key={exercise.id}
          value={exercise.name}
          label={exercise.name}
        />
      );
    });
  }

  /* --------------------------------PRESET EXERCISE----------------------------------- */
  // Run when checkbox group has been submitted. Pass presetExer to API route. API route
  // will iterate through each exercise name and it to user's exercise stats w/ the
  // default weight, sets, and reps.

  const handleAddedExer = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // POST request only needs username and the names[] of the exercises to be added
      // response will be array of updated stats (by querying db)
      addStatsMutation.mutate();

      // after db query, setPresetExer([]), reset invalidPreset (may already be reset),
      // setFilteredArr(w/ new exercises) to re-render table stats with new data,
      // setDiffArray(w/ removed exercises) to re-render preset checkbox group, and close modal
      setPresetExer([]);
      setInvalidPreset(false);
      // setFilteredArr(res.data);
      // const diffArrayRes = await axios.get(
      //   `/api/exercises/${username}/${muscleGrp}`
      // );
      // const diffArrayData = diffArrayRes.data;
      // /api/exercises/${username}/${muscleGrp}
      // setDiffArray(diffArrayData);
      setPresetOpened(false);
    } catch (e) {
      // if not able to query db with new exercises,
      // prompt user for "Unable to add new exercises. Please try refreshing."
      console.error(e);
      setInvalidPreset(true);
    }
  };

  /* --------------------------------CUSTOM EXERCISE----------------------------------- */
  // const onCustomSubmit: SubmitHandler<FieldValues> = async ({ customExer }) => {
  //   try {
  //     // POST request will need username, exercise name, and muscle group
  //     // it will make 2 queries to db: creating exercise & adding it as an exercise stat
  //     // response will be array of updated stats (by querying db)
  //     const res = await axios.post(`/api/exercises/post/${username}`, {
  //       newExers: customExer,
  //       muscleGroup: muscleGrp,
  //       creatorName: username,
  //     });

  //     // after db query, reset invalidCustom (may already be reset),
  //     // setFilteredArr(w/ new exercises) to re-render table stats with new data, and close modal
  //     setInvalidCustom(false);
  //     setFilteredArr(res.data);
  //     setCustomOpened(false);
  //   } catch (e) {
  //     // if not able to query db with new exercise (ex. exercise name already exists),
  //     // prompt user for "Invalid exercise."
  //     console.error(e);
  //     setInvalidCustom(true);
  //   }
  // };

  return (
    <>
      {muscleGrp !== "ALL" && typeof username === "string" && (
        <>
          {/* Add preset exercise */}
          <Button
            onClick={() => setPresetOpened(true)}
            color="orange"
            radius="md"
          >
            Add preset exercise
          </Button>
          <Modal
            opened={presetOpened}
            onClose={() => setPresetOpened(false)}
            title={`Add ${muscleGrp.toLowerCase()} exercise(s)`}
            centered
          >
            {/* List available exercises to add */}
            {isLoading ? (
              <OrangeLoader />
            ) : diffArray ? (
              // <form onSubmit={() => {}}>
              <form onSubmit={handleAddedExer}>
                <Checkbox.Group
                  // value={presetExer}
                  onChange={setPresetExer}
                  orientation="vertical"
                  spacing="md"
                  size="md"
                >
                  {checkItems!}
                </Checkbox.Group>
                {invalidPreset && (
                  <div>Unable to add new exercises. Please try refreshing.</div>
                )}
                <Button
                  fullWidth
                  mt="md"
                  variant="gradient"
                  gradient={{ from: "#d9480f", to: "#f08c00" }}
                  // onClick={handleAddedExer}
                  type="submit"
                >
                  Add exercise(s)
                </Button>
              </form>
            ) : (
              <p>
                All preset {muscleGrp.toLowerCase()} exercises have already been
                added.
              </p>
            )}
          </Modal>

          {/* Add custom exercise */}
          <Button
            onClick={() => setCustomOpened(true)}
            color="orange"
            radius="md"
          >
            Add custom exercise
          </Button>
          <Modal
            opened={customOpened}
            onClose={() => setCustomOpened(false)}
            title={`Create custom ${muscleGrp.toLowerCase()} exercise`}
            centered
          >
            {/* <form onSubmit={handleSubmit(onCustomSubmit)}>
          <TextInput
            {...register("customExer")}
            // onChange={(event) => setCustomExer(event.target.value)}
            placeholder="Name of new exercise"
            data-autofocus
          />
          {errors.customExer?.message && <div>{errors.customExer.message}</div>}
          {invalidCustom && <div>Invalid exercise. Try a different name.</div>}
          <Button
            fullWidth
            mt="md"
            variant="gradient"
            gradient={{ from: "#d9480f", to: "#f08c00" }}
            // onClick={handleNewExer}
            type="submit"
          >
            Create
          </Button>
        </form> */}
          </Modal>
        </>
      )}
    </>
  );
};

export default ModalExers;
// import { FormEvent, ReactNode, useEffect, useState } from "react";
// import useSWR from "swr";
// import axios from "axios";
// import modalFetcher from "../fetchers/modalFetcher";
// import { Button, Checkbox, Modal, TextInput } from "@mantine/core";
// import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { customExerSchema } from "../schemas/zodSchemas";
// import { IModalExers } from "../utils/types";
// import OrangeLoader from "./OrangeLoader";

// const ModalExers = ({ username, muscleGrp, setFilteredArr }: IModalExers) => {
//   // States
//   const [diffArray, setDiffArray] = useState<string[]>([]);
//   const [presetExer, setPresetExer] = useState<string[]>([]);
//   const [presetOpened, setPresetOpened] = useState(false);
//   const [customOpened, setCustomOpened] = useState(false);
//   const [invalidCustom, setInvalidCustom] = useState(false);
//   const [invalidPreset, setInvalidPreset] = useState(false);

//   // useSWR, fetch array that is to be rendered inside Modal, which will include radio buttons
//   const { data, error, isValidating } = useSWR(
//     [`/api/exercises/${username}/${muscleGrp}`, setDiffArray],
//     modalFetcher
//   );

//   // react-hook-form (useForm) + Zod to validate custom exercise input:
//   // 1 <= custom exercise name length <= 30
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(customExerSchema),
//   });

//   // recommended way to reset custom exercise form after submission
//   // from react-hook-form docs
//   useEffect(() => {
//     if (formState.isSubmitSuccessful) {
//       reset({ customExerSchema });
//     }
//   }, [formState, reset]);

//   // Convert items to JSX checkboxes to insert into <Checkbox.Group>
//   let checkItems: React.ReactNode[];
//   // let checkItems: ReactNode[];
//   if (diffArray && !error) {
//     // console.log("diffArray:", diffArray);
//     checkItems = diffArray.map((exercise: any) => {
//       // checkItems = diffArray.map((exercise: Exercise) => {
//       return (
//         <Checkbox
//           key={exercise.id}
//           value={exercise.name}
//           label={exercise.name}
//         />
//       );
//     });
//   }

//   /* --------------------------------PRESET EXERCISE----------------------------------- */
//   // Run when checkbox group has been submitted. Pass presetExer to API route. API route
//   // will iterate through each exercise name and it to user's exercise stats w/ the
//   // default weight, sets, and reps.
//   const handleAddedExer = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       // POST request only needs username and the names[] of the exercises to be added
//       // response will be array of updated stats (by querying db)
//       const res = await axios.post(`/api/exercises/post/${username}`, {
//         newExers: presetExer,
//         muscleGroup: muscleGrp,
//         creatorName: "admin",
//       });

//       // after db query, setPresetExer([]), reset invalidPreset (may already be reset),
//       // setFilteredArr(w/ new exercises) to re-render table stats with new data,
//       // setDiffArray(w/ removed exercises) to re-render preset checkbox group, and close modal
//       setPresetExer([]);
//       setInvalidPreset(false);
//       setFilteredArr(res.data);
//       const diffArrayRes = await axios.get(
//         `/api/exercises/${username}/${muscleGrp}`
//       );
//       const diffArrayData = diffArrayRes.data;
//       // /api/exercises/${username}/${muscleGrp}
//       setDiffArray(diffArrayData);
//       setPresetOpened(false);
//     } catch (e) {
//       // if not able to query db with new exercises,
//       // prompt user for "Unable to add new exercises. Please try refreshing."
//       console.error(e);
//       setInvalidPreset(true);
//     }
//   };

//   /* --------------------------------CUSTOM EXERCISE----------------------------------- */
//   const onCustomSubmit: SubmitHandler<FieldValues> = async ({ customExer }) => {
//     try {
//       // POST request will need username, exercise name, and muscle group
//       // it will make 2 queries to db: creating exercise & adding it as an exercise stat
//       // response will be array of updated stats (by querying db)
//       const res = await axios.post(`/api/exercises/post/${username}`, {
//         newExers: customExer,
//         muscleGroup: muscleGrp,
//         creatorName: username,
//       });

//       // after db query, reset invalidCustom (may already be reset),
//       // setFilteredArr(w/ new exercises) to re-render table stats with new data, and close modal
//       setInvalidCustom(false);
//       setFilteredArr(res.data);
//       setCustomOpened(false);
//     } catch (e) {
//       // if not able to query db with new exercise (ex. exercise name already exists),
//       // prompt user for "Invalid exercise."
//       console.error(e);
//       setInvalidCustom(true);
//     }
//   };

//   return (
//     <>
//       {/* Add preset exercise */}
//       <Button onClick={() => setPresetOpened(true)} color="orange" radius="md">
//         Add preset exercise
//       </Button>
//       <Modal
//         opened={presetOpened}
//         onClose={() => setPresetOpened(false)}
//         title={`Add ${muscleGrp.toLowerCase()} exercise(s)`}
//         centered
//       >
//         {/* List available exercises to add */}
//         {isValidating ? (
//           <OrangeLoader />
//         ) : data ? (
//           <form onSubmit={handleAddedExer}>
//             <Checkbox.Group
//               // value={presetExer}
//               onChange={setPresetExer}
//               orientation="vertical"
//               spacing="md"
//               size="md"
//             >
//               {checkItems!}
//             </Checkbox.Group>
//             {invalidPreset && (
//               <div>Unable to add new exercises. Please try refreshing.</div>
//             )}
//             <Button
//               fullWidth
//               mt="md"
//               variant="gradient"
//               gradient={{ from: "#d9480f", to: "#f08c00" }}
//               // onClick={handleAddedExer}
//               type="submit"
//             >
//               Add exercise(s)
//             </Button>
//           </form>
//         ) : (
//           <p>
//             All preset {muscleGrp.toLowerCase()} exercises have already been
//             added.
//           </p>
//         )}
//       </Modal>

//       {/* Add custom exercise */}
//       <Button onClick={() => setCustomOpened(true)} color="orange" radius="md">
//         Add custom exercise
//       </Button>
//       <Modal
//         opened={customOpened}
//         onClose={() => setCustomOpened(false)}
//         title={`Create custom ${muscleGrp.toLowerCase()} exercise`}
//         centered
//       >
//         <form onSubmit={handleSubmit(onCustomSubmit)}>
//           <TextInput
//             {...register("customExer")}
//             // onChange={(event) => setCustomExer(event.target.value)}
//             placeholder="Name of new exercise"
//             data-autofocus
//           />
//           {errors.customExer?.message && <div>{errors.customExer.message}</div>}
//           {invalidCustom && <div>Invalid exercise. Try a different name.</div>}
//           <Button
//             fullWidth
//             mt="md"
//             variant="gradient"
//             gradient={{ from: "#d9480f", to: "#f08c00" }}
//             // onClick={handleNewExer}
//             type="submit"
//           >
//             Create
//           </Button>
//         </form>
//       </Modal>
//     </>
//   );
// };

// export default ModalExers;
