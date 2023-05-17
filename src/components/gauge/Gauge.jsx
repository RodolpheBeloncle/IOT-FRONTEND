import React from 'react';
import './gauge.css';
import { arc } from 'd3-shape';
import { scaleLinear } from 'd3-scale';

const getCoordsOnArc = (angle, offset = 10) => [
  Math.cos(angle - Math.PI / 2) * offset,
  Math.sin(angle - Math.PI / 2) * offset,
];
const Gauge = ({ value = 50, min, max, label, unit }) => {
  const formattedValue = `${value}${unit}`;
  // NB : OuterRadius === thikness gauge
  const backgroundArc = arc()
    .innerRadius(0.65)
    .outerRadius(0.55)
    .startAngle(-Math.PI / 2)
    .endAngle(Math.PI / 2)
    .cornerRadius(1)();

  // gauge range
  const percentScale = scaleLinear().domain([0, 100]).range([0, 1]);
  const percent = percentScale(value);
  const angleScale = scaleLinear()
    .domain([0, 1])
    .range([-Math.PI / 2, Math.PI / 2])
    .clamp(true);
  const angle = angleScale(percent);

  const filledArc = arc()
    .innerRadius(0.65)
    .outerRadius(0.555)
    .startAngle(-Math.PI / 2)
    .endAngle(angle)
    .cornerRadius(1)();

  // == background color shade  ==
  const colorScale = scaleLinear()
    .domain([parseInt(min), parseInt(max)])
    .range(['#dbdbe7', 'red']);
  const gradientSteps = colorScale.ticks(10).map((value) => colorScale(value));
  const markerLocation = getCoordsOnArc(angle, 1 - (1 - 0.65) / 2);
  return (
    <div>
      <svg
        style={{ overflow: 'visible' }}
        width="200px"
        //Position of the gauge inside box
        viewBox={[-1, -1, 2, 1].join(' ')}
      >
        <text x="0" y="-0.1" textAnchor="middle" fontSize="0.28px">
          {formattedValue}
        </text>
        <text x="-0.8" y="-0.1" textAnchor="start" fontSize="0.15px">
          {min}
        </text>
        <text x="0.95" y="-0.1" textAnchor="end" fontSize="0.15px">
          {max}
        </text>
        <defs>
          <linearGradient
            id="Gauge__gradient"
            gradientUnits="userSpaceOnUse"
            x1="-1"
            x2="1"
            y2="0"
          >
            {gradientSteps.map((color, index) => (
              <stop
                key={color}
                stopColor={color}
                offset={`${index / (gradientSteps.length - 1)}`}
              />
            ))}
          </linearGradient>
        </defs>
        <path d={backgroundArc} fill="#ffff" />
        <path d={filledArc} fill="url(#Gauge__gradient)" />
        // == line target progress ==
        {/* <line y1="0" y2="-0.65" stroke="white" strokeWidth="0.027" /> */}
        // == circle indicator ==
        {/* <circle
          cx={markerLocation[0]}
          cy={markerLocation[1]}
          r="0.091"
          stroke="#fff"
          strokeWidth="0.01"
          fill={colorScale(percent)}
        /> */}
        // == target cursor ==
        {/* <path
          d="M0.136364 0.0290102C0.158279 -0.0096701 0.219156 -0.00967009 0.241071 0.0290102C0.297078 0.120023 0.375 0.263367 0.375 0.324801C0.375 0.422639 0.292208 0.5 0.1875 0.5C0.0852272 0.5 -1.8346e-08 0.422639 -9.79274e-09 0.324801C0.00243506 0.263367 0.0803571 0.120023 0.136364 0.0290102ZM0.1875 0.381684C0.221591 0.381684 0.248377 0.356655 0.248377 0.324801C0.248377 0.292947 0.221591 0.267918 0.1875 0.267918C0.153409 0.267918 0.126623 0.292947 0.126623 0.324801C0.126623 0.356655 0.155844 0.381684 0.1875 0.381684Z"
          transform={`rotate(${
            angle * (180 / Math.PI)
          }) translate(-0.2, -0.33)`}
          fill="#fff"
        /> */}
      </svg>
    </div>
  );
};
export default Gauge;
