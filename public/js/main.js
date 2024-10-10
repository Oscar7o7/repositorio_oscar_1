const userId = document.getElementById(`dataId`);
const ObjectName = document.getElementById(`ObjectName`);
const ObjectLabel = document.getElementById(`ObjectLabel`);
const labelsYear = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const labelsMonth = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];

const date = new Date();

const selectedMonth = document.getElementById(`selectMonth`);
const selectedYear = document.getElementById(`selectYear`);
const selectedYearForMonth = document.getElementById(`selectYearForMonth`);
const buttonMonth = document.getElementById(`executeFetchMonth`);

let chartMonth;
let chartYear;
let chartCategory;

const spacePieCategory = document.getElementById(`chatPieCategory`);
if (spacePieCategory) {
  const ctx = document.getElementById(`chatPieCategory`).getContext(`2d`);
  async function Execute () {
    const result = await ExecuteFetch(`/api/graphic/category`);
    if (!result) return;
    console.log(result);
    const response = PushBarGraphic({ border:1, backgroundColor:[`#FB2576`,`#C2FFD9`,`#A149FA`] ,type:`pie`,label: `Gráfico categorias`, labels:result.labels, data: result.values });
    if(chartCategory) {
      chartCategory.destroy();
    }
    chartCategory = new Chart(ctx, response);
  }
  Execute();
  selectedYear.addEventListener(`change`, (e) => Execute());
}

const spaceUserYear = document.getElementById(`chartLineUserYear`);
if (spaceUserYear) {
  async function Execute () {
    const ctx = document.getElementById(`chartLineUserYear`).getContext(`2d`);
    const result = await ExecuteFetch(`/api/graphic/year/?id=${userId ? userId.value : ""}&ObjectName=${ObjectName ? ObjectName.value : ``}&year=${selectedYear ? selectedYear.value : date.getFullYear()}`);
    if (!result) return;
    const response = PushBarGraphic({ label: ObjectLabel.value, labels: labelsYear, data: result });
    if(chartYear) {
      chartYear.destroy();
    }
    chartYear = new Chart(ctx, response);
  }
  Execute();
  selectedYear.addEventListener(`change`, (e) => Execute());
}

const spaceUserMonth = document.getElementById(`chartLineUserMonth`);
if (spaceUserMonth) {
  async function Execute (url) {
    const ctx = document.getElementById(`chartLineUserMonth`).getContext(`2d`);
    const result = await ExecuteFetch(url);
    if (!result) return;
    const response = PushBarGraphic({ label: ObjectLabel.value, labels: labelsMonth, data: result });
    if(chartMonth) {
      chartMonth.destroy();
    }
    chartMonth = new Chart(ctx, response);
  }
  
  Execute(`/api/graphic/month/?id=${userId ? userId.value : ""}&ObjectName=${ObjectName ? ObjectName.value : ``}`);
  buttonMonth.addEventListener(`click`, (e) => Execute(`/api/graphic/month/?id=${userId ? userId.value : ""}&ObjectName=${ObjectName ? ObjectName.value : ``}&month=${selectedMonth.value ? selectedMonth.value : date.getMonth()+1}&year=${selectedYearForMonth ? selectedYearForMonth.value : date.getFullYear()}`));
  // selectedMonth.addEventListener(`change`, (e) => Execute());
  // selectedYearForMonth.addEventListener(`change`, (e) => Execute());
}

async function ExecuteFetch(url) {
  const result = await fetch(url);
  const json = await result.json();
  return json;
}

function PushBarGraphic({ border, type = "line", label, labels, data,backgroundColor }) {
  const currentData = {
    labels,
    datasets: [
      {
        label,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 2,
        borderColor: "#cb0c9f",
        borderWidth: border ? border : 3,
        backgroundColor: backgroundColor ? backgroundColor :`#470337`,
        fill: true,
        data,
        maxBarThickness: 6

      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      y: {
        grid: {
          drawBorder: false,
          display: true,
          drawOnChartArea: true,
          drawTicks: false,
          borderDash: [5, 5]
        },
        ticks: {
          display: true,
          padding: 10,
          color: '#b2b9bf',
          font: {
            size: 11,
            family: "Open Sans",
            style: 'normal',
            lineHeight: 2
          },
        }
      },
      x: {
        grid: {
          drawBorder: false,
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
          borderDash: [5, 5]
        },
        ticks: {
          display: true,
          color: '#b2b9bf',
          padding: 20,
          font: {
            size: 11,
            family: "Open Sans",
            style: 'normal',
            lineHeight: 2
          },
        }
      },
    }
  }

  return {
    type,
    data: currentData,
    options
  }
}

