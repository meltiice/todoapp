import PropTypes from 'prop-types';

const Timer = ({ time, startTime, deleteTimer, play }) => {
   const hours = Math.floor(time / 3600);
   const minutes = Math.floor(time / 60) - hours * 60 ? Math.floor(time / 60) - hours * 60 : '00';
   const seconds = time % 60 < 10 ? `0${time % 60}` : time % 60;
   const formatTime = hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`

   const button = play ? (<button className="icon icon-pause" onClick={deleteTimer}></button>)
                       : (<button className="icon icon-play" onClick={startTime}></button>)
   return (
      <span className="description">
         {button}
         <span className='timer'>{formatTime}</span>
      </span>
   )
}

Timer.propTypes = {
   time: PropTypes.number,
   startTime: PropTypes.func,
   play: PropTypes.bool,
   deleteTimer: PropTypes.func
}

export default Timer
