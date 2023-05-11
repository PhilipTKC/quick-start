export class ObjectKeysValueConverter {
    toView(obj: any): any[] {
        const temp = [];

        for (const prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                temp.push(obj[prop]);
            }
        }

        return temp;
    }
}