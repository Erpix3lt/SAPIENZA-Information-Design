import React from 'react';
import Blob from './blob';
import { Keyword } from '../pages/index';
import { Vector3 } from 'three';

interface TimelineProps {
  keywords: Keyword[];
}

const Timeline: React.FC<TimelineProps> = ({ keywords }) => {
  // Sort keywords by Start Year in ascending order
  const sortedKeywords = [...keywords].sort((a, b) => a['Start Year'] - b['Start Year']);

  // Find the earliest Start Year
  const earliestStartYear = sortedKeywords[0]['Start Year'];

  return (
    <group>
      {sortedKeywords.map((keyword, index) => {
        const positionX = (keyword['Start Year'] - earliestStartYear) * 5;
        return (
          <Blob
            key={index}
            position={new Vector3(positionX, 0, index * 3)}
            scale={new Vector3((keyword['End Year'] - keyword['Start Year']) * 0.2, keyword['Usage Rating'], keyword['Usage Rating'])}
          />
        );
      })}
    </group>
  );
};

export default Timeline;