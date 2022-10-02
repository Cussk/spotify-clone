import { ArtistCard, Error, Loader } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopArtists = () => {
    const {data, isFetching, error} = useGetTopChartsQuery();

    //render loader icon if fetching and loading
    if (isFetching) return <Loader title="Loadingsongs top charts"/>;

    // render error component if error and country blank
    if (error) return <Error/>

    return (
        <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
                Top Artists
                </h2>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.map((track) => (
                    <ArtistCard
                        key={track.key} track={track}
                    />
                ))}
            </div>
        </div>
    )
};

export default TopArtists;
