import {
  flowRendererV2,
  flowStyles
} from "./chunk-5X66LOOE.js";
import {
  flowDb,
  parser$1
} from "./chunk-PGVDD7FI.js";
import "./chunk-Q7GFQY3Y.js";
import "./chunk-NN3QUT2V.js";
import "./chunk-KYDZZYHL.js";
import "./chunk-KNGROTNZ.js";
import "./chunk-SDUPMTMK.js";
import "./chunk-7ZCMV6Z5.js";
import {
  require_dayjs_min,
  require_dist,
  setConfig
} from "./chunk-KPTFFXMK.js";
import {
  __toESM
} from "./chunk-HM4MQYWN.js";

// node_modules/mermaid/dist/flowDiagram-v2-58f49b84.js
var import_dayjs = __toESM(require_dayjs_min(), 1);
var import_sanitize_url = __toESM(require_dist(), 1);
var diagram = {
  parser: parser$1,
  db: flowDb,
  renderer: flowRendererV2,
  styles: flowStyles,
  init: (cnf) => {
    if (!cnf.flowchart) {
      cnf.flowchart = {};
    }
    cnf.flowchart.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
    setConfig({ flowchart: { arrowMarkerAbsolute: cnf.arrowMarkerAbsolute } });
    flowRendererV2.setConf(cnf.flowchart);
    flowDb.clear();
    flowDb.setGen("gen-2");
  }
};
export {
  diagram
};
//# sourceMappingURL=flowDiagram-v2-58f49b84-PRKASEKW.js.map
