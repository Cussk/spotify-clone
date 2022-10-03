import { useDispatch, useSelector } from "react-redux";
import {Error, Loader, SongCard} from "../components";
import {genres} from '../assets/constants';
import {useGetSongsByGenreQuery} from '../redux/services/shazamCore';
import { selectGenreListId } from "../redux/features/playerSlice";

const Discover = () => {
    const dispatch = useDispatch();
    const {activeSong, isPlaying, genreListId} = useSelector((state) => state.player // pull player info from entire state
    );
    const {data, //result of api call
           isFetching, // allow to know if currently fetching so can show loading state
           error // allow konw if error happened
        } = useGetSongsByGenreQuery(genreListId || 'POP');

    //if currently fetching will return a loading component
    if(isFetching) return <Loader title='Loading songs...'/>;
    
    //if an error occurs return the error component
    if(error) return <Error/>

    const genreTitle = genres.find(({value}) => value === genreListId)?.title; //dynamic title based on what genre chosen

    return (
        <div className="flex flex-col">
            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                {/* insert dynamic genre with props */}
                <h2 className="font-bold text-3xl text-white">Discover {genreTitle}</h2>
                <select
                    onChange={(e) => dispatch(selectGenreListId(e.target.value))} //changes genre when selected from options
                    value={genreListId || 'pop'} //default value pop or chosen genre
                    className="bg-black text-gray-300 p-3 text-sm  rounded-lg outline-none sm:mt-0 mt-5"
                >
                    {/* maps genre array from genre file to option list.  Uses props to pull the title of the genres from genre asset */}
                    {genres.map((genre) => <option key={genre.value} value={genre.value}>{genre.title}</option>)}
                </select>
            </div>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {/* map data from shazam core api if it eists */}
                {data?.map((song, i) => (<SongCard
                    key={song.key} //lets React know what song we are showing
                    song={song} // song as props
                    i={i} // index as props 
                    activeSong={activeSong}
                    isPlaying={isPlaying}   
                    data={data}          
                    />
                ))}
            </div>
        </div>
    );
}

export default Discover;
