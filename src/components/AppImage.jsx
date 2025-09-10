import React from 'react';

function Image({
  src,
  alt = "Image Name",
  className = "",
  ...props
}) {

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        // Prevent infinite loop and use inline SVG fallback
        e.currentTarget.onerror = null;
        const svg = encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">\n' +
          '  <rect width="300" height="200" fill="#f3f4f6"/>\n' +
          '  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#9ca3af" font-family="Inter, Arial" font-size="14">Image unavailable</text>\n' +
          '</svg>'
        );
        e.currentTarget.src = `data:image/svg+xml;charset=utf-8,${svg}`;
      }}
      {...props}
    />
  );
}

export default Image;
