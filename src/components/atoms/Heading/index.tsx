import DOMPurify from 'dompurify';
import React from 'react';

import mapModifiers from 'utils/functions';

export type Sizes = '32x42' | '20x30';

export type TextStyle = (GeneralTextStyle | Sizes)[];

interface HeadingProps extends React.HtmlHTMLAttributes<HTMLParagraphElement> {
  modifiers?: TextStyle;
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  content?: string;
}

const Heading: React.FC<HeadingProps> = ({
  modifiers,
  type = 'h2',
  content,
  children
}) => {
  const Element = type;
  return content ? (
    <Element
      className={mapModifiers('a-heading', modifiers)}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
    />
  ) : (
    <Element className={mapModifiers('a-heading', modifiers)}>
      {children}
    </Element>
  );
};

Heading.defaultProps = {
  type: 'h2',
  modifiers: undefined,
  content: undefined,
};

export default Heading;
