type Ratio =
  | '1x1'
  | '4x3'
  | '16x9';
type FontWeightStyle = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

type TextStyle =
  | 'uppercase'
  | 'capitalize'
  | 'underline'
  | 'italic'
  | 'center'
  | 'justify'
  | 'normal'
  | 'right'
  | 'left'
  | 'nowrap';

type ColorStyle =
  | 'white'
  | 'black'
  | 'smokyBlack'
  | 'manatee'
  | 'laSalleGreen'
  | 'crayola'
  | 'eerieBlack'
  | 'stormcloud'
  | 'gunmetal'
  | 'redOrange'
  | 'grayx11';

type LetterSpacing = 's001' | 's002';

type FontFamily = 'Inter';

type GeneralTextStyle = ColorStyle | FontWeightStyle | TextStyle | LetterSpacing | FontFamily;
