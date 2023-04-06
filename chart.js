// Pet Ownership in US and SG --> doughnut chart that toggles between two datasets

   // Define data for US chart
   var chart1aData = {
    labels: ["Dog", "Cats", "Fish"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#B44981", "#EFBFD8", "#FFFEF4"],
        borderWidth:0,
      },
    ],
  };

// data retrieved from https://www.forbes.com/advisor/pet-insurance/pet-ownership-statistics/

   // Define data for SG chart
  var chart1bData = {
    labels: ["Dog", "Cats", "Fish"],
    datasets: [
      {
        data: [100, 150, 200],
        backgroundColor: ["#EFBFD8", "#FFFEF4", "#B44981"],
        borderWidth:0,
      },
    ],
  };

// data retrieved from https://www.statista.com/statistics/1320854/singapore-pet-ownership-rate-by-type/#:~:text=Pet%20ownership%20rate%20Singapore%202022%2C%20by%20type&text=According%20to%20a%20survey%20on,indicated%20that%20they%20owned%20dogs.

  //Create the chart
  var populationChart = new Chart("populationChart", {
    type: "doughnut",
    data: chart1aData,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        width: 70,
        height: 70,
        legend: {
          position: 'bottom',
        },
        borderWidth: 0,
    }
  });

//toggle function
  var chart1bDataVisible = false;
  //if SG data not visible, call function toggleData ()
  function toggleData() {
    // If SG data set is visible, switch to US data set
    if (chart1bDataVisible) {
      populationChart.data = chart1aData;
      chart1bDataVisible  = false;
    } 
    // If US data set is visible, switch to SG data set
    else {
      populationChart.data = chart1bData;
      chart1bDataVisible = true;
    }
    populationChart.update();
  }

//Pet Ownership demographics based on generations and gender
      // Define data for generation chart
      var chart2Data = {
        labels: ["GenZ", "Millenial", "GenX", "Baby Boomer", "Builder"],
        datasets: [
          {
            label: "Pet Ownership by Generation",
            data: [14, 32, 24, 27, 3],
            backgroundColor: "#EFBFD8",
            borderColor: "#EFBFD8",
            borderWidth: 1,
          },
        ],
      };
// data will be retrieved from https://www.americanpetproducts.org/press_industrytrends.asp

      // Define data for gender chart
      var chart3Data = {
        labels: ["Female", "Male"],
        datasets: [
          {
            label: "Pet Ownership by Gender",
            data: [60, 40,0],
            backgroundColor: "#b44981",
            borderColor: "#b44981",
            borderWidth: 1,
          },
        ],
      };

// data will be retrieved from https://www.statista.com/statistics/1320617/singapore-pet-ownership-rate-by-gender/
//^^ given that the data given also indicates the option "I used to but not anymore", I am considering changing the graph and its layout to incorporate that in


      // Create generation chart
      new Chart("generationChart",
        {
        type: "bar",
        data: chart2Data,
        options: {  responsive: true,
            maintainAspectRatio: false,
            width: 50,
            height: 50,},
      });

      // Create gender chart
      new Chart("genderChart", {
        type: "bar",
        data: chart3Data,
        options: {  responsive: true,
            maintainAspectRatio: false,
            width: 50,
            height: 50,},
      });

//Pet abandonment data
   // Define the data for reasons for pet abandonment
   var chart4Data = {
    labels: ["Finance", "Boredom", "Covid"],
    datasets: [
      {
        label: "Reasons for pet abandonment",
        data: [300, 50, 100],
        backgroundColor: ["#1F628E", "#0C6980", "#88A9C3"],
        borderWidth:0,
      },
    ],
  };
//more labels and data that would be added later on
//data retrieved from https://www.statista.com/statistics/964532/reasons-for-pet-abandonment-spain/?locale=en

  // Create the chart
  new Chart("reasonsChart", {
    type: "doughnut",
    data: chart4Data,
    options: {
      title: {
        display: true,
        text: 'Top Three Reasons for Pet Abandonment in 2020'
    }
    },
  });

  // Define the data for number of abandoned pets
  var chart5Data = {
    labels: ["2019", "2020", "2021", "2022"],
    datasets: [
      {
        label: "Number of Abandoned Pets",
        data: [225, 251, 230, 310],
        backgroundColor: "#0C6980",
        borderColor: "#0C6980",
        fill: false,
            borderColor: "#0C6980",
            tension: 0.1,
      },
    ],
  };
//data retrieved from https://www.channelnewsasia.com/singapore/pets-abandoned-dogs-cats-inflation-costs-vets-3251206

  // Create the line chart
 new Chart("numberChart", {
    type: "line",
    data: chart5Data,
    options: {
        responsive: true,
        scales: {
          yAxes: 
            {
              ticks: {
                beginAtZero: true,
              },
            },},
          title: {
            display: true,
            text: 'Number of Abandoned Pets from 2019-2022'
          }
          }
  });
  
  // Define the data for number of pets entering shelters
  var chart6Data = {
    labels: ["2015", "2016", "2017", "2018", "2019"],
    datasets: [
      {
        label: "Dogs",
        data: [12, 19, 3, 5, 2],
        backgroundColor: "#385B4F",
        borderColor: "#385B4F",
        fill: false,
            borderColor: "#385B4F",
            tension: 0.1,
      },
      {
        label: "Cats",
        data: [5, 7, 2, 10, 15],
        backgroundColor: "#C5DFC9",
        borderColor: "#C5DFC9",
        fill: false,
            borderColor: "#C5DFC9",
            tension: 0.1,

      }
    ],
  };
//data retrieved from https://www.statista.com/statistics/960221/spca-shelter-dog-count-singapore/?locale=en
//data retrieved from https://www.statista.com/statistics/960240/spca-shelter-cat-count-singapore/?locale=en

  // Create the line chart
 new Chart("shelterChart", {
    type: "line",
    data: chart6Data,
    options: {
        responsive: true,
        scales: {
          yAxes: 
            {
              ticks: {
                beginAtZero: true,
              },
            },},
          title: {
              display: true,
              text: 'Number of Pets Entering Shelters from 2015-2019'
          }
          }
  });


    // Define the data for rehomed pets
   var chart7Data = {
    labels: ["2021", "2022", "2023"],
    datasets: [
      {
        label: "Successfully Rehomed Pets (%)",
        data: [64, 66, 65],
        fill: false,
        backgroundColor: "#385B4F",
        borderColor: "#385B4F",
        tension: 0.1,
      },
    ],
  };
//data retrieved from https://www.shelteranimalscount.org/industry-trends-dashboard/

  // Create the chart
  var rehomeChart = new Chart("rehomeChart", {
    type: "bar",
    data: chart7Data,
    options: {
      title: {
        display: true,
        text: 'Number of Successfully Rehomed Pets from 2021-2023',
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true}}]
    }
    }}});

  var secondBarAdded = false;

  // Function to toggle the second line on the chart
  function toggleSecondBar() {
    // If second line has already been added, remove it using pop()
    if (secondBarAdded) {
      chart7Data.datasets.pop();
      secondBarAdded = false;
    }
    // If second line has not been added, add it using push()
    else {
      chart7Data.datasets.push({
        label: "Euthanized Abandoned Pets (%)",
        data: [6, 6, 8],
        fill: false,
        backgroundColor: "#C5DFC9",
        borderColor: "#C5DFC9",
        tension: 0.1,
      });
      secondBarAdded = true;
    }
// data retrieved from https://www.shelteranimalscount.org/industry-trends-dashboard/

    // Update the chart with the new data
    rehomeChart.update();

    // Toggle the button text
    var rehomeButton = document.getElementById("toggleBarButton");
    if (secondBarAdded) {
        rehomeButton.innerText = "Remove Second Bar";
      } else {
        rehomeButton.innerText = "Add Second Bar";
      }
  }


  