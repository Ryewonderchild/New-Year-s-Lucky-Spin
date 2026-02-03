const prizes = [
  { name: "马到成功一等奖", detail: "金马摆件 + 新年福袋" },
  { name: "鸿运当头二等奖", detail: "红火年礼盒" },
  { name: "腾跃三等奖", detail: "马年纪念帆布包" },
  { name: "福气四等奖", detail: "好运红包 88 元" },
  { name: "好运连连", detail: "新年上上签" },
  { name: "招财进宝", detail: "金色主题保温杯" },
  { name: "瑞气盈门", detail: "马年主题贴纸" },
  { name: "惊喜奖", detail: "随机小礼" }
];

const wheel = document.getElementById("wheel");
const spinButton = document.getElementById("spinButton");
const resultText = document.getElementById("resultText");
const prizeList = document.getElementById("prizeList");

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
