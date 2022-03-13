async function getYoutbe(){
    try {
        const url = 'https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=UCWEsfZnh8RAX0mHa-QhQOMg&key=AIzaSyBi-M-X4MAsrHjLK6SlhFxEGnd4dprETeg';
        const getFunc = await getUrl(url);
        updateUi(getFunc);
    } catch (error) {
        alert(error)
    }    

}
getYoutbe();

function getUrl(url){

   return fetch(url)
        .then(response => {
            if(!response.ok){
                throw new Error(response.statusText);
            }else{
                return response.json();
            }
        })
        .then(response => {
            if(response.Response === "False"){
                throw new Error(response.Error)
            }else{
                return response.items;
            }
        });
}

function updateUi(arg){
    let card1 = '';
    let card2 = '';
    let card3 = '';
    arg.forEach(el => card1 += showUi(el));
    arg.forEach(el => card2 += showUi2(el));
    arg.forEach(el => card3 += showUi3(el));
    const element1 = document.querySelector('.container-yt');
    const element2 = document.querySelector('.banner');
    const element3 = document.querySelector('.modal-body');
    element1.innerHTML = card1;
    element2.innerHTML = card2;
    element3.innerHTML = card3;
}

function showUi(el){
    return `<div class="card" style="width: 18rem;">
    <img src="${el.snippet.thumbnails.medium.url}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title text-muted text-center">${el.snippet.title}</h5>
      <ul class="list-group mb-3">
        <li class="list-group-item"><strong>viewCount : </strong> ${el.statistics.viewCount} Views</li>
        <li class="list-group-item"><strong>videoCount : </strong> ${el.statistics.videoCount} Videos</li>
        <li class="list-group-item"><strong>Country : </strong> ${el.snippet.country}</li>
        <li class="list-group-item"><strong>Description : </strong> ${el.snippet.description}</li>               
      </ul>
      <a href="#" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal"><span class="bi bi-youtube"></span> Trailer</a>
    </div>
  </div>`;
}

function showUi2(el){
    return `<img src="${el.brandingSettings.image.bannerExternalUrl}" alt="...">`;
}

function showUi3(el){
    return `<div class="ratio ratio-16x9">
    <iframe src="https://www.youtube.com/embed/${el.brandingSettings.channel.unsubscribedTrailer}" title="YouTube video" allowfullscreen></iframe>
  </div>`;
}