import countryNameMapping from "../constants/index";

type Song = {
    song: string,
    artist: string,
    year: number,
    bpm: number
}

type SongListProps = {
    songs: Song[],
    countryId: string
}

function SongList({songs, countryId} : SongListProps){
    return(
        <div className={"flex-row w-full p-6 bg-neutral-600 m-3 max-h-[1000px] overflow-y-auto"}>
            <h2>{countryId.length > 0 ? `${countryNameMapping[countryId]} : Top Songs` : "Select A Country From Above"}</h2>
            {countryId.length> 0 && songs.map((song, index) => (
                <div className={"bg-neutral-700 p-3 mt-5"}>
                    <p>{song.song} - {song.artist}</p>
                </div>
            ))}
        </div>
    )
}

export default SongList