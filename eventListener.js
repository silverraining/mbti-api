
import { getColorSurveys, postColorSurveys } from "./apis.js";

const inputMbti = document.querySelector("#mbti");
const inputColor = document.querySelector("#colorCode");
const sendButton = document.querySelector("#send-button");
const loadButton = document.querySelector("#load-button");
const status = document.querySelector(".status");
const data = document.querySelector(".data");

const validateInput = () => {
  const mbti = inputMbti.value.trim().toUpperCase();
  const colorCode = inputColor.value.trim();

  if (!mbti) {
    alert("MBTI를 입력하세요.");
    return false;
  }

  if (!colorCode) {
    alert("색상 코드를 입력하세요.");
    return false;
  }

  return true; // 유효성 검사를 통과하면 true 반환
};



// 데이터 전송 이벤트
sendButton.addEventListener("click", async () => {
  const isValid = validateInput(); // 클릭 시 유효성 검사
  if (!isValid) return; 
  const mbti = inputMbti.value.trim().toUpperCase();
  const colorCode = inputColor.value.trim();
  if (!validateInput()) {
    alert("MBTI와 색상 코드를 입력해주세요.");
    return; 
  }
  const container = {
    mbti: inputMbti.value.toUpperCase(),
    colorCode: inputColor.value,
  };
    const response = await postColorSurveys(container);
    console.log(response);
    status.textContent = "";
    // window.location.reload();

     // 전송한 데이터 바로 화면에 반영하기 위해 getColorSurveys 호출
    const surveyData = await getColorSurveys(); // 모든 데이터를 가져옴
    updateSurveyData(surveyData.results); // 화면을 갱신하는 함수 호출
});


// 화면을 갱신하는 함수
const updateSurveyData = (surveyData) => {
  data.innerHTML = ""; // 기존 데이터 비우기
  surveyData.forEach((item) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("newData");
    newDiv.style.backgroundColor = item.colorCode;
    newDiv.style.textAlign = "center";
    newDiv.style.whiteSpace = "pre-line"; 
    newDiv.style.padding = "10px"; 
    newDiv.style.borderRadius = "10px"; 
    newDiv.style.fontWeight = "bold"; 
    newDiv.style.fontSize = "12px"
    newDiv.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)";
    
    // 색상 코드가 #FFFFFF일 경우 색상 변경
    if (item.colorCode === "#FFFFFF") {
      newDiv.style.color = "black";
    }
    
    newDiv.textContent = `ID: ${item.id}\nMBTI : ${item.mbti}\nCOLOR : ${item.colorCode}`;
    data.appendChild(newDiv);
  });
};


// 데이터 로드 이벤트 (초기 로드 시 데이터 가져오기)
loadButton.addEventListener("click", async () => {
  const surveyData = await getColorSurveys(); // 모든 데이터를 가져옴
  updateSurveyData(surveyData.results); // 화면을 갱신하는 함수 호출
  
}); 
