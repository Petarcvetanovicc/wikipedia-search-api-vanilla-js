const url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';
const page_url = 'http://en.wikipedia.org/?curid=';

const form = document.querySelector('.form')
const input = document.querySelector('.input-text')
const btn = document.querySelector('button')
const results = document.querySelector('.links-container')

const fetchWikis = async(searchValue) => {
    const resp = await fetch(searchValue)
    const data = await resp.json()
    const wikis = data.query.search
    return wikis
}

const displayWikis = (articles) => {
    results.innerHTML = articles.map(function(article){
        const {pageid, title, snippet} = article
        return `<a href="${page_url}${pageid}" target="_blank">
        <h2>${title}</h2>
        <p>${snippet}</p>
    </a>`
    }).join('')
}

form.addEventListener('submit', async function(e){
    e.preventDefault()
    value = input.value
    if(value === ''){
        results.innerHTML = '<p class="col-1">Please type something</p>'
        return
    }
    const pages = await fetchWikis(`${url}${value}`)
    if(pages.length < 1){
        results.innerHTML = '<p class="col-1">No articles</p>'
        return
    }
    
    displayWikis(pages)
    
})