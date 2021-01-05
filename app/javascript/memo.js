function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    //リクエスト
    const formData = new FormData(document.getElementById("form")); //formに入力された内容を取得
    const XHR = new XMLHttpRequest(); //XMLHttpRequestオブジェクトを生成
    XHR.open("POST", "/posts", true); //非同期通信で、ルーティングのどこにリクエストを送るか定める エンドポイントの指定
    XHR.responseType = "json"; //コントローラからjson形式のデータをレスポンスとして受け取る
    XHR.send(formData); //formに入力された内容を乗せてルーティングにリクエスト
    //レスポンス
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post; //unkoをキーとして、post = Post.create(content: params[:content], checked: false)を受け取っている as json
      const list = document.getElementById("list"); //insertAdjacentHTMLでHTMLを挿入するための親要素のHTMLを取得
      const formText = document.getElementById("content"); //<%= form.text_field :content , id: "content" %>のvalueを空にするためにこのHTMLを取得
      //定数listに突っ込むHTMLを定義
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`; 
      list.insertAdjacentHTML("afterend", HTML); //定数listに定数HTMLを実際に挿入
      formText.value = ""; //<%= form.text_field :content , id: "content" %>のvalueを空にする。空にしないと、前回の投稿内容が含まれたまま。
    };
    e.preventDefault(); //イベントの中身は今までズラーっと書いたプログラム。でもclickイベントにはデフォルトで、指定先のURLへ画面遷移、データ送信が含まれる。なのでデフォルトのe(イベント)をpreventする。

  });
 }
 window.addEventListener("load", memo);