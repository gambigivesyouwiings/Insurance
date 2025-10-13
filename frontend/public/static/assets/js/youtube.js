var myButton = document.getElementById("show");
var myDiv = document.getElementById("p-container");
myButton.addEventListener('click', myfunction)
function myfunction(){
        const url = '/devin';
        fetch(url).then(response => response.json())
        .then(response => displayVideo(response))
        .catch(function(error){
        console.log(error);
        })
}
function displayVideo(video){
    var childCount = myDiv.childElementCount;
    var num = childCount + 3;
    console.log(num);
    console.log(video.length);
    if (num <= video.length){
        for( let i=0; i<num; i++){
        console.log(video[i].img_url);
        myDiv.insertAdjacentHTML('beforeend', `<div class="col-lg-4 col-md-6 portfolio-item filter-app"><div class="portfolio-wrap">
              <img src="${ video[i].img_url }" class="img-fluid" alt="">
              <div class="portfolio-info">
                <h4>${ video[i].title }</h4>
                <p>${ video[i].body }</p>
                <div class="portfolio-links">
                  <a href="https://www.youtube.com/embed/${video[i].video_url}" class="portfolio-details-lightbox" data-glightbox="type: external" title="Play"><i class="bx bx-play"></i></a>
                </div>
              </div>
              </div>
              </div>`)
        }
    }
    else if(childCount < video.length){
        for( let i=childCount; i<video.length; i++){
        let newContainer = document.createElement('div');
        myDiv.insertAdjacentHTML('beforeend', `<div class="col-lg-4 col-md-6 portfolio-item filter-app"><div class="portfolio-wrap">
              <img src="${ video[i].img_url }" class="img-fluid" alt="">
              <div class="portfolio-info">
                <h4>${ video[i].title }</h4>
                <p>${ video[i].body }</p>
                <div class="portfolio-links">
                  <a href="https://www.youtube.com/embed/${video[i].video_url}" class="portfolio-details-lightbox" data-glightbox="type: external" title="Play"><i class="bx bx-play"></i></a>
                </div>
              </div>
              </div>
              </div>`)
    }
    }
    else {
    console.log('done')
    }

}
