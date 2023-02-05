export const getData = async url => {
    try {
        let request = await fetch(url);
        if(request.ok && request.status == 200) {
            let data = await request.json();
            return data;
        }
        return null;
    }catch(error) {
        console.log(error.message);
    }
}

export const getResidents = async residents => {
    return await Promise.all(
        residents.map(x => {
            return fetch(x).then(res => res.json());
        })
    )
}

export const getEpisode = async characteres => {
    return await Promise.all(
        characteres.map(x => {
            return fetch(x).then(res => res.json());
        })
    )
}