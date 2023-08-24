import { useCallback } from 'react';
import TextExtraction from './utils/TextExtraction';
import { ParseShape, ParsedTextProps, TextProps } from './types';
import { PATTERNS } from './constants';

export function ParsedText(props: ParsedTextProps) {
  const { children, parse, style: parentStyle, childrenProps, ...remainder } = props;

  const getPatterns = useCallback(() => {
    return parse?.map((option) => {
      const { type, pattern } = option;
      if (type && !pattern) {
        if (!PATTERNS[type]) throw new Error(`${type} is not a supported type`);
        option.pattern = PATTERNS[type];
      }
      return option;
    });
  }, [parse]);

  const getParsedText = useCallback(() => {
    if (!parse) return children;

    if (typeof children !== 'string') return children;

    const textExtraction = new TextExtraction(children, getPatterns());

    return textExtraction.parse().map((props, index) => {
      const { style, ...remainderProps } = props as ParseShape;
      return (
        <span
          key={`parsedText-${index}`}
          style={{ ...parentStyle, ...style }}
          {...childrenProps}
          {...(remainderProps as TextProps)}
        />
      );
    });
  }, [children, childrenProps, getPatterns, parentStyle, parse]);

  return (
    <span style={parentStyle} {...remainder}>
      {getParsedText()}
    </span>
  );
}
