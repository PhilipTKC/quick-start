import { convertToTitleCase } from "../utility";

export class ToTitleCaseValueConverter {
    toView(string: string) {
        return convertToTitleCase(string);
    }
}