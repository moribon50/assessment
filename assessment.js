'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した子要素を全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) { //子要素があるかぎり削除
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

assessmentButton.onclick = ()  => { //アロー関数
    const userName = userNameInput.value; //userNameInputオブジェクトの.valueプロパティで入力された文字列を取得
    if (userName.length === 0) { //名前が空の時は処理を終了する
        return;
    }

    //診断結果表示エリア
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果'; //innerTextプロパティでタグの中身を設定
    resultDivided.appendChild(header); //.appendChildメソッドでh3タグを子要素として追加

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    //TODO ツイートエリア
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = "https://twitter.com/intent/tweet?button_hashtag=" + encodeURIComponent('あなたのいいところ診断') + "&ref_src=twsrc%5Etfw";

    anchor.setAttribute('href', hrefValue);
    anchor.className = "twitter-hashtag-button";
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ診断';
    tweetDivided.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', "https://platform.twitter.com/widgets.js");
    tweetDivided.appendChild(script);
};

userNameInput.onkeydown = (event) => { //アロー関数
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
};

const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。'
    '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
 function assessment(userName) {
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i); //.charCodeAtメソッドで文字コードを取得する
    }

    //文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replace(/\{userName\}/g, userName); //正規表現で{userName}を名前に置き換える
    return result;
 }

