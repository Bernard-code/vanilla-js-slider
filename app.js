
// set path for json file
var filePath = './cars.json';
// create slides array
var slides = [];

// set slider variable slider
var slider = document.getElementById('slider');

// xml http request to load json file
var xobj = new XMLHttpRequest();
xobj.overrideMimeType("application/json");
xobj.open('GET', filePath, true);

xobj.onreadystatechange = function () {
  if (xobj.readyState == 4 && xobj.status == "200") {

// parse json to object
    var data = JSON.parse(xobj.responseText);

    for(var i in data)
      slides.push([i, data [i]]);

    // create slides
    slides.forEach(function(item){
      createSlide(item[1].name, item[1].path, item[1].desc);
    });

    // add holder and set slider width
    var holder = slider.parentNode,
    contents = holder.innerHTML;
    holder.innerHTML = '<div id="holder">' + contents + '</div>';
    slider = document.getElementById('slider');

    var width = 320;

    slider.style.width = document.getElementsByClassName('item').length * width + 'px';

    // set initial active slide
    document.getElementsByClassName('item')[1].classList.add('active');

    // set active slide
    var activeEl = 1;

    // set arrows variables
    var goRight = document.querySelector('.rightArr'),
        goLeft = document.querySelector('.leftArr');

    // move slider clicking arrows
    goLeft.addEventListener('click', function(){
      if(activeEl - 1 < slides.length && activeEl > 0){
        activeEl -= 1;
        slideItem(activeEl, width);
      }else{
        return;
      }
    }, false);

    goRight.addEventListener('click', function(){
      if(activeEl + 1 < slides.length && activeEl + 1 > 0){
        activeEl += 1;
        slideItem(activeEl, width);
      }else{
        return;
      }
    }, false);

    // slider.addEventListener('click', function (event) {
    //     if (event.target.toString() === '[object HTMLImageElement]') {
    //       var currIndex = getIndex(event.target.parentNode);
    //       activeEl = currIndex;
    //       slideItem(currIndex);
    //     }
    // });

    // move slider
    function slideItem(elem, width){

      document.getElementsByClassName('active')[0].classList.remove('active');

      var nextSlide = document.getElementsByClassName('item')[elem];
      nextSlide.classList.add('active');

      moveWidth = -(width * (elem - 1)) ;

      slider.style.transform = "translate3d(" + moveWidth + "px, 0px, 0px)";

      if(elem == slides.length - 1){
        goRight.style.opacity = 0;
        goLeft.style.opacity = 1;
      }else if(elem == 0){
        goLeft.style.opacity = 0;
        goRight.style.opacity = 1;
      }else{
        goRight.style.opacity = 1;
        goLeft.style.opacity = 1;
      }
      console.log(slides.length)
    }

  }
};
xobj.send(null);

// find index of element
function getIndex(node) {
    var childs = node.parentNode.childNodes;
    var count = 0;
    for (var i = 0; i < childs.length; i++) {
        if (node === childs[i]) break;
        if (childs[i].toString() !== '[object Text]') count++;
    }
    return count;
}

// create single slide
function createSlide(name, path, desc){

  // create slide div
  var item = document.createElement("div");

  // add class 'item' to slide
  item.setAttribute('class', 'item');

  // create elements for the slide
  var slideName = document.createElement("h2");
  var slideImg = document.createElement("img");
  var slideCaption = document.createElement("p");

  // fill elements with data
  slideName.innerHTML = name;
  slideImg.setAttribute('src', path);
  slideCaption.innerHTML = desc;

  // append elements to slide
  item.appendChild(slideName);
  item.appendChild(slideImg);
  item.appendChild(slideCaption);

  // append slide to slider
  slider.appendChild(item);
}
