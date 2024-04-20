import fs from "fs/promises";
import path from "path";
import chalk from "chalk";
import { validateData } from "./helpers/validateData.js";
import { checkExtention } from "./helpers/checkExtention.js";

export async function createFile(fileName, content) {
  const file = {
    fileName,
    content,
  };

  const { error } = validateData(file);
  if (error) {
    const field = error.details[0].path[0];
    console.log(chalk.red(`Please specify ${field} param!`));
  }

  const { extention, isValid } = checkExtention(fileName);
  if(!isValid) {
    console.log(
      chalk.red(
        `Sorry this application doesn't support file with extention ${extention}`
      )
    );
  }
}
