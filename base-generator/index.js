/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

require('dotenv').config({ path: path.resolve(__dirname, '.env') })
require("./content");
require("./docs");