class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=92ac6e30c3cfae4c97502e58cb199b6a';

    getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }
    
    _transformCharacter = (char) => {
        if (char.description === '') {
            return {
                id: char.id,
                name: char.name,
                description: 'This hero did not prove himself enough to say something about him. We wish him success in his heroic service and further achievements',
                thumbnail: char.thumbnail.path + '.' +  char.thumbnail.extension,
                homepage: char.urls[0].url,
                wiki: char.urls[1].url,
                comics: char.comics.items
            }
        } else if (char.description.length > 150) {
            return {
                id: char.id,
                name: char.name,
                description: char.description.slice(0, 150) + ' ...',
                thumbnail: char.thumbnail.path + '.' +  char.thumbnail.extension,
                homepage: char.urls[0].url,
                wiki: char.urls[1].url,
                comics: char.comics.items
            }
        }
        else {
            return {
                id: char.id,
                name: char.name,
                description: char.description,
                thumbnail: char.thumbnail.path + '.' +  char.thumbnail.extension,
                homepage: char.urls[0].url,
                wiki: char.urls[1].url,
                comics: char.comics.items
            }
        }
        
    }
}

export default MarvelService;