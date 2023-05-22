import { dom, library, config } from "@fortawesome/fontawesome-svg-core";
import { faAlgolia } from "@fortawesome/free-brands-svg-icons";
import {
  faStar, faBookOpenReader, faArrowLeft, faBars, faBold, faItalic,
  faHeading, faQuoteLeft, faListOl, faLink, faImage, faColumns, faEye, faQuestionCircle, faArrowsAlt, faListUl, faPencil,
} from "@fortawesome/free-solid-svg-icons";

library.add(faAlgolia, faStar, faBookOpenReader, faArrowLeft, faBars, faPencil);

config.keepOriginalSource = false;

export { dom };
