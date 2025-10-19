import React from 'react';
import { motion } from 'framer-motion';
import type { Shape } from '../../types';

interface InteractiveShapeProps {
    shape: Shape;
    values: { [key: string]: string };
}

// Common styling for 3D faces
const faceBaseStyle: React.CSSProperties = {
    position: 'absolute',
    border: '1px solid rgb(34 211 238 / 0.7)', // cyan-400/70
    background: 'rgb(34 211 238 / 0.1)',
    boxSizing: 'border-box',
};

const SHAPE_VIEWBOX_SIZE = 120;
const ACCENT_COLOR = 'rgb(34 211 238)'; // cyan-400
const FILL_COLOR_2D = 'rgb(51 65 85 / 0.5)'; // slate-700/50


const InteractiveShape: React.FC<InteractiveShapeProps> = ({ shape, values }) => {
    // Helper to parse values safely
    const v = (key: string, def: number) => {
        const num = parseFloat(values[key]);
        return isNaN(num) || num <= 0 ? def : num;
    };
    
    // Scales a dimension to a max pixel value for consistent display
    const scale = (val: number, maxVal: number) => Math.max(1, Math.min(val / maxVal * 100, 100));

    // --- RENDER 2D SHAPES (SVG) ---
    const render2DShape = () => {
        return (
            <svg viewBox={`0 0 ${SHAPE_VIEWBOX_SIZE} ${SHAPE_VIEWBOX_SIZE}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <motion.g
                    stroke={ACCENT_COLOR}
                    strokeWidth="2"
                    fill={FILL_COLOR_2D}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={shape.name}
                >
                    {(() => {
                        switch (shape.name) {
                            case 'Circle': {
                                const r = scale(v('r', 50), 50);
                                return <motion.circle cx="60" cy="60" r={r} initial={{r:0}} animate={{r}} />;
                            }
                            case 'Square': {
                                const s = scale(v('s', 100), 100);
                                const offset = (100 - s) / 2;
                                return <motion.rect x={10+offset} y={10+offset} width={s} height={s} initial={{width:0, height:0}} animate={{width:s, height:s}} />;
                            }
                            case 'Rectangle': {
                                const l = scale(v('l', 100), 100);
                                const w = scale(v('w', 75), 100);
                                const xOff = (100-l)/2;
                                const yOff = (100-w)/2;
                                return <motion.rect x={10+xOff} y={10+yOff} width={l} height={w} initial={{width:0, height:0}} animate={{width:l, height:w}} />;
                            }
                            case 'Ellipse': {
                                const a = scale(v('a', 50), 50);
                                const b = scale(v('b', 30), 50);
                                return <motion.ellipse cx="60" cy="60" rx={a} ry={b} initial={{rx:0, ry:0}} animate={{rx:a, ry:b}} />;
                            }
                            case 'Right Triangle': {
                                const b = scale(v('b', 100), 100);
                                const h = scale(v('h', 100), 100);
                                const points = `10,${110-h} ${10+b},${110-h} 10,110`;
                                return <motion.polygon points="10,110 10,110 10,110" animate={{points}} />;
                            }
                             case 'Parallelogram': {
                                const b = scale(v('b', 100), 100);
                                const h = scale(v('h', 60), 100);
                                const xOff = (100 - b) / 2;
                                const yOff = (100 - h) / 2;
                                return <motion.rect x={10 + xOff} y={10 + yOff} width={b} height={h} initial={{ width: 0, height: 0 }} animate={{ width: b, height: h }} transform={`skewX(-20) translate(${h*0.2}, 0)`} />;
                            }
                            case 'Rhombus': {
                                const p = scale(v('p', 100), 100);
                                const q = scale(v('q', 70), 100);
                                const points = `60,${60 - q / 2} ${60 + p / 2},60 60,${60 + q / 2} ${60 - p / 2},60`;
                                return <motion.polygon points="60,60 60,60 60,60 60,60" animate={{ points }} />;
                            }
                            case 'Trapezoid': {
                                const a = scale(v('a', 80), 100);
                                const b = scale(v('b', 100), 100);
                                const h = scale(v('h', 60), 100);
                                const a_offset = (100 - a) / 2;
                                const b_offset = (100 - b) / 2;
                                const points = `${10+b_offset},${110-h} ${110-b_offset},${110-h} ${110-a_offset},10 ${10+a_offset},10`;
                                return <motion.polygon points="60,10 60,10 60,110 60,110" animate={{points}} />;
                            }
                            case 'Regular Polygon': {
                                const n = v('n', 6);
                                const s = v('s', 50);
                                if (n < 3) return null;
                                const R = n > 2 ? s / (2 * Math.sin(Math.PI / n)) : 0;
                                const scaledR = scale(R, 50);
                                
                                const points = Array.from({ length: Math.floor(n) }).map((_, i) => {
                                    const angle = (i * 2 * Math.PI / n) - Math.PI / 2;
                                    const x = 60 + scaledR * Math.cos(angle);
                                    const y = 60 + scaledR * Math.sin(angle);
                                    return `${x},${y}`;
                                }).join(' ');
                                
                                return <motion.polygon points={points} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />;
                            }
                            default: return null;
                        }
                    })()}
                </motion.g>
            </svg>
        );
    };

    // --- RENDER 3D SHAPES (CSS 3D) ---
    const render3DShape = () => {
        const sceneStyle: React.CSSProperties = {
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transformStyle: 'preserve-3d',
        };
        const modelStyle: React.CSSProperties = {
            position: 'relative',
            width: '1px',
            height: '1px',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.2s ease-out',
        };

        let modelContent: React.ReactNode = null;

        switch (shape.name) {
            case 'Cube': {
                const s = scale(v('s', 80), 100);
                const halfS = s / 2;
                const faces = [
                    { transform: `rotateY(0deg) translateZ(${halfS}px)` }, // front
                    { transform: `rotateY(180deg) translateZ(${halfS}px)` }, // back
                    { transform: `rotateY(90deg) translateZ(${halfS}px)` }, // right
                    { transform: `rotateY(-90deg) translateZ(${halfS}px)` }, // left
                    { transform: `rotateX(90deg) translateZ(${halfS}px)` }, // top
                    { transform: `rotateX(-90deg) translateZ(${halfS}px)` }, // bottom
                ];
                modelContent = (
                    <>
                        {faces.map((face, i) => (
                            <motion.div key={i} style={{ ...faceBaseStyle, width: s, height: s, ...face }} 
                                initial={{ opacity:0, transform: `${face.transform} scale(0)` }}
                                animate={{ opacity:1, transform: `${face.transform} scale(1)` }}
                                transition={{ delay: i * 0.05 }}
                            />
                        ))}
                    </>
                );
                break;
            }
            case 'Rectangular Prism': {
                const l = scale(v('l', 80), 100);
                const h = scale(v('h', 60), 100);
                const w = scale(v('w', 50), 100);
                const halfL = l / 2, halfH = h / 2, halfW = w / 2;
                const faces = [
                    { style: { width: l, height: h, transform: `translateZ(${halfW}px)` } }, // front
                    { style: { width: l, height: h, transform: `rotateY(180deg) translateZ(${halfW}px)` } }, // back
                    { style: { width: w, height: h, transform: `rotateY(90deg) translateZ(${halfL}px)` } }, // right
                    { style: { width: w, height: h, transform: `rotateY(-90deg) translateZ(${halfL}px)` } }, // left
                    { style: { width: l, height: w, transform: `rotateX(90deg) translateZ(${halfH}px)` } }, // top
                    { style: { width: l, height: w, transform: `rotateX(-90deg) translateZ(${halfH}px)` } }, // bottom
                ];
                modelContent = (
                    <>
                       {faces.map((face, i) => <div key={i} style={{ ...faceBaseStyle, ...face.style }} />)}
                    </>
                );
                break;
            }
             case 'Square Pyramid': {
                const b = scale(v('b', 80), 100);
                const h = scale(v('h', 90), 100);
                const slantHeight = Math.sqrt(h * h + (b / 2) * (b / 2));
                const angle = Math.atan(h / (b/2)) * (180/Math.PI);

                modelContent = (
                    <>
                        {/* Base */}
                        <div style={{ ...faceBaseStyle, width: b, height: b, transform: `translateY(${h/2}px) rotateX(90deg)` }} />
                        {/* Sides */}
                        {[0, 90, 180, 270].map(rotY => (
                             <div key={rotY} style={{
                                ...faceBaseStyle,
                                width: b,
                                height: slantHeight,
                                transformOrigin: 'top center',
                                transform: `rotateY(${rotY}deg) translateY(-${h/2}px) rotateX(${90-angle}deg)`,
                                clipPath: 'polygon(50% 0, 0 100%, 100% 100%)'
                             }}/>
                        ))}
                    </>
                );
                break;
            }
            case 'Sphere': {
                const r = scale(v('r', 50), 50);
                const numRings = 10;
                modelContent = (
                    <>
                        {Array.from({length: numRings}).map((_, i) => {
                             const style: React.CSSProperties = {
                                ...faceBaseStyle,
                                background: 'transparent',
                                width: r*2, height: r*2, borderRadius: '50%',
                                transform: `rotateY(${i * (180/numRings)}deg)`
                            };
                            return <div key={i} style={style} />;
                        })}
                    </>
                );
                break;
            }
             case 'Cylinder': {
                const r = scale(v('r', 40), 50);
                const h = scale(v('h', 90), 100);
                const numFaces = 20;

                modelContent = (
                    <>
                        {/* Top and Bottom */}
                        <div style={{...faceBaseStyle, width: r*2, height: r*2, borderRadius: '50%', transform: `translateY(-${h/2}px) rotateX(90deg)` }} />
                        <div style={{...faceBaseStyle, width: r*2, height: r*2, borderRadius: '50%', transform: `translateY(${h/2}px) rotateX(-90deg)` }} />
                        {/* Sides */}
                        {Array.from({length: numFaces}).map((_, i) => {
                             const angle = (i / numFaces) * 360;
                             return <div key={i} style={{
                                ...faceBaseStyle,
                                background: `rgba(34, 211, 238, ${0.1 + (Math.sin(angle * Math.PI/180) * 0.05)})`,
                                width: (Math.PI * r * 2) / numFaces + 1,
                                height: h,
                                transform: `rotateY(${angle}deg) translateZ(${r}px)`,
                             }} />;
                        })}
                    </>
                );
                break;
            }
            case 'Cone': {
                const r = scale(v('r', 40), 50);
                const h = scale(v('h', 90), 100);
                const numFaces = 20;
                const slantHeight = Math.sqrt(r*r + h*h);
                
                modelContent = (
                     <>
                        {/* Base */}
                        <div style={{...faceBaseStyle, width: r*2, height: r*2, borderRadius: '50%', transform: `translateY(${h/3}px) rotateX(90deg)` }} />
                        {/* Sides */}
                         {Array.from({length: numFaces}).map((_, i) => {
                             const angle = (i / numFaces) * 360;
                             const triangleWidth = (Math.PI * r * 2) / numFaces;
                             return <div key={i} style={{
                                ...faceBaseStyle,
                                width: triangleWidth + 1,
                                height: slantHeight,
                                transformOrigin: 'top center',
                                transform: `translateY(-${h*2/3}px) rotateY(${angle}deg) translateZ(${r}px) rotateX(${Math.atan(r/h)*180/Math.PI}deg)`,
                                clipPath: 'polygon(50% 0, 0 100%, 100% 100%)',
                             }} />;
                        })}
                     </>
                );
                break;
            }
            case 'Torus': {
                const R = scale(v('R', 45), 50); // Major radius
                const r = scale(v('r', 15), 50); // Minor radius
                const numSegments = 24;
                const segmentAngle = 360 / numSegments;
                const segmentLength = (Math.PI * 2 * R) / numSegments;
                 
                modelContent = (
                     <>
                        {Array.from({length: numSegments}).map((_, i) => {
                            const angle = i * segmentAngle;
                            return (
                                <div key={i} style={{
                                    ...faceBaseStyle,
                                    width: r*2,
                                    height: r*2,
                                    borderRadius: '50%',
                                    transform: `rotateY(${angle}deg) translateZ(${R}px) rotateY(90deg)`,
                                }} />
                            );
                        })}
                     </>
                );
                break;
            }
        }

        return (
            <div style={sceneStyle}>
                <motion.div style={modelStyle}
                    key={shape.name} // Remount on shape change for animations
                    initial={{ scale: 0, rotateY: -90 }}
                    animate={{ scale: 1, rotateY: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                    {modelContent}
                </motion.div>
            </div>
        );
    }
    
    return shape.dimension === '2D' ? render2DShape() : render3DShape();
};

export default InteractiveShape;
