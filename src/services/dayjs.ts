import dayjs from "dayjs";
import "dayjs/locale/en";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.locale("en");
dayjs.extend(advancedFormat);

export default dayjs;
