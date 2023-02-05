export const createCharacteres = (character) => {
    let image = character.image;
    let name = character.name;
    let id = character.id;
    let status = character.status == '' ? 'unknown' : character.status;
    let specie = character.species == '' ? 'unknown' : character.species;
    let type = character.type == '' ? 'unknown' : character.type;
    let card = document.createRange().createContextualFragment(`
    <div class="card">
        <img src="${image}" alt="character avatar" id="avatar" class="card__avatar">
        <h2 class="card__name" id="name">
            ${name}
        </h2>
        <p class="card__id" id="id">
            #${id}
        </p>
        <p class="card__status" id="status">
            <i class="fa-solid fa-circle" style="color: ${estate(character.status)}"></i>
            ${status}
        </p>
        <p class="card__specie">
            Specie:
            <span id="specie">
                ${specie}
            </span>
        </p>
        <p class="card__type">
            Type:
            <span id="type">
                ${type}
            </span>
        </p>
    </div>
    `);
    return card;
}
export const createLocation = (name, type, dimension) => {
    let location = document.createRange().createContextualFragment(`
        <h1 class="cards__title animate__animated animate__zoomIn">
            ${name}
        </h1>
        <div class="cards__data">
            <p class="cards__description animate__animated animate__fadeInUp">
                Type: <span>${type}</span>
            </p>
            <p class="cards__description animate__animated animate__fadeInUp">
                Dimension: <span>${dimension}</span>
            </p>
        </div>
    `);
    return location;
};
export const createEpisode = (name, airDate, episode) => {
    let location = document.createRange().createContextualFragment(`
        <h1 class="cards__title animate__animated animate__fadeInDown">
            ${name}
        </h1>
        <div class="cards__data">
            <p class="cards__description animate__animated animate__fadeInLeft">
                Air date: <span>${airDate}</span>
            </p>
            <p class="cards__description animate__animated animate__fadeInRight">
                Episode: <span>${episode}</span>
            </p>
        </div>
    `);
    return location;
};
const estate = (value) => {
    if(value == 'Alive') {
        return '#38E54D';
    } else if (value == 'Dead'){
        return '#C21010';
    } else {
        return '#fff';
    }
}
export const eliminateCard = (mainGrid) => {
    while(mainGrid.firstChild) {
        mainGrid.removeChild(mainGrid.firstChild);
    }
}