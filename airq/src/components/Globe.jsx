import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

// Technician data (mocked, replace with live API later)
const technicians = [
  {
    name: "David Owm",
    status: "On Job",
    color: "#00ff88",
    lat: 40.7128,
    lng: -74.006,
  }, // NYC
  {
    name: "Mark Johnson",
    status: "Dispatch Needed",
    color: "#ff4444",
    lat: 51.5074,
    lng: -0.1278,
  }, // London
  {
    name: "Sophia Lee",
    status: "Available",
    color: "#00aaff",
    lat: 35.6762,
    lng: 139.6503,
  }, // Tokyo
];

// Convert lat/lng → 3D coords on sphere
function latLngToXYZ(lat, lng, radius = 2) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return [x, y, z];
}

function TechnicianMarker({ tech }) {
  const [x, y, z] = latLngToXYZ(tech.lat, tech.lng);

  return (
    <group position={[x, y, z]}>
      {/* Glowing dot */}
      <mesh>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={tech.color} />
      </mesh>

      {/* Label */}
      <Html distanceFactor={10}>
        <div
          className="px-2 py-1 rounded-md text-xs font-bold"
          style={{
            background: "rgba(0,0,0,0.6)",
            border: `1px solid ${tech.color}`,
            color: tech.color,
            backdropFilter: "blur(6px)",
          }}
        >
          {tech.name} <br />
          <span className="text-[10px] opacity-80">{tech.status}</span>
        </div>
      </Html>
    </group>
  );
}

function GlobeMesh() {
  const [colorMap, bumpMap, specularMap, cloudsMap] = useLoader(
    THREE.TextureLoader,
    [
      "https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    ]
  );

  return (
    <group>
      {/* Clouds Layer */}
      <mesh>
        <sphereGeometry args={[2.01, 64, 64]} />
        <meshPhongMaterial
          map={cloudsMap}
          transparent
          opacity={0.3}
          depthWrite={true}
        />
      </mesh>

      {/* Earth */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial
          map={colorMap}
          bumpMap={bumpMap}
          bumpScale={0.05}
          specularMap={specularMap}
          specular={new THREE.Color("grey")}
        />
      </mesh>
    </group>
  );
}

export default function Globe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ height: "100%", width: "100%" }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />

      {/* Globe */}
      <GlobeMesh />

      {/* Technician markers */}
      {technicians.map((tech, i) => (
        <TechnicianMarker key={i} tech={tech} />
      ))}

      {/* Stars background */}
      <Stars radius={50} depth={20} count={5000} factor={4} fade />

      {/* Controls */}
      <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={1.5} />
    </Canvas>
  );
}
