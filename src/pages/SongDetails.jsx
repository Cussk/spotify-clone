import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/shazamCore";

const SongDetails = () => {
    const dispatch = useDispatch();
    const {songid} = useParams();
    const {activeSong, isPlaying} = useSelector((state) => state.player);
    const {data: songData, isFetching: isFetchingSongDetails} = useGetSongDetailsQuery({songid});
    const {data, isFetching: isFetchingRelatedSongs, error} = useGetSongRelatedQuery({songid});

    //when click pause icon pauses
    const handlePauseClick = () => {
        dispatch(playPause(false));
    };
    //when click play icon fetches song, data and index properies for actve song and plays
    const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({song, data, i}));
        dispatch(playPause(true));
    };

    //display loader component when fetching
    if (isFetchingRelatedSongs || isFetchingSongDetails) return <Loader title="Searching song details" />;

    //display error component is error occurs
    if(error) return <Error />

    return (
        <div className="flex flex-col">
            <DetailsHeader artistid="" songData={songData}/>
            <div className="mb-10">
                <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
                <div className="mt-5">
                    {/* if song data has lyrics map over them and return in paragraph by line, else return paragraph stating lyrics not found */}
                    {songData?.sections[1].type === 'LYRICS' ? songData?.sections[1].text.map((line, i) => (
                        <p className="text-gray-400 text-base my-1">{line}</p>
                    )) : <p className="text-gray-400 text-base my-1">Sorry, no lyrics found!</p>}
                </div>
            </div>
            <RelatedSongs 
                data={data}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
            />
        </div>
    )

};

export default SongDetails;
