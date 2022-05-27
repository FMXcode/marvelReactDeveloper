import { Component } from 'react/cjs/react.production.min';

import MarvelService from '../../services/MarvelServices';
import Spinner from '../Spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        Loading: true,
        error: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService.getAllCharacters()
            .then(this.onCharLoaded)
            .catch(this.onError);
    }


    onError = () => {
        this.setState({
            Loading: false,
            error: true
        })
     }

     onCharLoaded = (charList) => {
        this.setState({
            charList,
            Loading: false
        });
    }

    renderListItem(arr) {
        const items = arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if(item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imgStyle = {'objectFit' : 'unset'};
            }
            return(
              <li key={item.id} onClick={() => this.props.onCharSelected(item.id)} className="char__item">
                  <img src={item.thumbnail} alt="abyss" style={imgStyle}/>
                  <div className="char__name">{item.name}</div>
              </li>
            )
      });

      return (
        <ul className="char__grid">
            {items}
        </ul>
    )
  }

    render() {
        const {charList, Loading, error} = this.state;

        const items = this.renderListItem(charList);

        const spiner = Loading ? <Spinner/> : null
        const errorMessage = error ? <ErrorMessage/> : null
        const content = !(Loading || error ) ? items : null
        return (
            <div className="char__list">
                    {spiner}
                    {content}
                    {errorMessage}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}


export default CharList;