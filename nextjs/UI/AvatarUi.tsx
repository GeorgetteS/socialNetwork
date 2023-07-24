import React, { CSSProperties } from 'react';
import Image from 'next/image';

const AvatarUi = ({
  src,
  alt,
  size = 64,
  className,
  style,
}: {
  src: string;
  alt?: string;
  className: string;
  size?: number;
  style?: CSSProperties;
}) => {
  return (
    <Image
      src={src}
      className={className}
      alt={alt || src}
      width={size}
      height={size}
      style={{ borderRadius: '50%', ...style }}
    />
  );
};

export default AvatarUi;
