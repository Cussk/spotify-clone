import {FaPauseCircle, FaPlayCircle} from 'react-icons/fa';

const PlayPause = ({isPlaying, activeSong, song, handlePause, handlePlay}) => 
//if song is playing AND the active song === song.title property render pause icon
(isPlaying && activeSong?.title === song.title ? (
  <FaPauseCircle 
    size={35}
    className='text-gray-300'
    onClick={handlePause}
  />
) : 
// else render play icon
(
  <FaPlayCircle 
    size={35}
    className='text-gray-300'
    onClick={handlePlay}
  />
));

export default PlayPause;
