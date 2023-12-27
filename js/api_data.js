    const api_key = '6e36703446ea3c1720819090111442d9';
    const access_token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTM2NzAzNDQ2ZWEzYzE3MjA4MTkwOTAxMTE0NDJkOSIsInN1YiI6IjY1OGJmMmY2MjcxNjcxNzJhZWE0ZTI1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rxCHTVEW7dRyjJQmyxdk9u5gr6Gst2cnQcYzqLbmV5I';

    const base_url = 'https://api.themoviedb.org/3';
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: `Bearer ${access_token}`,
        }
    };
    const base_img = 'https://image.tmdb.org/t/p/w500/';
    const get_movies = '/discover/movie';
    const get_topRated = '/movie/top_rated';
    const get_upcoming = '/movie/upcoming';
    

    const carousel = document.querySelector('.owl-carousel')
    
    const fetchMovies = async(api) => {
        const res = await fetch(api);
        const data = await res.json();
        getCarousel(data.results);
        fetchLatest(data.results);
        fetchTopRated();
        fetchUpcoming();
    }
    const fetchUpcoming = async()=>{
        const res = await fetch(`${base_url}/${get_upcoming}?api_key=${api_key}`);
        const data = await res.json();
        const upcoming = data.results.slice(5,8);
        const upcomingSection = document.getElementById('upcoming-section');
        upcoming.forEach((upcomingItem)=>{
            upcomingSection.innerHTML += `
                <div class="col-lg-4 col-12 mb-4 mb-lg-0">
                    <div class="custom-block custom-block-full">
                        <div class="custom-block-image-wrap">
                            <a href="detail-page.html">
                                <img src="${base_img}/${upcomingItem.poster_path}" class="custom-block-image img-fluid" alt="">
                            </a>
                        </div>

                        <div class="custom-block-info">
                            <h5 class="mb-2">
                                <a href="detail-page.html">
                                    ${upcomingItem.title}
                                </a>
                            </h5>

                            <div class="profile-block d-flex">
                                <p>Original Language : ${upcomingItem.original_language }</p>
                                <p>Release Date: ${upcomingItem.release_date}</p>
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

        })
    }
    const fetchTopRated = async()=> {
        const res = await fetch(`${base_url}/${get_topRated}?api_key=${api_key}`);
        const data = await res.json();
        const topRated = data.results.slice(5,9);
        const topRatedSection = document.getElementById('top-rated-section')
        topRated.forEach((topRatedItem)=>{
            topRatedSection.innerHTML += `
            <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                <div class="custom-block custom-block-overlay">
                    <a href="detail-page.html" class="custom-block-image-wrap">
                        <img src="${base_img}/${topRatedItem.poster_path}" class="custom-block-image img-fluid" alt="">
                    </a>
    
                    <div class="custom-block-info custom-block-overlay-info">
                        <h5 class="mb-1">
                            <a href="listing-page.html">
                                ${topRatedItem.title}
                            </a>
                        </h5>
    
                        <p class="badge mb-0">${topRatedItem.vote_count} Views</p>
                    </div>
                </div>
            </div>`;

        })

    }
    const fetchLatest = async(movies)=>{
        let movies_urls = [];
        const lastestEpisodes = document.getElementById('lastest-episodes');
        await movies.map((movie)=> {
            const url = `${base_url}/movie/${movie.id}`;
            movies_urls.push(url);
        })
        const lastest_two_movies = movies_urls.slice(0,2);
        lastest_two_movies.forEach((url)=>{
            fetch(url, options)
            .then(res => res.json())
            .then((lastest) => {
                lastestEpisodes.innerHTML += `<div class="col-lg-6 col-12 mb-4 mb-lg-0">
                        <div class="custom-block d-flex">
                            <div class="">
                                <div class="custom-block-icon-wrap">
                                    <div class="section-overlay"></div>
                                    <a href="detail-page.html" class="custom-block-image-wrap">
                                        <img src="${base_img}/${lastest.poster_path}" class="custom-block-image img-fluid" alt="">
                                        <a href="#" class="custom-block-icon">
                                            <i class="bi-play-fill"></i>
                                        </a>
                                    </a>
                                </div>
                                <div class="mt-2">
                                    <a href="#" class="btn custom-btn">
                                        Subscribe
                                    </a>
                                </div>
                            </div>
                            <div class="custom-block-info">
                                <div class="custom-block-top d-flex mb-1">
                                    <small class="me-4">
                                        <i class="bi-clock-fill custom-icon"></i>
                                        ${lastest.runtime} Minutes
                                    </small>

                                    <small>Release: <span class="badge">${lastest.release_date}</span></small>
                                </div>
                                <h4 class="mb-2">
                                    <a href="detail-page.html">
                                        ${lastest.original_title}
                                    </a>
                                </h4>
                                <div class="profile-block d-flex">
                                    <img src="${base_img}/${lastest.production_companies[0].logo_path}" class="profile-block-image img-fluid" alt="">
                                    <p>
                                        ${lastest.production_companies[0].name}
                                        <strong>${lastest.production_companies[0].origin_country}</strong>
                                    </p>
                                </div>
                            </div>
                            <div class="d-flex flex-column ms-auto">
                                <a href="#" class="badge ms-auto">
                                    <i class="bi-heart"></i>
                                </a>
                                <a href="#" class="badge ms-auto">
                                    <i class="bi-bookmark"></i>
                                </a>
                            </div>
                        </div>
                    </div>`;
                })
                .catch(err => console.error('error:' + err));
        })
    }

    const getCarousel = async(movies)=>{
        await movies.map((movie)=> {
            carousel.innerHTML += `<div class="owl-carousel-info-wrap item">
                <img src="${base_img}/${movie.poster_path}" class="owl-carousel-image img-fluid" alt="">
                <img src="images/${movie.adult ? 'adult18' : 'verified'}.png" class="owl-carousel-verified-image img-fluid" alt="">
                <div class="owl-carousel-info">
                    <h6 class="mb-2 text-truncate">${movie.original_title}</h6>
                    <span class="badge">Release Date: ${movie.release_date}</span>
                    <span class="badge">Rate: ${movie.vote_average}</span>
                </div>
            </div>`;
        });

        $('.owl-carousel').owlCarousel({
            center: true,
            loop: true,
            margin: 30,
            autoplay: true,
            responsiveClass: true,
            responsive:{
                0:{
                    items: 2,
                },
                767:{
                    items: 3,
                },
                1200:{
                    items: 4,
                }
            }
        });
    }

    


    const api_movies = `${base_url}/${get_movies}?api_key=${api_key}`
    fetchMovies(api_movies);


