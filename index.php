<?php
  ini_set('display_errors', 0);
  include("main.html");

function h($str)
{
    return htmlspecialchars($str, ENT_NOQUOTES, 'UTF-8');
}
// APIからJSONを取得するクラス
// $urlプロパティはAPIのエンドポイントurl
// queryプロパティはリクエストパラメータを'パラメータ' => '値'の連想配列で渡す
class GetJson{
    public string $url;
    public array $query;

    public function __construct(string $url, array $query)
    {
        $this->url = $url;
        $this->query = $query;
    }
    // APIからjsonを取得するメソッド
    public function getJson(){
        $query = $this->query;
        $url = $this->url;
        $url .= http_build_query($query);
        try {
            $response = file_get_contents($url);
            $json = json_encode($response, true);
    
            return $json;
        } catch (Exception $e) {

        }
        
    }
}
// APIエンドポイント
$keywordUrl = 'https://shopping.yahooapis.jp/ShoppingWebService/V2/queryRanking?'; 
// リクエストパラメータ
$keywordQuery = [
    'appid' => '', // <-- ここにあなたのアプリケーションIDを設定してください。
];

$keyword = new GetJson($keywordUrl, $keywordQuery); // クラスGetJsonのインスタンスを作成
$keywordJson = $keyword->getJson(); // getJsonメソッドを実行してAPIからjsonを取得する

$categoryUrl = 'https://shopping.yahooapis.jp/ShoppingWebService/V2/categoryRanking?';
$categorQuery = [
    'appid' => '', // <-- ここにあなたのアプリケーションIDを設定してください。
];
$categor = new GetJson($categoryUrl, $categorQuery);
$categorJson = $categor->getJson();

?>

<!-- 取得したjsonをjavascriptへ渡す -->
<script type="text/javascript">
    const keywordJson = <?= h($keywordJson) ; ?>;
    const categorJson = <?= h($categorJson) ; ?>;
</script>

<script type="text/javascript" src="main.js"></script>
