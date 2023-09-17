"use client"
import Image from 'next/image'
import Map from '../components/Map'
import {useState} from "react";
import SongList from "@/components/SongList";
import GenreHistogram from "@/components/GenreHistogram";

export default function Home() {
    const [countryId, setCountryId] = useState('')
    const handleCountryIdChange = (newCountryId: string) => {
        setCountryId(newCountryId)
        console.log(newCountryId)
    }

    const songs = [
        {
            song: "Close your eyes",
            artist: "Alignment",
            year: 2023,
            bpm: 140
        },
        {
            song: "Sgadi Li Mi",
            artist: "Charlotte De Witte",
            year: 2023,
            bpm: 140
        },
        {
            song: "Sgadi Li Mi",
            artist: "Charlotte De Witte",
            year: 2023,
            bpm: 140
        },
        {
            song: "Sgadi Li Mi",
            artist: "Charlotte De Witte",
            year: 2023,
            bpm: 140
        },
        {
            song: "Me Porto Bonito",
            artist: "Bad Bunny Chencho, Corleone",
            year: 2023,
            bpm: 140
        },
        {
            song: "Sgadi Li Mi",
            artist: "Charlotte De Witte",
            year: 2023,
            bpm: 140
        }
    ]

    const genres = [
        {
            genre: 'techno',
            count: 10
        },
        {
            genre: 'pop',
            count: 5
        },
        {
            genre: 'country',
            count: 1
        }
    ]
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="w-full">
                <Map onCountryIdChange={handleCountryIdChange} />
            </div>
            <div className="flex justify-center w-full">
                <div className="w-1/3">
                    <SongList songs={songs} countryId={countryId} />
                </div>
                <div className="w-1/3">
                    <GenreHistogram genres={genres} />
                </div>
            </div>

        </main>
    )
}
