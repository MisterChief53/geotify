"use client"

import {useEffect} from "react";
import Head from "next/head";


function Map({onCountryIdChange}){
    useEffect(() => {

        function runMap(){

            ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"]; // INIT
            // -----------------------------
            // Define Module Location
            zingchart.MODULESDIR = 'https://cdn.zingchart.com/modules/';

            // must load maps and first map we are going to render
            zingchart.loadModules('maps,maps-world-countries');

            // initial config for first chart
            let chartConfig = {
                shapes: [{
                    type: 'zingchart.maps',
                    options: {
                        name: 'world.countries',
                        label: {
                            visible: false,
                        },
                        style: {
                            //style all countries
                            label: {
                                visible: false,
                            },
                            backgroundColor: '#cccccc',
                            borderColor: '#1b1c1c',
                            hoverState: {
                                alpha: 0.32,
                                backgroundColor: '#1f6632'
                            },
                        },
                    },
                }, ],
                backgroundColor: '#1b1c1c'
            };

            zingchart.render({
                id: 'map',
                data: chartConfig
            });


            zingchart.bind('map', 'shape_click', function(e) {
                let countryId = String(e.shapeid).toLowerCase();
                onCountryIdChange(countryId)
            });

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

    },[onCountryIdChange])


    return(
        <div className={"w-full"}>
            <div id={"map"} className={"chart--container"}>
                <a className="zc-ref" href="https://www.zingchart.com">Powered by ZingChart</a>
            </div>
        </div>
    )
}

export default Map