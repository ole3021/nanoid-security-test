import { customAlphabet } from "nanoid";
import { generateSecurityString } from "./utils/security";
import { sleep } from "./utils/helper";

export const conflicTimes = async (
  characters: string,
  idLength: number,
  times: number
) => {
  let securityIds: string[] = [];
  let securityIdCounts = 0;
  let securityIdConflicts: number[] = [];
  let nanoIds: string[] = [];
  let nanoIdsCounts = 0;
  let nanoIdConflicts: number[] = [];

  for (let i = 0; i < times; i++) {
    await sleep(2);
    let securityId = generateSecurityString(characters, idLength);
    if (securityIds.includes(securityId)) {
      securityIdConflicts.push(securityIdCounts);
      // console.log(">>>> securityId Conflicted At", securityIdCounts);
    } else {
      securityIds.push(securityId);
      securityIdCounts += 1;
    }
  }

  for (let i = 0; i < times; i++) {
    await sleep(2);
    let nanoId = customAlphabet(characters)(idLength);
    if (nanoIds.includes(nanoId)) {
      nanoIdConflicts.push(nanoIdsCounts);
      // console.log(">>>> nanoId Conflicted At", nanoIdsCounts);
    } else {
      nanoIds.push(nanoId);
      nanoIdsCounts += 1;
    }
  }

  return {
    securityIdConflictCounts: securityIdConflicts.length,
    nanoIdConflictCounts: nanoIdConflicts.length,
  };
};
