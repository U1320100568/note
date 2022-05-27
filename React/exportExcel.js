const XLSX = require('xlsx');

function createXslFileTemplateObjUrl() {
  const header = ['provider', 'name', 'price'];
  const rows = [
    {provider: 'shopee', name: 'my-test-product', price: 2000},
    {provider: 'yahoo', name: 'my-test-product', price: 2000},
  ];
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(rows, {header});
  XLSX.utils.book_append_sheet(wb, ws, 'MySheet');
  const wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'array',
  });
  const objUrl = URL.createObjectURL(
    new Blob([wbout], {type: 'application/octet-stream'}),
  );
  return objUrl;
}

function readXslFile(file) {
  return new Promise((resolve) => {
    try {
      const reader = new FileReader();
      reader.onLoad = (e) => {
        const data = new Uint8Array(e.target.result);
        const wb = XLSX.read(data);
        const ws = wb.Sheets['MySheet'];
        const output = XLSX.utils.sheet_to_json(ws);
        resolve(output);
      };
      reader.readAsArrayBuffer(file);
    } catch (ex) {
      console.warn(ex);
      resolve(null);
    }
  });
}

function createTest(filename) {
  const header = ['provider', 'name', 'price'];
  const rows = [
    {provider: 'shopee', name: 'my-test-product', price: 2000},
    {provider: 'yahoo', name: 'my-test-product', price: 2000},
  ];
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(rows, {header});
  XLSX.utils.book_append_sheet(wb, ws, 'MySheet');

  XLSX.writeFile(wb, filename, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'array',
  });
}

function readTest(filename) {
  const wb = XLSX.readFile(filename);
  const ws = wb.Sheets['MySheet'];
  const json = XLSX.utils.sheet_to_json(ws);
  console.log(json);
}

function test() {
  createTest('test.xlsx');
  readTest('test.xlsx');
}

export {createXslFileTemplateObjUrl, readXslFile};
