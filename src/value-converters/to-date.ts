import dayjs from "dayjs";
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(LocalizedFormat);

export class ToDateValueConverter {
    toView(date: string) {
        return dayjs(date).format("LL");
    }
}