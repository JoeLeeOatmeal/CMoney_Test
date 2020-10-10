// use cors-anywhere to fetch api data
const URL = "https://data.coa.gov.tw/Service/OpenData/ODwsv/ODwsvTravelFood.aspx";
const CORS = 'https://cors-anywhere.herokuapp.com/'; 
let citys = [];

fetch(`${CORS}${URL}`)
//fetch('sourceData')
.then(response => response.json())
.then(restaurants => {

    document.querySelector('#loading').setAttribute('style', 'display:none');

    createRestaurants(restaurants, null, null);
    createCitySelections(restaurants);

    addEventListenersToCitySelections(restaurants);
    addEventListenerToTownSelections(restaurants);
})
.catch(ex => {
    alert("資料載入失敗 !");
});

function createRestaurants(restaurants, citySelect, townSelect){
    // clear origin container
    document.querySelector('.container').innerHTML = "";

    if(citySelect){
        restaurants = restaurants.filter(r => r.City == citySelect);
    }
    if(townSelect){
        restaurants = restaurants.filter(r => r.Town == townSelect);
    }

    for(let i = 0; i < restaurants.length; i++){

        let div = document.createElement('div');
        div.setAttribute('style', `background-image:url(${restaurants[i].PicURL});background-size:100%;background-potision:center;background-repeat:no-repeat;width:30%;height:200px;margin: 10px 0;overflow:hidden`);
        div.className = "restaurant";

        let cityTag = document.createElement('p');
        cityTag.innerText = restaurants[i].City;
        cityTag.setAttribute('style', 'position:absolute;top:0;left:0;background-color:orange;padding:5px');
        cityTag.className = "cityTag";
        div.append(cityTag);

        let townTag = document.createElement('p');
        townTag.innerText = restaurants[i].Town;
        townTag.setAttribute('style', 'position:absolute;top:80%;left:5px;font-style:italic');
        townTag.className = "townTag";
        div.append(townTag);


        let nameTag = document.createElement('p');
        nameTag.innerText = restaurants[i].Name;
        nameTag.setAttribute('style', 'position:absolute;top:90%;left:5px;font-weight:bold;');
        nameTag.className = "nameTag";
        div.append(nameTag);

        let desc = document.createElement('p');
        desc.innerText = restaurants[i].HostWords;
        desc.setAttribute('style', 'display:none;position:absolute;top:78%;left:5px;');
        desc.className = "desc";
        div.append(desc);

        document.querySelector('.container').append(div);
    }          
}

function createCitySelections(restaurants){
    
    for(let i = 0; i < restaurants.length; i++){
        let city = restaurants[i].City;
        if(!citys.includes(city)){
            citys.push(city);
        }
    }

    for(let i = 0; i < citys.length; i++){
        let option = document.createElement('option');
        option.innerText = citys[i];
        document.querySelector('#citySelection').append(option);
    }
}

function addEventListenersToCitySelections(restaurants){
    document.querySelector('#citySelection').addEventListener('change', function(){

        if(citys.includes(this.value)){
            createRestaurants(restaurants, this.value, null);
        }
        else{
            createRestaurants(restaurants, null, null);
        }
        
        createTownSelections(restaurants, this.value);
    });
}

function addEventListenerToTownSelections(restaurants){
    document.querySelector('#townSelection').addEventListener('change', function(){
        let cityChoice = document.querySelector('#citySelection').value;
        createRestaurants(restaurants, cityChoice, this.value);
    })
}

function createTownSelections(restaurants, city){
    document.querySelector('#townSelection').innerHTML = '<option value="">請選擇鄉鎮區...</option>';
    restaurants = restaurants.filter(r => r.City == city);
    let towns = [];

    for(let i = 0 ; i < restaurants.length; i++){
        let town = restaurants[i].Town;
        if(!towns.includes(town)){
            towns.push(town);
        }
    }

    for(let i = 0; i < towns.length; i++){
        let option = document.createElement('option');
        option.innerText = towns[i];
        document.querySelector('#townSelection').append(option);
    }
}
