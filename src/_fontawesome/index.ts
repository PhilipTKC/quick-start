import { dom, library, config } from "@fortawesome/fontawesome-svg-core";
import { faAlgolia } from "@fortawesome/free-brands-svg-icons";
import {
  faStar, faBookOpenReader, faArrowLeft, faBars,
} from "@fortawesome/free-solid-svg-icons";

library.add(faAlgolia, faStar, faBookOpenReader, faArrowLeft, faBars);

config.keepOriginalSource = false;

export { dom };
