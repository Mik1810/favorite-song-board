export class Song {

    constructor(title, artist, description, image) {
        this._title = title;
        this._artist = artist;
        this._description = description;
        this._image = image;
    }

    get title() {return this._title};
    get artist() {return this._artist};
    get description() {return this._description};
    get image() {return this._image};

    toString() {return this.title + " " + this._artist};
}