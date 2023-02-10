import {getData, getEpisode, getResidents} from './consultas.js';
import {createCharacteres, eliminateCard, createLocation, createEpisode} from './cards.js';

const buttonHamburger = document.querySelector('.nav__hamburger-show');
const itemList = document.querySelectorAll('.nav__label');
const toggleTheme = document.querySelector('.toggle-theme');
const cardsContainer = document.querySelector('.cards__container');
const cardsInformation = document.querySelector('.cards__information');
const ButtonShowMore = document.querySelector('.main__button');

let page = 1;
let max = 42;
let ban = -1;

// ### Declaración de funciones ###
const getCharacter = async () => {
    let characteres = await getData(`https://rickandmortyapi.com/api/character/?page=${page}`);
    characteres.results.forEach(character => {
        let card = createCharacteres(character);
        cardsContainer.append(card);
    });
    page++;
};
const eliminarActivos = () => {
    itemList.forEach(item => {
        item.classList.remove('label-active');
    })
};

itemList.forEach(item => {
    if(item.id == 'character') {
        item.addEventListener('click', async () => {
            eliminarActivos();
            eliminateCard(cardsContainer);
            eliminateCard(cardsInformation);
            item.classList.add('label-active');
            page = 1;
            max = 42;
            let url = `https://rickandmortyapi.com/api/character/?page=${page}`;
            let characteres = await getData(url);

            characteres.results.forEach(character => {
                let card = createCharacteres(character);
                cardsContainer.append(card);
            });

            page++;
            ban = -1;
            document.querySelector('.nav__container').classList.toggle('nav__container-show');
        });
    }else if(item.id == 'location'){
        item.addEventListener('click', async () => {
            eliminarActivos();
            eliminateCard(cardsContainer);
            eliminateCard(cardsInformation);
            item.classList.add('label-active');
            page = 1;
            max = 126;
            let url = `https://rickandmortyapi.com/api/location/${page}`;
            let location = await getData(url);
            cardsInformation.append(createLocation(location.name, location.type, location.dimension));

            let residents = await getResidents(location.residents);
            residents.forEach(character => {
                let card = createCharacteres(character);
                cardsContainer.append(card);
            });

            page++;
            ban = 0;
            document.querySelector('.nav__container').classList.toggle('nav__container-show');
        });
    }else if(item.id == 'episode') {
        item.addEventListener('click', async () => {
            eliminarActivos();
            eliminateCard(cardsContainer);
            eliminateCard(cardsInformation);
            item.classList.add('label-active');
            page = 1;
            max = 51;
            let url = `https://rickandmortyapi.com/api/episode/${page}`;
            let episode = await getData(url);
            
            cardsInformation.append(createEpisode(episode.name, episode.air_date, episode.episode));

            let characters = await getEpisode(episode.characters);
            characters.forEach(character => {
                let card = createCharacteres(character);
                cardsContainer.append(card);
            });

            page++;
            ban = 1;
            document.querySelector('.nav__container').classList.toggle('nav__container-show');
        });
    }
});

// ### Event Listener ###

ButtonShowMore.addEventListener('click', async () => {
    if(ban == -1) {
        if(page <= max){
            let url = `https://rickandmortyapi.com/api/character/?page=${page}`;
            let characteres = await getData(url);

            characteres.results.forEach(character => {
                let card = createCharacteres(character);
                cardsContainer.append(card);
            });
            page++;
        }else {
            ButtonShowMore.innerHTML = 'No more';
            setTimeout(() => {
                ButtonShowMore.innerHTML = 'Show more';
            }, 1000);
        }
    }else if(ban == 0){
        if(page <= max) {
            eliminateCard(cardsContainer);
            eliminateCard(cardsInformation);
            let url = `https://rickandmortyapi.com/api/location/${page}`;
            let location = await getData(url);
            
            cardsInformation.append(createLocation(location.name, location.type, location.dimension));

            let residents = await getResidents(location.residents);
            residents.forEach(character => {
                let card = createCharacteres(character);
                cardsContainer.append(card);
            });
            page++;
        }else {
            ButtonShowMore.innerHTML = 'No more';
            setTimeout(() => {
                ButtonShowMore.innerHTML = 'Show more';
            }, 1000);
        }
    }else if(ban == 1){
        if(page <= max){
            eliminateCard(cardsContainer);
            eliminateCard(cardsInformation);
            let url = `https://rickandmortyapi.com/api/episode/${page}`;
            let episode = await getData(url);
            cardsInformation.append(createEpisode(episode.name, episode.air_date, episode.episode));

            let characters = await getEpisode(episode.characters);
            characters.forEach(character => {
                let card = createCharacteres(character);
                cardsContainer.append(card);
            });
            page++;
        }else {
            ButtonShowMore.innerHTML = 'No more';
            setTimeout(() => {
                ButtonShowMore.innerHTML = 'Show more';
            }, 1000);
        }
    }
});

buttonHamburger.addEventListener('click', () => {
    document.querySelector('.nav__container').classList.toggle('nav__container-show');
});

toggleTheme.addEventListener('click', () => {
    document.querySelector('.toggle-circle').classList.toggle('toggle-circle-dark');
    document.querySelector('.main').classList.toggle('dark');
    document.querySelector('.header').classList.toggle('dark');
});

await getCharacter();