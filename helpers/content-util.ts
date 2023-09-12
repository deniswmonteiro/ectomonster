import path from "path";
import fs from "fs";

export function buildPath(week: string, day: string) {
    return path.join(process.cwd(), `/content/${week}/`, `${day}.json`);
}

export function extractData(filePath: string) {
    const fileData = fs.readFileSync(filePath);

    return JSON.parse(fileData.toString());
}

export function updateData(filePath: string, data: any) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
}