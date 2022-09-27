import {Error, Loader, SongCard} from "../components";
import {genres} from '../assets/constants';

const Discover = () => {
    const genreTitle = 'Pop';

    return (
        <div className="flex flex-col">
            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                {/* insert dynamic genre with props */}
                <h2 className="font-bold text-3xl text-white">Discover {genreTitle}</h2>
                <select
                    onChange={() => {}} //changes genre when selected from options
                    value="" //default value in blank
                    className="bg-black text-gray-300 p-3 text-sm  rounded-lg outline-none sm:mt-0 mt-5"
                >
                    {/* maps genre array from genre file to option list.  Uses props to pull the title of the genres from genre asset */}
                    {genres.map((genre) => <option key={genre.value} value={genre.value}>{genre.title}</option>)}
                </select>
            </div>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((song, i) => (<SongCard
                    key={song.key}
                    song={song}
                    i={i}                    
                    />
                ))}
            </div>
        </div>
    );
}

export default Discover;
