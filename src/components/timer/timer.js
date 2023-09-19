import { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
   state = {
      time: 0
   }

   static propTypes = {
      time: PropTypes.number,
      updateTime: PropTypes.func,
      play: PropTypes.bool,
      deleteTimer: PropTypes.func
   }

   formatTime = (time) => {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor(time / 60) - hours * 60 ? Math.floor(time / 60) - hours * 60 : '00';
      const seconds = time % 60 < 10 ? `0${time % 60}` : time % 60;
      console.log(hours, minutes, seconds)
      const format = hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`
      return format;
   }

   render() {
      const { time, updateTime, deleteTimer, play } = this.props
      const button = play ? (<button className="icon icon-pause" onClick={deleteTimer}></button>)
                     : (<button className="icon icon-play" onClick={updateTime}></button>)
      return (
         <span className="description">
         {button}
         <span className='timer'>{this.formatTime(time)}</span>
   </span>
   )
   }
}

export default Timer
