let all_a = document.querySelectorAll("a");
for (let i = 0; i < all_a.length - 2; ++i) {
  all_a[i].href =
    'javascript:window.open("' + all_a[i].href + '", "_blank").focus();';
}
for (let i = all_a.length - 2; i < all_a.length; ++i) {
  all_a[i].href =
    "https://www.inha.ac.kr/bbs/kr/8/" +
    all_a[i].href.split("'")[5] +
    "/artclView.do?popup";
}
document.querySelector("._areaButton").querySelector("._right").remove();
