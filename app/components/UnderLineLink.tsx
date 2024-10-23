import React, { ReactNode } from 'react';

interface UnderlineLinkProps {
  text?: string;  // Optional if you're using children for content
  href?: string;  // Optional if you're passing the link as children
  underlineColor?: string;
  children?: ReactNode;  // Add children to accept any React elements inside the component
}

const UnderlineLink: React.FC<UnderlineLinkProps> = ({ text, href, underlineColor, children }) => {
  return (
    <a
      href={href}
      className="underline-hover"
      style={{ '--underline-color': underlineColor } as React.CSSProperties} // apply CSS variable
    >
      {text || children}
    </a>
  );
};

export default UnderlineLink;
