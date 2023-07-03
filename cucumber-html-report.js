const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "./cypress/cucumberReports",
  reportPath: "cypress/cucumberReports/cucumber-htmlreport.html",
  metadata: {
    browser: {
      name: "chrome",
      version: "100",
    },
    device: "Local test machine",
    platform: {
      name: "windows",
      version: "11.01",
    },
  },
  customData: {
    title: "Cypress first testing",
    data: [
      { label: "Project", value: "Learning Cypress Automation" },
      { label: "Release", value: "1.2.3" },
      { label: "Cycle", value: "B11221.34321" },
      { label: "Execution Start Time", value: "Jul 2nd 2023, 02:31 PM EST" },
      { label: "Execution End Time", value: "Jul 2nd 2023, 02:56 PM EST" },
    ],
  },
});