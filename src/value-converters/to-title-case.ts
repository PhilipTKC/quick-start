import { convertToTitleCase } from "@qs/utility";

export class ToTitleCaseValueConverter {
    toView(string: string) {
        return convertToTitleCase(string);
    }
}