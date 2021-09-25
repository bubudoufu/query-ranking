// 検索キーワードランキングをhtmlにレンダリングする
function showKeywordRanking() {
  const keywordRanking = JSON.parse(keywordJson).keyword_ranking.ranking_data; // PHPで取得したjsonをパースして変数に格納する
  const data = JSON.parse(keywordJson).keyword_ranking.meta.end_date; // 集計日を取得
  document.querySelector(".data").textContent = `集計日：${data}`;
  const fragment = document.createDocumentFragment(); // 空のDocumentFragmentを作成する
  const template = document.getElementById("keywordTemplate"); // template要素を取得
  // jsonファイルをfor文で回して必要な項目を取得する
  for (let i = 0; i < keywordRanking.length; i++) {
    const clone = template.content.cloneNode(true); // templateタグのコンテンツを取得し複製する
    let png;
    // 順位横の矢印の選択
    switch (keywordRanking[i].vector) {
      case "up":
        png = "./img/up.png";
        break;
      case "down":
        png = "./img/down.png";
        break;
      case "stay":
        png = "./img/stay.png";
        break;
    }
    // DOM操作でhtmlに反映させる
    clone.querySelector(".rank span").textContent = keywordRanking[i].rank; // 順位
    clone.querySelector(".rank img").src = png; // 矢印
    clone.querySelector(".keyword > a > p").textContent = // 検索キーワード
      keywordRanking[i].query;
    clone.querySelector(".keyword a").href = keywordRanking[i].url; // URL
    clone.querySelector(".pre_rank p").textContent = keywordRanking[i].pre_rank; // 前回順位
    clone.querySelector(".score p").textContent = keywordRanking[i].score; // スコア

    fragment.appendChild(clone); // DocumentFragmentへ一時保管
  }
  document.querySelector(".keywordTable").appendChild(fragment); // ループを抜けたらまとめてappendChildする
}

//総合売上ランキングをhtmlにレンダリングする
function showcategorRanking() {
  const categorRanking = JSON.parse(categorJson).category_ranking.ranking_data;
  const fragment = document.createDocumentFragment();
  const template = document.getElementById("categorTemplate");
  for (let i = 0; i < categorRanking.length; i++) {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".rank p").textContent = categorRanking[i].rank;
    clone.querySelector("a").href = categorRanking[i].store.url;
    clone.querySelector(".name p").textContent = categorRanking[i].name;
    clone.querySelector("img").src = categorRanking[i].image.medium;

    fragment.appendChild(clone);
  }
  document.querySelector(".categorytable").appendChild(fragment);
}

showKeywordRanking();
showcategorRanking();
