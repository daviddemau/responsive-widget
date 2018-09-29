//Taboola API
const url= 'https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=6&placement.name=Below%20Article%20Thumbnails&placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init';

//get application data
const data = JSON.parse(GetData(url));
const widgetsArray = data.list;

console.log(widgetsArray)

//select divs where to show the informations
thumbnails = Array.from(document.querySelectorAll('.thumbnail'));
titles = Array.from(document.querySelectorAll('.title'));
brand = Array.from(document.querySelectorAll('.branding'));

//assign data from API to the corresponding widget element
assignData();


//functions
function assignData(){
  for(var i = 0; i < widgetsArray.length ; i++) {
    let item = widgetsArray[i];
    //assign thumbnail images
    thumbnails[i].style.backgroundImage = "url("+ item.thumbnail[0].url + ")";
    //assign item title
    titles[i].innerHTML = item.name;
    //assign branding
    brand[i].innerHTML = item.branding;
    //make all item elements clickable to redirect to corresponding url
    let arr = []
    arr.push(thumbnails[i], titles[i], brand[i]);
    sendToUrl(arr, item.url);
  }
}

function sendToUrl(arr, destinationUrl) {
  arr.forEach((e) => {
    e.addEventListener('click', () => window.location = destinationUrl)
  })
}

function GetData(yourUrl){
    var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;
}
