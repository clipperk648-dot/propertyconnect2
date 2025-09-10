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
        // Prevent infinite loop if fallback is missing
        e.currentTarget.onerror = null;
        e.currentTarget.src = "/assets/images/no_image.png";
      }}
      {...props}
    />
  );
}

export default Image;
