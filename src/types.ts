import React from 'react';

export interface TypographyProps {
  id?: string;
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  ['aria-label']?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HTMLSpanProps extends React.DOMAttributes<HTMLSpanElement> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TextProps extends TypographyProps {}

interface BaseParseShape extends TextProps {
  onClick?: (text: string, index: number) => void;
   /** arbitrary function to rewrite the matched string into something else */
  renderText?: (matchingString: string, matches: string[]) => string;
}
/**
 * If you want to provide a custom regexp, this is the configuration to use.
 * -- For historical reasons, all regexps are processed as if they have the global flag set.
 * -- Use the nonExhaustiveModeMaxMatchCount property to match a limited number of matches.
 */
export interface CustomParseShape extends BaseParseShape {
  type?: 'url' | 'phone' | 'email';
  pattern?: string | RegExp;
  /**
   * Enables "non-exhaustive mode", where you can limit how many matches are found.
   *
   * If you want to match at most N things per-call to parse(), provide a positive number here.
   */
  nonExhaustiveModeMaxMatchCount?: number;
  style?: React.CSSProperties;
}

export type ParseShape = CustomParseShape;


export interface ParsedTextProps extends TypographyProps {
  children: string;
  parse?: ParseShape[];
  style?: React.CSSProperties;
  childrenProps?: TextProps;
}