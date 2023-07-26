const genRandomString = (charNum: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let counter = 0;
  let result = "";
  while (counter < charNum) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    counter += 1;
  }
  return result;
};

const checkValidString = (string: string) => {
  return string && string?.toString()?.trim() !== "" ? true : false;
};

export { genRandomString, checkValidString };
