import { customAlphabet } from "nanoid";
import { generateSecurityString } from "./utils/security";
import { sleep } from "./utils/helper";

export const valueGuessed = async (
  characters: string,
  idLength: number,
  targetId: string,
  times: number
) => {
  let securityIds: string[] = [];
  let securityIdCounts = 0;
  let securityIdGussedAts: number[] = [];
  let nanoIds: string[] = [];
  let nanoIdsCounts = 0;
  let nanoIdGussedAts: number[] = [];

  for (let i = 0; i < times; i++) {
    await sleep(2);
    const securityId = generateSecurityString(characters, idLength);
    if (securityIds.includes(targetId)) {
      securityIdGussedAts.push(securityIdCounts);
    } else {
      securityIds.push(securityId);
      securityIdCounts += 1;
    }
  }

  for (let i = 0; i < times; i++) {
    await sleep(2);
    let nanoId = customAlphabet(characters)(idLength);
    if (nanoIds.includes(targetId)) {
      nanoIdGussedAts.push(nanoIdsCounts);
    } else {
      nanoIds.push(nanoId);
      nanoIdsCounts += 1;
    }
  }

  // do {
  //   let securityId = generateSecurityString(characters, idLength);
  //   console.log(">>>> securityId", securityId);

  //   if (securityIds.includes(securityId)) {
  //     securityIdConflicts.push(securityIdCounts);
  //     console.log(">>>> securityId Conflicted At", securityIdCounts);
  //   } else {
  //     securityIds.push(securityId);
  //     securityIdCounts += 1;
  //   }
  // } while (!securityIds.includes(targetValue));

  // do {
  //   let nanoId = customAlphabet(characters)(idLength);
  //   console.log(">>>> nanoId", nanoId);
  //   if (nanoIds.includes(nanoId)) {
  //     nanoIdConflicts.push(nanoIdsCounts);
  //     console.log(">>>> nanoId Conflicted At", nanoIdsCounts);
  //   } else {
  //     nanoIds.push(nanoId);
  //     nanoIdsCounts += 1;
  //   }
  // } while (!nanoIds.includes(targetValue));

  return { securityIdGussedAts, nanoIdGussedAts };
};
