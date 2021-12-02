// 공지시항 누르면 공지사항으로 이동
window.onload = function () {
  document.querySelector("#title").addEventListener("click", () => {
    chrome.tabs.create({ url: "https://www.inha.ac.kr/kr/950/subview.do" });
  });
};
// 공지사항 테이블 주소
const att_url = new URL("https://www.inha.ac.kr/bbs/kr/8/artclList.do");
fetch(att_url)
  .then(function (response) {
    return response.text();
  })
  .then(function (html) {
    // Initialize the DOM parser
    var parser = new DOMParser();

    // Parse the text
    var doc = parser.parseFromString(html, "text/html");

    // You can now even select part of that html as you would in the regular DOM
    // Example:
    // var docArticle = doc.querySelector('article').innerHTML;

    let table = doc.querySelector("table"); // 공지사항 테이블
    let body = table.querySelector("tbody");
    let all = body.querySelectorAll("tr"); // 공지사항 row

    let createNode = document.createElement("ul"); // popup.html에 보여질 ul

    let hr = document.createElement("hr"); // 맨 윗줄 생성
    createNode.appendChild(hr);

    // 모든 row에 대한 for문
    for (let el of all) {
      // 헤드라인 안붙은 것만 뽑아냄
      if (!el.classList.length) {
        let main_el = el.querySelector("a"); // 하나의 row
        let link = new URL(main_el.href);
        link = att_url.origin + link.pathname; // 링크

        let node = document.createElement("li"); // popup.html의 ul에 들어갈 li
        node.classList.add("one_tr"); // css
        if (main_el.childElementCount > 0) {
          main_el.removeChild(main_el.childNodes[1]);
          node.classList.add("new");
        }
        let title = main_el.innerText; // 제목
        node.innerText = title.replace(/\n/g, ""); // 제목 공백 모두 제거
        // 클릭시 새탭으로 이동
        node.onclick = function () {
          sessionStorage.setItem("src", link);
          window.location.href = "content.html";
          // chrome.tabs.create({ url: link });
        };
        let hr = document.createElement("hr"); // 구분선 표시

        createNode.appendChild(node); // li 추가
        createNode.appendChild(hr); // 구분선 추가
      }
    }

    document.querySelector("#waiting").remove(); // '불러오는 중' 메세지 제거
    document.querySelector("#app").appendChild(createNode); // 최종적으로 #app에 붙임
  });
