import reddit from './redditapi';

const searchform = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchform.addEventListener('submit', e => {
    //Get searchTerm 
    const searchTerm = searchInput.value;

    //Get sort by selection
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;

    //Get limit
    const limit = document.getElementById('limit').value;

    //check input
    if (searchTerm === '') {
        //show Message
        showMessage('Please add a Search Term ', 'alert-danger');
    }

    //clear input
    searchInput.value = '';

    //search reddit
    reddit.search(searchTerm, limit, sortBy).then(results => {
        let output = '<div class="card-columns">';
        //loop through  posts
        results.forEach(post => {

            // check for image
            const image = post.preview ? post.preview.images[0].source.url:'https://upload.wikimedia.org/wikipedia/commons/4/43/Reddit.svg'

            output += `
            <div class="card" >
            <img class="card-img-top" src="${image}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${truncateText(post.selftext,100)}</p>
                <a href="${post.url}" target="_blank" class="btn btn-primary">Read More...</a>
                <hr>
                <span class="badge badge-secondary"> Subreddit : ${post.subreddit} </span>
                <span class="badge badge-secondary"> Subreddit : ${post.score} </span>
            </div>
            </div>  `
        });
        output += `</div>`;
        document.getElementById('results').innerHTML=output;
    });

    console.log(limit);
    console.log(sortBy);
    console.log(searchTerm);
    e.preventDefault(); // if this method is called, the default action of the event will not be triggered
});


//show message
function showMessage(message, className) {
    //create div
    const div = document.createElement('div');
    // Add CSS Class
    div.className = `alert ${className}`;
    //Add Text
    div.appendChild(document.createTextNode(message));

    //Get Parent
    const searchContainer = document.getElementById('search-container');

    //Get Search
    const search = document.getElementById('search');

    //Insert Message
    searchContainer.insertBefore(div, search);

    //Timeout alert
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}


function truncateText(text,limit){
 const shortened = text.indexOf(' ',limit);
 if(shortened == -1) return text;
 return text.substring(0,shortened);

}