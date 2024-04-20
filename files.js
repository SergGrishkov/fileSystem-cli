import fs from "fs/promises";
import path from "path";
import chalk from "chalk";
import { validateData } from "./helpers/validateData.js";
import { checkExtention } from "./helpers/checkExtention.js";
import { stat, writeFile } from "fs";

const folderPath = path.resolve("files");

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
  if (!isValid) {
    console.log(
      chalk.red(
        `Sorry this application doesn't support file with extention ${extention}`
      )
    );
  }

  const filePath = path.resolve("files", fileName);
  try {
    await fs.writeFile(filePath, content, "utf-8");
    console.log(chalk.green("Created successfully!"));
  } catch (error) {
    console.log(error);
  }
}

export async function getFiles() {
  const result = await fs.readdir(folderPath);

  if (result.length === 0) {
    console.log(chalk.red("This folder is empty"));
    return;
  }
  result.forEach((e) => console.log(e));
}

export async function getFileInfo(fileName) {
  const result = await fs.readdir(folderPath);

  if (!result.includes(fileName)) {
    console.log(chalk.red("File is absent!"));
    return;
  }

  const filePath = path.resolve(folderPath, fileName);
  const readFile = await fs.readFile(filePath, "utf-8");
  const fileExtention = path.extname(filePath);
  const name = path.basename(filePath, fileExtention);
  const { size, birthtime } = await fs.stat(filePath);

  console.log({
    content: readFile,
    extention: fileExtention.slice(1),
    name,
    size,
    createdAt: birthtime.toString(),
  });
}
