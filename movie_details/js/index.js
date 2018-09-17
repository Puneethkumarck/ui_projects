$(document).ready(function () {
    $('#searchForm').on('submit', function (e) {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});


function getMovies(searchText) {
    axios.get('http://www.omdbapi.com?s=' + searchText + '&apikey=672410b3&i=tt3896198')
        .then((response) => {
            console.log(response)
            let movies = response.data.Search;
            console.log('movies output is' + movies)
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
            <div class="col-md-3">
            <div class="well text-center">
             <img src="${movie.Poster}">
             <h5>${movie.Title}</h5>
             <a onclick="movieSelected('${movie.imdID}')" class="btn btn-primary" href="#">Movie Details</a>
             </div>
             </div>
            `;
            });

            $('#movies').html(output)
        })
        .catch((err) => {
            console.log(err)
        });


    function movieSelected(id) {
        sessionStorage.setItem('movieId', id);
        window.location = 'movie.html';
        return false;

    }

    function getMovie() {
        let movieId = sessionStorage.getItem('movieId')
        axios.get('http://www.omdbapi.com?i=' + movieId + '&apikey=672410b3')
            .then((response) => {
                console.log(response)
                })
            .catch((err) => {
                console.log(err)
            });
    }
}