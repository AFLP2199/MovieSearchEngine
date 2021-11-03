$(document).ready(() => {
    $("#searchForm").on("submit", (event) => {
        $(".container-movies").css({
            display: "block",
            opacity: "1",
        });
        $(window).scrollTop($(".container-movies").offset().top);
        $("#results").css("opacity", "1");
        let searchText = $("#searchText").val();
        getMovies(searchText);
        event.preventDefault();
    });
});

function getMovies(searchText) {
    axios
        .get("http://www.omdbapi.com/?&s=" + searchText + "&apikey=618626ba")
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output = "";
            $.each(movies, (index, movie) => {
                output += `
                        <div class="movie-block">
                            <h4>${movie.Title}</h4>
                            <img src="${movie.Poster}">
                            <a class="btn-style" onclick="selectMovie('${movie.imdbID}')">More details</a>
                        </div>
                        `;
            });
            $("#movies").html(output);
        })
        .catch((err) => console.log(err));
}

function selectMovie(id) {
    sessionStorage.setItem("movieId", id);
    window.location = "movie.html";
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem("movieId");
    axios
        .get("http://www.omdbapi.com/?&i=" + movieId + "&apikey=618626ba")
        .then((response) => {
            console.log(response);
            let movie = response.data;
            document.title = response.data.Title;
            let output = `
                    <div class="movie-full">
                        <img src="${movie.Poster}">
                        <div class="movie-info">
                            <h4>${movie.Title}</h4>
                            <ul>
                                <li><b>Plot:</b> ${movie.Plot}</li>
                                <li><b>Released:</b> ${movie.Released}</li>
                                <li><b>Genre:</b> ${movie.Genre}</li>
                                <li><b>Runtime:</b> ${movie.Runtime}</li>
                                <li><b>Actors:</b> ${movie.Actors}</li>
                                <li><b>Director:</b> ${movie.Director}</li>
                                <li><b>Writer:</b> ${movie.Writer}</li>
                                <li><b>Language:</b> ${movie.Language}</li>
                            </ul>
                            <div class="data-buttons">
                                <a class="btn-style" href="https://www.imdb.com/title/${movie.imdbID}/" target="_blank">Go to IMDb website</a>
                                <a class="btn-style" href="index.html">Go back</a>
                            </div>
                        </div>
                    </div>
                    `;
            $("#movie").html(output);
        })
        .catch((err) => console.log(err));
}
