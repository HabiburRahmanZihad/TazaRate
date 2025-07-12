import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { divIcon } from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

import data from '../../assets/Json/warehouses.json';

// Default center (Dhaka)
const defaultPosition = [23.8103, 90.4125];

const regionColors = {
    Dhaka: '#E63946',
    Chattogram: '#1D3557',
    Sylhet: '#2A9D8F',
    Rajshahi: '#F4A261',
    Khulna: '#A8DADC',
    Barisal: '#FFB703',
    Rangpur: '#6D597A',
    Mymensingh: '#118AB2',
};

// Create colored map marker icons
const getRegionIcon = (region) => {
    const color = regionColors[region] || '#000';
    return divIcon({
        html: ReactDOMServer.renderToString(<FaMapMarkerAlt style={{ color, fontSize: '24px' }} />),
        className: '',
        iconSize: [24, 24],
        iconAnchor: [12, 24],
    });
};

// Map flyTo helper component
const FlyToLocation = ({ position }) => {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.flyTo(position, 10, { duration: 1.5 });
        }
    }, [position, map]);
    return null;
};

const Coverage = () => {
    const [districts, setDistricts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [flyToPos, setFlyToPos] = useState(null);

    useEffect(() => {
        setDistricts(data);
    }, []);

    const handleSearch = () => {
        const input = searchText.trim().toLowerCase();
        if (!input) return;

        const found = districts.find((d) =>
            d.city.toLowerCase().includes(input) ||
            d.district.toLowerCase().includes(input) ||
            d.region.toLowerCase().includes(input)
        );

        if (found) {
            setFlyToPos([found.latitude, found.longitude]);
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Not Found',
                text: 'No matching location found.',
                confirmButtonColor: '#C6E137',
            });
        }
    };

    return (
        <section className="bg-white py-12 px-4 md:px-12 lg:px-20 rounded-3xl">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary pb-2 mb-10">
                    We are available in {districts.length} districts
                </h2>

                {/* Search Input */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault(); // Prevent page reload
                        handleSearch();     // Trigger search
                        setSearchText('');  // Clear input after search
                    }}
                    className="flex flex-col md:flex-row items-center gap-4 mb-8"
                >
                    <div className="relative w-full md:w-[600px]">
                        <input
                            type="text"
                            placeholder="🔍 Search by city, district or region"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="w-full py-2 px-5 rounded-full border border-gray-300 bg-gray-100 text-base text-gray-800 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="absolute right-1 top-1 bottom-1 px-6 bg-primary hover:bg-accent text-black font-semibold text-sm rounded-full transition-all"
                        >
                            Search
                        </button>
                    </div>
                </form>


                <div className="w-full h-[500px] rounded-xl overflow-hidden shadow">
                    <MapContainer center={defaultPosition} zoom={7} scrollWheelZoom={false} className="h-full w-full z-0">
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {flyToPos && <FlyToLocation position={flyToPos} />}

                        {districts.map((district, idx) => (
                            <Marker
                                key={idx}
                                position={[district.latitude, district.longitude]}
                                icon={getRegionIcon(district.region)}
                            >
                                <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent={false}>
                                    <div className="text-sm font-medium">
                                        <p>
                                            <strong>{district.district}</strong>, {district.city}
                                        </p>
                                        <p>Region: {district.region}</p>
                                        <p className="text-gray-700 text-xs mt-1">
                                            <strong>Areas:</strong> {district.covered_area?.join(', ')}
                                        </p>
                                    </div>
                                </Tooltip>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>

                {/* Legend */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(regionColors).map(([region, color]) => (
                        <div key={region} className="flex items-center space-x-2">
                            <FaMapMarkerAlt style={{ color, fontSize: '20px' }} />
                            <span className="text-sm font-medium">{region}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Coverage;