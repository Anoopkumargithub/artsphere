interface GetShadowOffsetsProps {
  distance: number;
  angle: number;
}

export const getShadowOffsets = ({
  distance,
  angle,
}: GetShadowOffsetsProps) => {
  const xOffset = distance * Math.sin((Math.PI * 2 * angle) / 360);
  const yOffset = -distance * Math.cos((Math.PI * 2 * angle) / 360);

  return {
    xOffset,
    yOffset,
  };
};
