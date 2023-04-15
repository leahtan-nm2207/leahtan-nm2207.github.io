//Load csv data from url
d3.csv("https://2207-resources.s3.ap-southeast-1.amazonaws.com/Adoptable_Pets.csv", function (err, data) {
  if (err) {
    console.error(err);
  return;
}

//Filter data by intake type
const abandonedData = data.filter(row => row["Intake_Type"] === "ABANDONED ");
const fosterData = data.filter(row => row["Intake_Type"] === "FOSTER");
const otherData = data.filter(row => row["Intake_Type"] === "OTHERS");
const euthData = data.filter(row => row["Intake_Type"] === "EUTHANISATION REQUEST")

//Extract age values for each intake type
const abandonedAge = abandonedData.map(row => parseFloat(row.Pet_Age));
const fosterAge = fosterData.map(row => parseFloat(row.Pet_Age));
const otherAge = otherData.map(row => parseFloat(row.Pet_Age));
const euthAge = euthData.map(row => parseFloat(row.Pet_Age));

//Create a trace for each intake type
const abandonedTrace = {
  x: Array(abandonedAge.length).fill("Abandoned"),
  y: abandonedAge,
  name: "Abandoned",
  mode: 'markers',
  type: "scatter",
  marker: { color: "#B1D8B7" }
};

const fosterTrace = {
  x: Array(fosterAge.length).fill("Foster"),
  y: fosterAge,
  name: "Foster",
  mode: 'markers',
  type: "scatter",
  marker: { color: "#374F59" }
};

const otherTrace = {
  x: Array(otherAge.length).fill("Other"),
  y: otherAge,
  name: "Other",
  mode: 'markers',
  type: "scatter",
  marker: { color: "#9DB3C1" }
};

const euthTrace = {
  x: Array(euthAge.length).fill("Euthanisation"),
  y: euthAge,
  name: "Euthanisation Request",
  mode: 'markers',
  type: "scatter",
  marker: { color: "#6E9277" }
};

//Combine traces into a single data array
const plotData = [abandonedTrace, fosterTrace, euthTrace, otherTrace];

//Define the layout for the scatter plot
const layout = {
  title: {
    text: "Age Distribution of Animals Surrendered to Shelters",
    font: { size: 24,}
  },
  xaxis: {
    showgrid: true,
    zeroline: false,
    showticklabels: true,
    title: "Intake Type"
  },
  yaxis: {
    zeroline: false,
    gridcolor: "#D9D9D9",
    title: "Pet Age"
  },
  paper_bgcolor: "white",
  plot_bgcolor: "white",
  showlegend: true,
};

//Create the scatter plot in the 'scatterplot' element in HTML
Plotly.newPlot("scatterplot", plotData, layout);
});

//Above code derived from https://plotly.com/javascript/line-and-scatter/