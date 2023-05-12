import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { doesContentFolderExist } from "./common";
import { generateTableOfContents } from './docs';
import { saveToAlgolia } from './content';

console.log("Starting Generator...")

doesContentFolderExist();
generateTableOfContents();
saveToAlgolia();

console.log("Complete");