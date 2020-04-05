// NOTE: wordSmith functions from lines 4 - 39
// NOTE: byteSize functions from lines 41 - 76 (remember to add your API key!)*

// information to reach API
const dataMuseUrl = 'https://api.datamuse.com/words?';
const queryParams = 'rel_jjb=';

// selecting page elements
const inputField = document.querySelector('#input');
const submit = document.querySelector('#submit');
const responseField = document.querySelector('#responseField');

// AJAX function
const getSuggestions = () => {
  const wordQuery = inputField.value;
  const endPoint = dataMuseUrl + queryParams + wordQuery;

  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      //renderRawWordResponse(xhr.response); //Muestra todo el JSON
      renderWordResponse(xhr.response);
    }
  };
  xhr.open('GET', endPoint);
  xhr.send();
}

// clear previous results and display results to webpage
const displaySuggestions = (event) => {
  event.preventDefault();
  while(responseField.firstChild){
    responseField.removeChild(responseField.firstChild);
  };
  getSuggestions();
};

submit.addEventListener('click', displaySuggestions);

// information to reach Rebrandly API
const apiKey = '068865425a994d5380aa1*baf9ba83*c';//NOTA: Cambiar * o seguir los siguientes paso: https://www.codecademy.com/articles/rebrandly-signup
const rebrandlyUrl = 'https://api.rebrandly.com/v1/links';

// element selector
const shortenButton = document.querySelector('#shorten');

// AJAX functions
const shortenUrl = () => {
  const urlToShorten = inputField.value;
  const data = JSON.stringify({destination: urlToShorten});

  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      //renderRawByteResponse(xhr.response);//Muestra todo el JSON
      renderByteResponse(xhr.response);
    }
  };
  xhr.open('POST', rebrandlyUrl);
  xhr.setRequestHeader('Content-type', 'application/json');
	xhr.setRequestHeader('apikey', apiKey);
  xhr.send(data);
}

// Clear page and call AJAX functions
const displayShortUrl = (event) => {
  event.preventDefault();
  while(responseField.firstChild){
    responseField.removeChild(responseField.firstChild);
  };
  shortenUrl();
};

shortenButton.addEventListener('click', displayShortUrl);
