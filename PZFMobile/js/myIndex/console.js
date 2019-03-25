const colors = {
  indigo: '#6610f2',
  purple: '#6f42c1',
  pink: '#e83e8c',
  orange: '#fd7e14',
  yellow: '#ffc107',
  green: '#28a745',
  teal: '#20c997',
  cyan: '#17a2b8',
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  info: '#17a2b8',
  warning: '#ffc107',
  danger: '#dc3545',
  dark: '#343a40'
};

function chooseColor() {
  const colorNames = Object.keys(colors);
  const length     = colorNames.length;
  const num        = Math.floor(Math.random() * length);
  const key        = colorNames[num];
  return colors[key];
}

// 打印

let content = '';
const logOn   = true;

const print = (...params) => {
  console.log(`%c[${content}]\n${params}`, `color:${chooseColor()}`);
};

// const defaultConsole = console;

// const console = {
//   log: function(...obj) {
//     if (logOn) {
//       defaultConsole.log(`%c${this.content}${obj}`, `color: #007bff`);
//     }
//   },

//   // tslint:disable-next-line:typedef
//   logger: function(...obj) {
//     if (infoOn) {
//       defaultConsole.log(`%c${this.content}${obj}`, `color:${chooseColor()}`);
//     }
//   },

//   // tslint:disable-next-line:typedef
//   err: function(...obj) {
//     if (errOn) {
//       defaultConsole.log(`%c${this.content}${obj}`, `color:${colors.red}`);
//     }
//   }
// }
