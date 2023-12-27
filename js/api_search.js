const api_key = '6e36703446ea3c1720819090111442d9';
const access_token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTM2NzAzNDQ2ZWEzYzE3MjA4MTkwOTAxMTE0NDJkOSIsInN1YiI6IjY1OGJmMmY2MjcxNjcxNzJhZWE0ZTI1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rxCHTVEW7dRyjJQmyxdk9u5gr6Gst2cnQcYzqLbmV5I';

const api_search = 'https://api.themoviedb.org/3/search/movie';
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${access_token}`,
    }
};
const base_img = 'https://image.tmdb.org/t/p/w500/';

const searchForm = document.getElementById('search_form')
const resultsArea = document.getElementById('search-results-section')
const titleSearch = document.getElementById('title-search')
const searchMovies = ()=>{
    searchForm.addEventListener('submit', async(e)=>{
        e.preventDefault();
        
        await fetch(`${api_search}?api_key=${api_key}&query=${this.search.value}`)
        .then((res)=> res.json())
        .then((data)=> {
            titleSearch.innerHTML = 'No Results';
            titleSearch.innerHTML = `Search Results(${data.results.length})`;
            resultsArea.innerHTML = '';
            data.results.forEach(item => {
                resultsArea.innerHTML += 
                `<div class="col-lg-4 col-12 mb-4">
                    <div class="custom-block custom-block-full">
                        <div class="custom-block-image-wrap">
                            <a href="detail-page.html">
                                <img src="${base_img}/${item.poster_path}" class="custom-block-image img-fluid" alt="">
                            </a>
                        </div>

                        <div class="custom-block-info">
                            <h5 class="mb-2">
                                <a href="detail-page.html">
                                    ${item.title}
                                </a>
                            </h5>

                            <div class="profile-block d-flex">
                                <p>Original Language : ${item.original_language }</p>
                                <p>Release Date: ${item.release_date}</p>
                            </div>

                            <p class="mb-0">Lorem Ipsum dolor sit amet consectetur</p>

                        </div>

                        <div class="social-share d-flex flex-column ms-auto">
                            <a href="#" class="badge ms-auto">
                                <i class="bi-heart"></i>
                            </a>

                            <a href="#" class="badge ms-auto">
                                <i class="bi-bookmark"></i>
                            </a>
                        </div>
                    </div>
                </div>`;
                
            });
            data = []
        })
        .catch((err)=> console.error('Error: ', err));
    })
}
searchMovies();