import fs from "fs/promises";
import path from "path";

const db_path = path.join(process.cwd(), "src", "db.json");


export interface Database {
  Agents: any[];
  Reports: any[];
}
export const readDb = async (): Promise<Database> => {
  try {
    const data = await fs.readFile(db_path, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return { Agents: [], Reports: [] };
  }
};

export const writeDb = async (data: Database): Promise<void> => {
  await fs.writeFile(db_path, JSON.stringify(data, null, 2));
};