const prizes = [
  { name: "高效办公套装", detail: "拓展坞+电动搅拌杯" },
  { name: "好好午休套装", detail: "深睡眼罩2.0+午休枕" },
  { name: "保护颈椎套装", detail: "笔记本电脑支架" },
  { name: "保持内裤干燥套装", detail: "加湿器" }
];

const wheel = document.getElementById("wheel");
const spinButton = document.getElementById("spinButton");
const resultText = document.getElementById("resultText");
const prizeList = document.getElementById("prizeList");

const segmentColors = [
  "#f5c36a",
  "#fbe2a0",
  "#f59b52",
  "#fbe2a0"
];

let currentRotation = 0;
let isSpinning = false;

const renderPrizeList = () => {
  prizeList.innerHTML = "";
  prizes.forEach((prize, index) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <strong>${index + 1}. ${prize.name}</strong>
      <span>${prize.detail}</span>
    `;
    prizeList.appendChild(item);
  });
};

const renderWheelLabels = () => {
  wheel.querySelectorAll(".wheel-label").forEach((label) => label.remove());
  const segmentAngle = 360 / prizes.length;
  const gradientStops = prizes
    .map((_, index) => {
      const color = segmentColors[index % segmentColors.length];
      const start = segmentAngle * index;
      const end = start + segmentAngle;
      return `${color} ${start}deg ${end}deg`;
    })
    .join(", ");
  wheel.style.background = `conic-gradient(${gradientStops})`;
  prizes.forEach((prize, index) => {
    const label = document.createElement("div");
    label.className = "wheel-label";
    const angle = segmentAngle * index + segmentAngle / 2;
    label.style.setProperty("--angle", `${angle}deg`);
    label.textContent = prize.name;
    wheel.appendChild(label);
  });
};

const spinWheel = () => {
  if (isSpinning) {
    return;
  }
  isSpinning = true;
  spinButton.disabled = true;
  resultText.textContent = "抽奖中...";

  const segmentAngle = 360 / prizes.length;
  const prizeIndex = Math.floor(Math.random() * prizes.length);
  const offset = Math.random() * (segmentAngle * 0.6);
  const targetRotation = 360 * 5 + (360 - prizeIndex * segmentAngle - offset);

  currentRotation += targetRotation;
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    const prize = prizes[prizeIndex];
    resultText.textContent = `${prize.name} · ${prize.detail}`;
    spinButton.disabled = false;
    isSpinning = false;
  }, 4900);
};

spinButton.addEventListener("click", spinWheel);
renderPrizeList();
renderWheelLabels();
