import React , {Component} from 'react';
import './Section.css';
import $ from 'jquery';
import mp3Src from '../../Images/song1.mp3';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
  } from 'react-router-dom';

import MainContent from '../../Main/MainContent';

import imgSrc from '../../Images/ko.jpg';

class Home extends Component{
    render(){
        return(
            <div className="home">
                <Album title="Albums"/>
                <Recent/>
                <Favourite/>
            </div>
        )
    }
}
class Album extends Component{

    constructor(props) {
        super(props);
        this.state = {
          currentCard: 0,
          position: 0,
          cardStyle: {
            transform: 'translateX(0px)'
          },
          width: 0,
          albumData : [{
            title: "Album1",
            desc: "this is first album",
            url: imgSrc
          },
          {
            title: "Album1",
            desc: "this is first album",
            url: imgSrc
          },
          {
            title: "Album1",
            desc: "this is first album",
            url: imgSrc
          },
          {
            title: "Album1",
            desc: "this is first album",
            url: imgSrc
          },
          {
            title: "Album1",
            desc: "this is first album",
            url: imgSrc
          }]
        };
      }

      componentDidMount() {
        if(document.getElementById("card") !== null){
          let boxWidth = document.getElementById("card").clientWidth;
          this.setState({ width: boxWidth });
        }
      }

      // func: click the slider buttons
      handleClick(type) {
        // get the card's margin-right
        let margin = window.getComputedStyle(document.getElementById("card")).marginRight;
        margin = JSON.parse(margin.replace(/px/i, ''));
        const cardWidth = this.state.width;
        const cardMargin = margin;
        const cardNumber = this.state.albumData.length;
        let currentCard = this.state.currentCard;
        let position = this.state.position;

        // slide cards
        if(type === 'next' && currentCard < cardNumber-1) {
          currentCard++;
          position -= (cardWidth+cardMargin);
        } else if(type === 'prev' && currentCard > 0) {
          currentCard--;
          position += (cardWidth+cardMargin);
        }
        this.setCard(currentCard, position);
      }

      setCard(currentCard, position) {
        this.setState({
          currentCard: currentCard,
          position: position,
          cardStyle: {
            transform: `translateX(${position}px)`
          }
        })
      }

    render(){
        let createShown = {
          display : this.props.title ==="Albums"?"block":"none"
        }
        return(
            <div className="album container-fluid">
                <div className="cards-slider row">
                    <div className="col-md-9"><h3>{this.props.title}</h3></div>
                      <div className="btn btn-success create-albm-btn" style={createShown}>Create Album</div>
                      <div className="ml-auto">
                        <div className="row">
                            <div className="arrow-btn">
                                <div className="btn btn-sm btn-outline-secondary btn-arrow-left" onClick={() => this.handleClick('prev')}><span>&lt;</span></div>
                            </div>
                            <div className="col-md-1 arrow-btn">
                                <div className="btn btn-sm btn-outline-secondary btn-arrow-right" onClick={() => this.handleClick('next')}><span>&gt;</span></div>
                            </div>
                        </div>
                      </div>
                </div>
                <hr className="album-hr"/>
                <div className="row album-content">
                    <Card cardStyle={this.state.cardStyle} albumData={this.state.albumData}/>
                </div>
            </div>
        )
    }
}


class Card extends Component{
    constructor(props){
        super(props);
        this.state = {
          
        }
    }
   componentDidMount = ()=>{
      $(".add-favourite").click(function(event){
          if(event.target.className.includes("fa-heart-o")){
            event.target.className = "fa fa-heart add-favourite"
          }
          else{
            event.target.className = "fa fa-heart-o add-favourite"
          }
      })
    }
    render(){
        const cardData = this.props.albumData;
        return(
            <div className="album-card text-center">
             {cardData.map((val, index)=>{
                 return(
                    <div className="card" id="card" style={this.props.cardStyle} key={index}>
                        <img src={val.url} className="card-img-top mx-auto img-thumbnail" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{val.title}</h5>
                            <p className="card-text">{val.desc}</p>
                            <span>0 songs</span>
                            <i className="fa fa-heart-o add-favourite" title="Add to favourite"></i>
                        </div>
                    </div>
                 )
             })}
             </div>
        )
    }
}

class AllCards extends Component{
    render(){
        return(
            <div className="allCards"></div>
        )
    }
}

class Favourite extends Component{
    render(){
        return(
            <div className="favourites">
                Favourite
            </div>
        )
    }
}

class Songs extends Component{
  constructor(props){
      super();
      this.state = {
          songs : [{
            title : "Rowdy baby",
            songImg : "https://timesofindia.indiatimes.com/photo/msid-67756770/67756770.jpg?resizemode=4",
            songSrc : mp3Src
          },
          {
            title : "Ko 2",
            songImg : imgSrc,
            songSrc : mp3Src
          },
          {
            title : "petta",
            songImg : "https://www.behindwoods.com/tamil-movies/petta/images/thumbnails/petta-songs-review.jpg",
            songSrc : mp3Src
          },
          {
            title : "songs1",
            songImg : imgSrc,
            songSrc : mp3Src
          }]
      }
  }
  render(){
    return(
      <div className="song-content">
        <div className="container">
          <div className="row">
            <div className="col">
              <h4>SONGS</h4>
            </div>
            <div className="col-md-2 mr-auto">
              <h5>{this.state.songs.length} Songs</h5>
            </div>
          </div>
          <hr/>
          {this.state.songs.map((song, index)=>{
              return(
                  <MusicPlayer songData={song} index={index} key={index}/>
              )
          })}
        </div>
      </div>
    )
  }
}
class Recent extends Component{
    render(){
        return(
            <div className="recent">
                <Album title="Recent"/>
            </div>
        )
    }
}

class MusicPlayer extends Component{
  constructor(props){
    super(props);
    this.state = {
      isPlaying : true,
      currentTime : "00:00",
      totalTime : "00:00",
      isMuted : false,
      isFavourite : false,
      volume : "1",
      songSrc : new Audio(this.props.songData.songSrc)
    }
  }
  songControls = (option)=> {
    console.log("paly");
    let song = this.state.songSrc;
    switch(option){
        case "play" :
          song.play();
          song.volume = this.state.volume;
          this.setState({isPlaying : false});
          break;
        case "pause":
          song.pause();
          this.setState({isPlaying : true});
          break;
        case "fav":
          break;
        case "unfav":
        default :
    }
  }

  setVolume = (vol)=> {
      let song = this.state.songSrc;
      song.volume = vol;
      this.setState({volume : vol});
  }
  setFav = (fav)=> {
      if(fav==="fav"){
        this.setState({isFavourite : true});
      }
      else{
          this.setState({isFavourite : false});
      }
  }
  timeUpdate = ()=>{
      setInterval(()=>{
          if(this.currentTime < this.totalTime){
            this.setState({currentTime : this.state.currentTime+1});
          }
      },1000)
  }
  render(){
    return(
      <div className="row music-player">
        <div className="col"><img className="music-img" src={this.props.songData.songImg} alt="img"/></div>
        <div className="col">{this.props.songData.title}</div>
        <div className="col">Album 1</div>
          {this.state.isPlaying ?
            <div className="col" onClick={this.songControls.bind(this,"play")}>
              <i className="fa fa-play" aria-hidden="true"></i>
            </div>:
            <div className="col" onClick={this.songControls.bind(this,"pause")}>
              <i className="fa fa-pause" aria-hidden="true"></i>
            </div>
           }
        <div className="col">{this.state.currentTime}/{this.state.totalTime}</div>
        {
          this.state.volume === "0"?
              <div className="col" onClick={this.setVolume.bind(this,"0.2")}>
                <span>
                  <i className="fa fa-volume-off"></i>
                  <i className="fa fa-ban"></i>
                </span>
              </div>:
                this.state.volume === "0.2" ?
                    <div className="col" onClick={this.setVolume.bind(this,"0.6")}><i className="fa fa-volume-off" aria-hidden="true"></i></div>:
                      this.state.volume === "0.6"?
                            <div className="col" onClick={this.setVolume.bind(this,"1")}><i className="fa fa-volume-down" aria-hidden="true"></i></div>:
                                <div className="col" onClick={this.setVolume.bind(this,"0")}><i className="fa fa-volume-up" aria-hidden="true"></i></div>
            }
        {this.state.isFavourite ?
          <div className="col" onClick={this.setFav.bind(this,"unfav")}><i className="fa fa-heart" aria-hidden="true"></i></div>:
          <div className="col" onClick={this.setFav.bind(this,"fav")}><i className="fa fa-heart-o" aria-hidden="true"></i></div>}
      </div>
    )
  }
}

class Profile extends Component{
    render(){
        return(
            <div className="profile">Profile</div>
        )
    }
}

class Section extends Component{
    constructor(props){
        super(props);
        this.state = {
            isUserActive : false
        }
    }

    componentDidMount = ()=> {
      if(localStorage.getItem("musicHunt") !==null){
        this.setState({isUserActive : true});
      }
    }

    logout = ()=> {
      localStorage.clear();
      this.setState({isUserActive : false});
    }
    render(){
      if(!this.state.isUserActive){
        return(
            <div className="section container-fluid">
                <Router>
                <div className="section-aside">
                    <ul>
                        <Link to="/">
                            <li className="active">
                                <div className="row">
                                    <div className="mr-auto">Home</div>
                                    <div className="ml-auto"><i className="fa fa-home" aria-hidden="true"></i></div>
                                </div>
                            </li>
                        </Link>
                        <Link to="/album">
                            <li>
                                <div className="row">
                                    <div className="mr-auto">Albums</div>
                                    <div className="ml-auto"><i className="fa fa-folder-open-o" aria-hidden="true"></i></div>
                                </div>
                            </li>
                        </Link>
                        <Link to="/song">
                            <li>
                                <div className="row">
                                    <div className="mr-auto">Songs</div>
                                    <div className="ml-auto"><i className="fa fa-folder-open-o" aria-hidden="true"></i></div>
                                </div>
                            </li>
                        </Link>
                        <Link to="/recent">
                            <li>
                                <div className="row">
                                    <div className="mr-auto">Recent</div>
                                    <div className="ml-auto"><i className="fa fa-history" aria-hidden="true"></i></div>
                                </div>
                            </li>
                        </Link>
                        <Link to="/favourites">
                            <li>
                                <div className="row">
                                    <div className="mr-auto">Favourites</div>
                                    <div className="ml-auto"><i className="fa fa-heart" aria-hidden="true"></i></div>
                                </div>
                            </li>
                        </Link>
                        <Link to="/profile">
                            <li>
                                <div className="row">
                                    <div className="mr-auto">Profile</div>
                                    <div className="ml-auto"><i className="fa fa-user-o" aria-hidden="true"></i></div>
                                </div>
                            </li>
                        </Link>
                            <li>
                                <div className="row" onClick={this.logout}>
                                    <div className="mr-auto">
                                    {this.state.isUserActive ? "Logout":  "Login"}</div>
                                    <div className="ml-auto"><i className="fa fa-sign-out" aria-hidden="true"></i></div>
                                </div>
                            </li>
                    </ul>
                </div>
                <div className="section-content">
                    <div className="section-content-album">
                    <Switch>
                        <Route exact path="/" render={()=><Home/>}/>
                        <Route path="/album" render = {()=><Album title="Album"/>}/>
                        <Route path="/song" render = {()=><Songs/>}/>
                        <Route path="/allcards" render={()=><AllCards/>}/>
                        <Route path="/recent" render = {()=><Recent/>}/>
                        <Route path="/favourites" render = {()=><Favourite />}/>
                        <Route path="/profile" render = {()=><Profile />}/>
                        <Route path="/" render = {()=><Album />}/>
                    </Switch>
                    </div>
                </div>
                </Router>
            </div>
        )
      }
      else{
        return <MainContent />
      }
    }
}

export default Section;
