import { conflicTimes } from "./conflict";
import { valueGuessed } from "./guessed";
import { calculateAverage } from "./utils/helper";

const characters = "abcdefGHIJKLMN0123456789";
const idLength = 3;
const targetId = "eM8";
const conflictLoops = 10000;
const gussedLoops = 10000;
const totalTests = 100;

const securityConflictTimes: number[] = [];
const nanoIdConflictTimes: number[] = [];
const securityGuessedTimes: number[] = [];
const nanoIdGuessedTimes: number[] = [];

(async () => {
  for (let i = 0; i < totalTests; i++) {
    if (targetId.length != idLength) {
      console.error(
        "Incorrect Target Value with ID Length:",
        targetId,
        idLength
      );
      break;
    }

    console.log(">>>> Check Conflict Loop:", i);
    const { securityIdConflictCounts, nanoIdConflictCounts } =
      await conflicTimes(characters, idLength, conflictLoops);

    console.log(">> securityIdConflicts ", securityIdConflictCounts);
    console.log(">> nanoIdConflicts ", nanoIdConflictCounts);

    securityConflictTimes.push(securityIdConflictCounts);
    nanoIdConflictTimes.push(nanoIdConflictCounts);

    const { securityIdGussedAts, nanoIdGussedAts } = await valueGuessed(
      characters,
      idLength,
      targetId,
      gussedLoops
    );

    console.log(">> securityGussedTimes:", securityIdGussedAts.length);
    console.log(">> nanoIdGussedTimes:", nanoIdGussedAts.length);

    securityGuessedTimes.push(securityIdGussedAts.length);
    nanoIdGuessedTimes.push(nanoIdGussedAts.length);
  }

  console.log("==========================================================");

  console.log(`CharSet: ${characters}`);
  console.log(`idLength: ${idLength} targetId: ${targetId}`);
  console.log(
    `conflictLoops: ${conflictLoops} gussedLoops: ${gussedLoops} totalTests: ${totalTests}`
  );
  console.log("==========================================================");
  console.log(
    `===  Security Conflict Avg: ${calculateAverage(securityConflictTimes)}`
  );
  console.log(
    `===  NanoId Conflict Avg: ${calculateAverage(nanoIdConflictTimes)}`
  );
  console.log(
    `===  Security Guessed Total Times: ${securityGuessedTimes.reduce(
      (a, b) => a + b,
      0
    )}`
  );
  console.log(
    `===  Security GuessedAt Avt: ${calculateAverage(securityGuessedTimes)}`
  );
  console.log(
    `===  NanoId Guessed Total Times: ${nanoIdGuessedTimes.reduce(
      (a, b) => a + b,
      0
    )}`
  );
  console.log(
    `===  NanoId GuessedAt Avt: ${calculateAverage(nanoIdGuessedTimes)}`
  );
  console.log("==========================================================");
})();

// ==========================================================
// CharSet: abcdefGHIJKLMN0123456789
// idLength: 3 targetId: eM8
// conflictLoops: 1000 gussedLoops: 1000 totalTests: 30
// ==========================================================
// ===  Security Conflict Avg: 40
// ===  NanoId Conflict Avg: 35
// ===  Security Guessed Total Times: 1497
// ===  Security GuessedAt Avt: 50
// ===  NanoId Guessed Total Times: 494
// ===  NanoId GuessedAt Avt: 16
// ==========================================================

// ==========================================================
// CharSet: abcdefGHIJKLMN0123456789
// idLength: 3 targetId: eM8
// conflictLoops: 10000 gussedLoops: 10000 totalTests: 100
// ==========================================================
// ===  Security Conflict Avg: 3181
// ===  NanoId Conflict Avg: 2884
// ===  Security Guessed Total Times: 291267
// ===  Security GuessedAt Avt: 2913
// ===  NanoId Guessed Total Times: 269738
// ===  NanoId GuessedAt Avt: 2697
// ==========================================================