const user = localStorage.getItem("loggedInUser");
if (!user) window.location.href = "index.html";

const ctx = document.getElementById("moodChart").getContext("2d");
let moodData = JSON.parse(localStorage.getItem(`${user}_moods`) || "[]");

const moodChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: moodData.map(e => e.date),
    datasets: [{
      label: "Mood over time",
      data: moodData.map(e => e.value),
      borderColor: "#0077b6",
      backgroundColor: "rgba(72,202,228,0.3)",
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1,
          callback: val => ["😫","😴","😌","😊","💪"][val - 1]
        }
      }
    }
  }
});

const moodScale = {
  "Stressed": 1,
  "Tired": 2,
  "Calm": 3,
  "Happy": 4,
  "Motivated": 5
};

document.querySelectorAll(".mood-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const mood = btn.dataset.mood;
    const date = new Date().toLocaleDateString();

    moodData.push({ mood, value: moodScale[mood], date });
    localStorage.setItem(`${user}_moods`, JSON.stringify(moodData));
    updateChart();
  });
});

function updateChart() {
  moodChart.data.labels = moodData.map(e => e.date);
  moodChart.data.datasets[0].data = moodData.map(e => e.value);
  moodChart.update();
}

function updateChartRange() {
  const range = parseInt(document.getElementById("timeRange").value);
  const filtered = moodData.slice(-range);
  moodChart.data.labels = filtered.map(e => e.date);
  moodChart.data.datasets[0].data = filtered.map(e => e.value);
  moodChart.update();
}

function goBack() {
  window.location.href = "dashboard.html";
}
