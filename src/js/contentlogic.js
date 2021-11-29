window.onload = function () {
  let src = sessionStorage.getItem("src"); // 세션 스토리지에서 클릭한 주소 가져옴
  document.querySelector("iframe").onload = function () {
    document.querySelector("#wait-over").remove(); // '불러오는 중' 메세지 제거
  };

  document.querySelector("iframe").src = src + "?popup"; // iframe 주소 설정
  document.querySelector("#back").addEventListener("click", () => {
    window.location.href = "popup.html"; // 뒤로가기 버튼
  });

  document.querySelector("#newtab").addEventListener("click", () => {
    chrome.tabs.create({ url: src }); // 새탭에서 열기 버튼
  });
};
