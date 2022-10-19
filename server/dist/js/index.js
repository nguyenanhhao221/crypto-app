'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const dotenv = __importStar(require('dotenv'));
const cors_1 = __importDefault(require('cors'));
const morgan_1 = __importDefault(require('morgan'));
const path_1 = __importDefault(require('path'));
const getCryptoRouter_1 = __importDefault(require('./routes/getCryptoRouter'));
const getCryptoNewsRouter_1 = __importDefault(
  require('./routes/getCryptoNewsRouter')
);
const getCryptoExchangesRouter_1 = __importDefault(
  require('./routes/getCryptoExchangesRouter')
);
dotenv.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
const PORT = 8000;
app.listen(PORT, () =>
  console.log(`[server] Server is listening on PORT: ${PORT}`)
);
app.use(
  '/',
  express_1.default.static(
    path_1.default.join(__dirname, '../../../client/build')
  )
);
app.use('/get-crypto', getCryptoRouter_1.default);
app.use('/get-crypto-news', getCryptoNewsRouter_1.default);
app.use('/exchanges', getCryptoExchangesRouter_1.default);
module.exports = app;
