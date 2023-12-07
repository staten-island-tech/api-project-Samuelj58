import './style.css'
const Url = 'https://api.waifu.im/search'

async function getData(Url) {
    try{const response = await fetch(url)
    const data = await response.json()
console.log(data)
}catch(error) {console.log(error);}
}