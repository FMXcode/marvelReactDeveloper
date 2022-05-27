import { Component } from 'react/cjs/react.development';

import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelServices';

class RandomChar extends Component{

    state = {
        char: {},
        Loading: true,
        error: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
        
    } 

    componenetWillUnmount() {
        clearInterval(this.timerId);
    }
 
    onCharLoaded = (char) => {
        this.setState({
            char,
            Loading: false
        });
    }

    onCharLoading = () => {
        this.setState({
            Loading: true,
            error: false
        });
    }

    onRandomItem = () => {
        this.updateChar();
    }

    onError = () => {
       this.setState({
           Loading: false,
           error: true
       })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.onCharLoading();
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        const {char, Loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = Loading ? <Spinner/> : null;
        const content = !(error || Loading) ? <View char={char}/> : null;

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main"
                            onClick={this.onRandomItem}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const FitItem = (thumbnail) => {
    const thumbnailItem = thumbnail.thumbnail;
    if (thumbnailItem === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
         return <img src={thumbnailItem} alt="Random character" className="randomchar__img" style={{objectFit: 'contain'}} />
    } else {
        return <img src={thumbnailItem} alt="Random character" className="randomchar__img"/>
    }
}
const View = ({char}) => {

    const {name, description, thumbnail, homepage, wiki} = char;

    return(
        <div className="randomchar__block">
            <FitItem thumbnail={thumbnail}/>
                <div className="randomchar__info">
                     <p className="randomchar__name">{name}</p>
                     <p className="randomchar__descr">{description}</p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">HOMEPAGE</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">WIKI</div>
                            </a>
                         </div>
                </div>
        </div>
    );
}

export default RandomChar;