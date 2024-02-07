console.log("Is the thing on?");

// Create some constants and variables to use later
const viz = document.getElementById("tableauViz");
let workbook;
let vizActiveSheet;
let dashboard;
let listsheets;

let saleMap;
let totalSales;
let salesByProduct;
let salesBySegment;

// logging information about the workbook
function logworkbookInformation() {
  // get the workbook
  workbook = viz.workbook;
  console.log(`the workbook name is: "${workbook.name}"`);

  //all the tabs in the workbook

  let sheets = workbook.publishedSheetsInfo;

  //foreach is a for loop to go through all the sheets one at a time
  sheets.forEach((element) => {
    index = element.index;
    console.log(`the sheet with index [${index}] is: "${element.name}"`);
  });

  //currently active tab
  vizActiveSheet = workbook.activeSheet;

  console.log(`The active sheet is "${vizActiveSheet.name}`);

  //the sheets in the dashboard

  listsheets = vizActiveSheet.worksheets;
  listsheets.forEach((element) => {
    index = element.index;
    worksheetName = element.name;
    console.log(`the worksheet with index [${index}] is: "${worksheetName}"`);
  });

  //assign sheets to the variables for the sheet names at the top of the app.js file
  saleMap = listsheets.find((ws) => ws.name == "SaleMap");
  totalSales = listsheets.find((ws) => ws.name == "Total Sales");
  salesByProduct = listsheets.find((ws) => ws.name == "SalesbyProduct");
  salesBySegment = listsheets.find((ws) => ws.name == "SalesbySegment");
}

//log this information once things are actually loaded
viz.addEventListener("firstinteractive", logworkbookInformation);

//define what our buttons are
const oregonWashingtonButton = document.getElementById("oregon_and_washington");
const clearFilterButton = document.getElementById("clear_filter");
const undoButton = document.getElementById("undo");

//what the buttons do when clicked
oregonWashingtonButton.addEventListener(
  "click",
  function oregonWashFunction(e) {
    //log what is pressed
    console.log(e.target.value);

    //apply the filter to all of the sheets
    saleMap.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
    totalSales.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
    salesByProduct.applyFilterAsync(
      "State",
      ["Washington", "Oregon"],
      "replace"
    );
    salesBySegment.applyFilterAsync(
      "State",
      ["Washington", "Oregon"],
      "replace"
    );
  }
);

clearFilterButton.addEventListener("click", function clearState(e) {
  console.log(e.target.value);

  //clear the filter on all sheets
  saleMap.clearFilterAsync("State");
  totalSales.clearFilterAsync("state");
  salesByProduct.clearFilterAsync("State");
  salesBySegment.clearFilterAsync("State");
});

undoButton.addEventListener("click", function undo() {
  viz.undoAsync();
});

//Adding range filters for map - doesn't make sense to do this for the other charts.
filterRangeButton.addEventListener("click", function filterRangeFunction() {
  //Bringing in min and max values specified in our number inputs on the HTML page.
  // Have to convert these to floats to keep Tableau API happy
  const minValue = parseFloat(document.getElementById("minValue").value);
  const maxValue = parseFloat(document.getElementById("maxValue").value);
  console.log(minValue, maxValue);
  saleMap.applyRangeFilterAsync("SUM(Sales)", {
    min: minValue,
    max: maxValue,
  });
});
