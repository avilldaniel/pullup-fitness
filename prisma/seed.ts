import { Muscle_grp } from "@prisma/client";
import { prisma } from "../src/utils/db";

async function main() {
  // Create admin
  await prisma.appUser.create({
    data: {
      email: "avill.daniel@gmail.com",
      name: "admin",
      username: "admin",
    },
  });

  // Seed data
  const chestInit = { creator: "admin", muscleGrp: "CHEST" as Muscle_grp };
  const chest = await prisma.exercise.createMany({
    data: [
      { ...chestInit, name: "Push-ups" },
      { ...chestInit, name: "Barbell Bench Press" },
      { ...chestInit, name: "Dips" },
      { ...chestInit, name: "Dumbbell Bench Press" },
      { ...chestInit, name: "Incline Bench Press" },
      { ...chestInit, name: "Decline Press" },
      { ...chestInit, name: "Dumbbell Fly" },
      { ...chestInit, name: "Pec Deck / Machine Fly" },
      { ...chestInit, name: "Cable Crossover" },
      { ...chestInit, name: "Low-cable Crossover" },
      { ...chestInit, name: "Landmine Press" },
    ],
  });

  const backInit = { creator: "admin", muscleGrp: "BACK" as Muscle_grp };
  const back = await prisma.exercise.createMany({
    data: [
      { ...backInit, name: "Deadlift" },
      { ...backInit, name: "Pull-ups" },
      { ...backInit, name: "Chin-ups" },
      { ...backInit, name: "Bent-over Row" },
      { ...backInit, name: "Single-arm Dumbbell Row" },
      { ...backInit, name: "Lat Pulldown" },
      { ...backInit, name: "Cable Row" },
      { ...backInit, name: "Cable Pullover" },
      { ...backInit, name: "Reverse Pec Deck / Fly" },
      { ...backInit, name: "Face Pull" },
      { ...backInit, name: "Landmine Row" },
    ],
  });

  const legsInit = { creator: "admin", muscleGrp: "LEGS" as Muscle_grp };
  const legs = await prisma.exercise.createMany({
    data: [
      { ...legsInit, name: "Back Squat" },
      { ...legsInit, name: "Front Squat" },
      { ...legsInit, name: "Deadlift" },
      { ...legsInit, name: "Leg Press" },
      { ...legsInit, name: "Lunge" },
      { ...legsInit, name: "Leg Curl" },
      { ...legsInit, name: "Leg Extension" },
      { ...legsInit, name: "Standing Calf Raise" },
      { ...legsInit, name: "Romanian Deadlift" },
      { ...legsInit, name: "Hip Thrust" },
      { ...legsInit, name: "Bulgarian Split Squat" },
      { ...legsInit, name: "Hack Squat" },
    ],
  });

  const bicepInit = { creator: "admin", muscleGrp: "BICEP" as Muscle_grp };
  const bicep = await prisma.exercise.createMany({
    data: [
      { ...bicepInit, name: "Dumbbell Curl" },
      { ...bicepInit, name: "Hammer Curl" },
      { ...bicepInit, name: "Concentration Curl" },
      { ...bicepInit, name: "Chin-ups" },
      { ...bicepInit, name: "Incline Curl" },
      { ...bicepInit, name: "Cable Curl" },
      { ...bicepInit, name: "Straight Bar Curl" },
      { ...bicepInit, name: "EZ-Bar Curl" },
      { ...bicepInit, name: "Preacher Curl" },
    ],
  });

  const tricepInit = { creator: "admin", muscleGrp: "TRICEP" as Muscle_grp };
  const tricep = await prisma.exercise.createMany({
    data: [
      { ...tricepInit, name: "Dips" },
      { ...tricepInit, name: "Skullcrusher" },
      { ...tricepInit, name: "Dumbbell Overhead Extension" },
      { ...tricepInit, name: "Cable Overhead Extension" },
      { ...tricepInit, name: "Cable Push-down" },
      { ...tricepInit, name: "Close-grip Bench Press" },
      { ...tricepInit, name: "Close-grip Push-ups" },
      { ...tricepInit, name: "Underhand Cable Push-down" },
      { ...tricepInit, name: "JM Press" },
    ],
  });

  const shoulderInit = {
    creator: "admin",
    muscleGrp: "SHOULDER" as Muscle_grp,
  };
  const shoulder = await prisma.exercise.createMany({
    data: [
      { ...shoulderInit, name: "Push-ups" },
      { ...shoulderInit, name: "Barbell Overhead Press" },
      { ...shoulderInit, name: "Dumbbell Shoulder Press" },
      { ...shoulderInit, name: "Dumbbell Lateral Raise" },
      { ...shoulderInit, name: "Cable Lateral Raise" },
      { ...shoulderInit, name: "Leaning Lateral Raise" },
      { ...shoulderInit, name: "Face Pull" },
      { ...shoulderInit, name: "Incline Bench Press" },
      { ...shoulderInit, name: "Arnold Press" },
      { ...shoulderInit, name: "Barbell Shrug" },
    ],
  });

  const glutesInit = { creator: "admin", muscleGrp: "GLUTES" as Muscle_grp };
  const glutes = await prisma.exercise.createMany({
    data: [
      { ...glutesInit, name: "Glute Bridge" },
      { ...glutesInit, name: "Hip Thrust" },
      { ...glutesInit, name: "Deadlift" },
      { ...glutesInit, name: "Sumo Deadlift" },
      { ...glutesInit, name: "Back Squat" },
      { ...glutesInit, name: "Glute Kickback" },
      { ...glutesInit, name: "Lunge" },
      { ...glutesInit, name: "Bulgarian Split Squat" },
      { ...glutesInit, name: "Goblet Squat" },
      { ...glutesInit, name: "Fire Hydrant" },
      { ...glutesInit, name: "Step-up" },
      { ...glutesInit, name: "Leg Raise" },
    ],
  });

  const coreInit = { creator: "admin", muscleGrp: "CORE" as Muscle_grp };
  const core = await prisma.exercise.createMany({
    data: [
      { ...coreInit, name: "Plank" },
      { ...coreInit, name: "Side Plank" },
      { ...coreInit, name: "Bicycle Crunch" },
      { ...coreInit, name: "Reverse Crunch" },
      { ...coreInit, name: "Back Extension" },
      { ...coreInit, name: "Mountain Climber" },
      { ...coreInit, name: "Hip Bridge" },
      { ...coreInit, name: "Single-Leg Jackknife" },
      { ...coreInit, name: "Hip Dip" },
      { ...coreInit, name: "Ab Wheel Rollout" },
      { ...coreInit, name: "Windshield Wiper" },
      { ...coreInit, name: "Flutter Kick" },
    ],
  });

  const cardioInit = { creator: "admin", muscleGrp: "CARDIO" as Muscle_grp };
  const cardio = await prisma.exercise.createMany({
    data: [
      { ...cardioInit, name: "Stair Climber" },
      { ...cardioInit, name: "Treadmill" },
      { ...cardioInit, name: "Sprint" },
      { ...cardioInit, name: "Jog" },
      { ...cardioInit, name: "Swim" },
      { ...cardioInit, name: "Cycle" },
      { ...cardioInit, name: "Rowing" },
      { ...cardioInit, name: "Jump Rope" },
      { ...cardioInit, name: "Elliptical Machine" },
    ],
  });

  // const otherInit = { creator: "admin", muscleGrp: "OTHER" as Muscle_grp };
  // const other = await prisma.exercise.createMany({
  //   data: [{ ...otherInit, name: "" }],
  // });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
