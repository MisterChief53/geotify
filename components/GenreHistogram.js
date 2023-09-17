"use client"

import {useEffect} from "react";
import Head from "next/head";


function GenreHistogram({genres}){
    useEffect(() => {

        function runMap(){
            ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];
            let chartData = []

            for(let i = 0; i < genres.length; i++){
                const newEntry = {
                    values: [genres[i].count],
                    text: genres[i].genre
                }
                chartData.push(newEntry)
            }

            console.log(chartData)

            function getRandomHexColorWithinTone(tone, minBrightness, maxBrightness) {
                // Convert the tone to RGB values
                const r = parseInt(tone.slice(1, 3), 16);
                const g = parseInt(tone.slice(3, 5), 16);
                const b = parseInt(tone.slice(5, 7), 16);

                // Calculate random brightness within the specified range
                const randomBrightness = Math.floor(Math.random() * (maxBrightness - minBrightness + 1) + minBrightness);

                // Calculate new RGB values by adjusting the brightness
                const newR = Math.min(255, Math.max(0, r + randomBrightness));
                const newG = Math.min(255, Math.max(0, g + randomBrightness));
                const newB = Math.min(255, Math.max(0, b + randomBrightness));

                // Convert the new RGB values to a hex color
                const newColor = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;

                return newColor;
            }

            function getRandomHexColorWithSameBrightness(tone) {
                // Convert the tone to RGB values
                const r = parseInt(tone.slice(1, 3), 16);
                const g = parseInt(tone.slice(3, 5), 16);
                const b = parseInt(tone.slice(5, 7), 16);

                // Calculate the brightness of the specified tone
                const brightness = (r * 299 + g * 587 + b * 114) / 1000;

                // Generate random RGB values while keeping the same brightness
                let newR, newG, newB;
                do {
                    newR = Math.floor(Math.random() * 256);
                    newG = Math.floor(Math.random() * 256);
                    newB = Math.floor(Math.random() * 256);
                } while ((newR * 299 + newG * 587 + newB * 114) / 1000 !== brightness);

                // Convert the new RGB values to a hex color
                const newColor = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;

                return newColor;
            }

            const randomColors = generateRandomHexColorsArray(chartData.length)

            function generateRandomHexColorsArray(size) {
                const colorsArray = [];
                for (let i = 0; i < size; i++) {
                    //colorsArray.push(getRandomHexColorWithinTone('#1f6632', -50, 50));
                    colorsArray.push(getRandomHexColorWithSameBrightness('#1f6632'));
                }
                return colorsArray;
            }

            let chartConfig = {
                type: 'pie',
                globals: {
                    fontFamily: 'sans-serif'
                },
                backgroundColor: '#525252',
                palette: randomColors,
                legend: {
                    marginRight: '60px',
                    alpha: 0.1,
                    borderWidth: '0px',
                    highlightPlot: true,
                    item: {
                        fontColor: '#373a3c',
                        fontSize: '12px'
                    },
                    toggleAction: 'remove',
                    verticalAlign: 'middle',
                    width: '100px'
                },
                plot: {
                    valueBox: {
                        fontColor: '#fff'
                    },
                    detach: false,
                    highlightState: {
                        borderColor: '#525252',
                        borderWidth: '2px'
                    },
                    refAngle: 270
                },
                labels: [{
                    text: 'Hold SHIFT to detach multiple slices',
                    fontColor: '#373a3c',
                    fontSize: '14px',
                    textAlign: 'left'
                }],
                tooltip: {
                    borderColor: '#525252',
                    borderWidth: '2px',
                    placement: 'node:out'
                },
                series: chartData

            };

            zingchart.render({
                id: 'genre',
                data: chartConfig,
                height: '300px',
                //width: '100%',
            });

            zingchart.node_click = (p) => {
                let SHIFT_ACTIVE = p.ev.shiftKey;
                let sliceData = chartData[p.plotindex];
                let isOpen = (sliceData.hasOwnProperty('offset-r')) ? (sliceData['offset-r'] !== 0) : false;
                if (isOpen) {
                    sliceData['offset-r'] = 0;
                } else {
                    if (!SHIFT_ACTIVE) {
                        for (let i = 0; i < chartData.length; i++) {
                            chartData[i]['offset-r'] = 0;
                        }
                    }
                    sliceData['offset-r'] = 20;
                }

                zingchart.exec('genre', 'setdata', {
                    data: chartConfig
                });
            }

        }

        // Create a new script element
        const script = document.createElement('script');

        // Set the src attribute to the CDN URL of the JavaScript file
        script.src = 'https://cdn.zingchart.com/zingchart.min.js';

        // Listen for the 'load' event to ensure the script has been loaded
        script.addEventListener('load', () => {
            // Now that the script is loaded, you can use the variables and functions
            runMap();
        });

        // Append the script element to the <head> of the document
        document.head.appendChild(script);

        // Cleanup: remove the script element when the component unmounts
        return () => {
            document.head.removeChild(script);
        };

    })


    return(
        <div className={"w-full p-6 m-3 bg-neutral-600"}>
            <div id={"genre"} className={"chart--container"} >
                <a className="zc-ref" href="https://www.zingchart.com">Powered by ZingChart</a>
            </div>
        </div>
    )
}

export default GenreHistogram