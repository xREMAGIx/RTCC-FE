import DOMPurify from 'dompurify';
import React from 'react';

import mapModifiers from 'utils/functions';

export type Sizes = '14x20' | '16x24' | '12x14';

export type TextStyle = (GeneralTextStyle | Sizes)[];

interface TextProps extends React.HtmlHTMLAttributes<HTMLParagraphElement> {
  modifiers?: TextStyle;
  type?: 'p' | 'span' | 'div';
  content?: string;
}

const Text: React.FC<TextProps> = ({
  modifiers,
  type = 'p',
  content,
  children
}) => {
  const Element = type;
  return content ? (
    <Element
      className={mapModifiers('a-text', modifiers)}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
    />
  ) : (
    <Element className={mapModifiers('a-text', modifiers)}>
      {children}
    </Element>
  );
};

Text.defaultProps = {
  type: 'p',
  modifiers: undefined,
  content: undefined,
};

export default Text;
