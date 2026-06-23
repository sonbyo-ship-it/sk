const API_KEY = "F63D7LA66HK0709S";

async function analyze() {

const symbol =
document
.getElementById("ticker")
.value
.toUpperCase()
.trim();

const result =
document.getElementById("result");

if(!symbol){
result.innerHTML =
"<p>종목코드를 입력하세요.</p>";
return;
}

result.innerHTML =
'<p class="loading">데이터 조회중...</p>';

try{

const response =
await fetch(
`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`
);

const data =
await response.json();

if(!data.Symbol){

result.innerHTML =
"<p>종목을 찾을 수 없습니다.</p>";

return;
}

result.innerHTML = `
<div class="card">

<h2>${data.Name}</h2>

<p><strong>종목코드</strong> :
${data.Symbol}</p>

<p><strong>업종</strong> :
${data.Industry}</p>

<p><strong>PER</strong> :
${data.PERatio}</p>

<p><strong>PBR</strong> :
${data.PriceToBookRatio}</p>

<p><strong>시가총액</strong> :
${Number(
data.MarketCapitalization
).toLocaleString()}</p>

<p><strong>52주 최고가</strong> :
${data["52WeekHigh"]}</p>

<p><strong>52주 최저가</strong> :
${data["52WeekLow"]}</p>

</div>
`;

}
catch(error){

result.innerHTML =
"<p>데이터 조회 실패</p>";

console.error(error);

}

}
