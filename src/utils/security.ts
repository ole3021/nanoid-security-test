import { randomInt } from "crypto";

export const generateSecurityString = (charset: string, length: number) => {
  // 定义字符集
  // const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = "";

  // 循环生成每个字符

  for (let i = 0; i < length; i++) {
    // 生成一个随机索引
    let randomIndex = randomInt(0, charset.length - 1);
    // 将随机索引处的字符添加到结果中
    result = result + charset[randomIndex];
  }

  return result;
};

// // 生成一个8字符的随机字符串
// randomString = generateRandomString(8);
// print(randomString);
