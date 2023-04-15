
//Load csv data from url
d3.csv("https://2207-resources.s3.ap-southeast-1.amazonaws.com/Animal_Abuse+(1).csv", function (err, data) {
  if (err) {
    console.error(err);
    return;
  }
console.log(data);

//Filter data by animal abuse type under complaint type 
const abuseTypeData = data.filter(row => row["Complaint Type"] === "Animal Abuse");
console.log(abuseTypeData);

//Count number of animal abuse cases for each type
const neglectCount = abuseTypeData.filter(row => row.Descriptor === "Neglected").length;
const torturedCount = abuseTypeData.filter(row => row.Descriptor === "Tortured").length;
const othersCount = abuseTypeData.filter(row => row.Descriptor === "Others").length;

//Used to check if the above code is running 
console.log(neglectCount);
console.log(torturedCount);
console.log(othersCount);

//Create a trace for each country
const neglectTrace = {
  x: ["Neglected"],
  y: [neglectCount],
  name: "Neglected",
  type: "bar",
  marker: { color: "#1F628E" }
};
  
const torturedTrace = {
  x: ["Tortured"],
  y: [torturedCount],
  name: "Tortured",
  type: "bar",
  marker: { color: "#B6D7DF" }
};
  
const othersTrace = {
  x: ["Others"],
  y: [othersCount],
  name: "Others",
  type: "bar",
  marker: { color: "#0C6980" }
};

//Combine traces into a single data array
const plotData = [neglectTrace, torturedTrace, othersTrace];

//Define the layout for the bar chart
const layout = {
  width: 800,
  height: 510,
  title: {
    text: "Types of Abuse Cases in NYC Boroughs",
      font: {
        family: 'sans-serif',
        weight: 'bold',
        size: 24,
      }
    },
    xaxis: {
      showgrid: false,
      zeroline: false,
      tickangle: 0,
      showticklabels: true,
    },
    yaxis: {
      zeroline: false, 
      gridcolor: "white",
      title: "Number"
    },
    paper_bgcolor: "#E3EBF2",
    plot_bgcolor:"#E3EBF2",
    showlegend: true, 
};

//Create the barchat in the 'barplot' element in HTML 
Plotly.newPlot("barplot", plotData, layout);
});