
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Toggle Loader
function toggleLoader() {
    quoteContainer.hidden = !quoteContainer.hidden;
    loader.hidden = !quoteContainer.hidden;
}

// Get Quotes from forismatic api
async function getQuote() {
    toggleLoader();
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyURL + apiUrl);
        const data = await response.json();
        
        // if author is empty set unknown
        if(data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }

        //  if Quote is longer then add custom style
        if(data.quoteText.length >= 30) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        toggleLoader();
    } catch(err) {
        quoteText.innerText = 'No Quote, please try again after sometime';
        authorText.innerText ='API Management';
        toggleLoader();
    }
}


// Tweet Quote function
async function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}


twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', getQuote);




// On Load
getQuote();