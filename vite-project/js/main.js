import "./style.css";

const URL = "https://api.waifu.im/search";

async function getData(URL) {
  try {
    const response = await fetch(URL);
    const data = await response.json(); //makes data into json
    document.getElementById("api-response").textContent = data.content;
    console.log(data.content);
  } catch (error) {
    console.log(error);
  }
}
getData(URL);

/* async function getData(Url) {
    try{const response = await fetch(url)
    const data = await response.json()
console.log(data)
}catch(error) {console.log(error);}
} */
