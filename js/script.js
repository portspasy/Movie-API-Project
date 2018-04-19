

$(document).ready(() => {
    $("#searchForm").on("submit", (e) => {
        let searchText = $("#searchText").val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText) {
    // axios.get("http://www.omdbapi.com?s=" + searchText)
    // axios.get('https://api.themoviedb.org/3/search/movie?api_key=fa155f635119344d33fcb84fb807649b&query=' + searchText)
    //     .then((response) => {
    //         console.log(response);
    //         let movies = response.data.Search;
    //         let movies = response.data.results;
    //         let output = "";
    //         $.each(movies, (index, movie) => {
    //             output += `
    //                 <div class="col-md-3">
    //                     <div class="well text-center">
    //                         <img src="${movie.Poster}">
    //                         <h5>${movie.Title}</h5>
    //                         <a onclick="movieSelected("${movie.imdbID}")" class="btn btn-primary" href="#">Movie Details</a>
    //                     </div>
    //                 </div>
    //             `;
    //         });

    //         $("#movies").html(output);
    //     })

    //     .catch((err) => {
    //         console.log(err);
    //         console.log('something is going wrong');
    //     });

    // Make a request to the URL 
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=fa155f635119344d33fcb84fb807649b&query=' + searchText)
        .then(function (response) {
            var movies = response.data.results;
            console.log(movies);
            var output = '';
            $.each(movies, function (index, movie) {
                output += '<div class="col-md-3">';
                output += '<div class="well text-center">';
                output += '<img src="http://image.tmdb.org/t/p/w185/' + movie.poster_path + '">';
                output += '<h5>' + movie.title + '</h5>';
                output += '<a onclick=movieSelected("' + movie.id + ' class="btn btn-primary" href="#")>Movie Details</a>';
                output += '</div>';
                output += '</div>';
            });

            $('#movies').html(output);

        })
        .catch(function (error) {
            console.log(error);
            // console.log('something is going wrong');
        });
}

function movieSelected(id) {
    sessionStorage.setItem("movieId", id);
    window.location = "movie.html";
    return false;
}

function getMovie() {
    let movieId = sessionStorage.setItem("movieId");

    // axios.get("http://www.omdbapi.com?i=" + movieId)
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=fa155f635119344d33fcb84fb807649b&query=' + movieId)
        .then((response) => {
            console.log(response);
            let movies = response.data;
            let output = `
                <div class="row">
                    <div class="col-md-4">
                        <img src="${movie.Poster}" class="thumbnail">
                    </div>
                    <div class="col-md-6">
                        <div class="well text-center">
                            <h2>${movie.Title}</h2>
                            <ul class="list-group">
                                <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                                <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                                <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                                <li class="list-group-item"><strong>Imdb Rating:</strong> ${movie.imdbRating}</li>
                                <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                                <li class="list-group-item"><strong>Writter:</strong> ${movie.Writter}</li>
                                <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="well">
                        <h3>plot</h3>
                        ${movie.Plot}
                        <hr>
                        <a href="http"//imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                        <a href="index.html" class="btn btn-default">Go Back To Search</a>
                    </div>
                </div>
            `;
        })

        .catch((err) => {
            console.log(err);
        });
}