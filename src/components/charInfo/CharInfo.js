import { Component } from 'react/cjs/react.development';

import MarvelService from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';

class CharInfo extends Component{

    state = {
        char: null,
        Loading: false,
        error: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    } 


    componentDidUpdate(prevProps, prevState) {
        if(this.props.charId !== prevProps.charId){
            this.updateChar();
        }
    }

    onCharLoading = () => {
        this.setState({
            Loading: true,
            error: false
        });
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            Loading: false
        });
    }

    onError = () => {
        this.setState({
            Loading: false,
            error: true
        })
     }

    updateChar = () => {
        const {charId} = this.props;
        if(!charId) {
            return
        }
        this.onCharLoading();

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        const {char, Loading, error} = this.state;

        const skeleton = error || Loading || char ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = Loading ? <Spinner/> : null;
        const content = !(error || Loading || !char) ? <View char={char}/> : null;
        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, thumbnail, description, wiki, homepage, comics} = char;

    const FitItem = (thumbnail) => {
        const thumbnailItem = thumbnail.thumbnail;
        if (thumbnailItem === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
             return <img src={thumbnailItem} alt={thumbnailItem} className="randomchar__img" style={{objectFit: 'unset'}} />
        } else {
            return <img src={thumbnailItem} alt={thumbnailItem} className="randomchar__img"/>
        }
    }

    return(
        <>
            <div className="char__basics">
                    <FitItem thumbnail={thumbnail}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">

                    {comics.map((item, i)  => {
                        console.log(` data: ${comics}`)
                        if(i > 10) {
                            return 
                        } else if (comics === null) {
                            <li className="char__comics-item" key={i}>
                            there is no information about the comics in which the hero participated
                            </li>
                        }
                        return (
                            <li className="char__comics-item" key={i}>
                                {item.name};
                            </li>
                        )
                    })}

                </ul>
        </>
    )
}

export default CharInfo;