//Taboola API
const url= 'https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=6&placement.name=Below%20Article%20Thumbnails&placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init';

//get application data
const data = JSON.parse(GetData(url));
const widgetsArray = data.list;

console.log(widgetsArray)

//select divs to display informations
thumbnails = Array.from(document.querySelectorAll('.thumbnail'));
titles = Array.from(document.querySelectorAll('.title'));
brand = Array.from(document.querySelectorAll('.branding'));
category = Array.from(document.querySelectorAll('#category'));

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

    //assign category with correct css
    assignCategory(item, i);

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

function assignCategory(item, index) {
  if(item.categories !== undefined) {
    category[index].innerHTML = item.categories[0];

    switch (item.categories[0]) {
      case 'education':
        category[index].style.color = 'blue';
        break;
      case 'entertainment':
        category[index].style.color = 'orange';
        break;
      case 'beauty':
        category[index].style.color = 'pink';
        break;
      case 'tech':
        category[index].style.color = 'cyan';
        break;
      case 'news':
        category[index].style.color = 'red';
        break;
      case 'autos':
        category[index].style.color = 'grey';
        break;
      case 'travel':
        category[index].style.color = 'gold';
        break;
      case 'lifestyle':
        category[index].style.color = 'orange';
        break;
      case 'health':
        category[index].style.color = 'green';
        break;
      case 'food':
        category[index].style.color = 'purple';
        break;
      case 'food':
        category[index].style.color = 'purple';
        break;
      }
  }
}
