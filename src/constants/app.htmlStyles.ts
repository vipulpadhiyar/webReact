import {StyleSheet} from 'react-native';
import {defaultSystemFonts, MixedStyleRecord} from 'react-native-render-html';

import {AppColors} from './app.colors';
import {AppFonts, AppFontSizes} from './app.fonts';

/**
 * Styles for HTML elements used in rendering.
 *
 * This stylesheet defines styles for various HTML tags, including paragraphs, headings, and links.
 * It ensures consistent styling throughout the application by using predefined colors, font sizes,
 * and font families.
 */
export const htmlStyles = StyleSheet.create({
  /**
   * Styles for paragraph elements.
   */
  p: {
    color: AppColors.peanBlue, // Text color for paragraphs
    fontSize: AppFontSizes[16], // Font size for paragraphs
    fontFamily: AppFonts.GentiumBasic_Regular, // Font family for paragraphs
  },
  /**
   * Styles for top-level headings (h1).
   */
  h1: {
    color: AppColors.peanBlue, // Text color for h1 headings
    fontSize: AppFontSizes[24], // Font size for h1 headings
    fontFamily: AppFonts.GentiumBasic_Bold, // Font family for h1 headings
  },
  /**
   * Styles for second-level headings (h2).
   */
  h2: {
    color: AppColors.peanBlue, // Text color for h2 headings
    fontSize: AppFontSizes[20], // Font size for h2 headings
    fontFamily: AppFonts.GentiumBasic_Bold, // Font family for h2 headings
  },
  /**
   * Styles for anchor elements (links).
   */
  a: {
    color: AppColors.peanBlue, // Text color for links
    textDecorationLine: 'underline', // Underline for links
  },
});

/**
 * System fonts to be used in rendering HTML content.
 *
 * This array extends the default system fonts with custom fonts defined in the application.
 */
export const systemFonts = [
  ...defaultSystemFonts, // Include default system fonts
  AppFonts.GentiumBasic_Bold, // Custom bold font
  AppFonts.GentiumBasic_BoldItalic, // Custom bold italic font
  AppFonts.GentiumBasic_Italic, // Custom italic font
  AppFonts.GentiumBasic_Regular, // Custom regular font
];

/**
 * Styles for various HTML tags used in rendering content.
 *
 * This object defines styles for a range of HTML tags, including body, links, paragraphs, lists,
 * and headings. Each tag has specific styles for font family, color, and size to ensure consistent
 * rendering across the application.
 */
export const tagsStyle: MixedStyleRecord = {
  body: {
    color: 'red', // Text color for body
    fontSize: AppFontSizes[15], // Font size for body
    fontFamily: AppFonts.GentiumBasic_Regular, // Font family for body
  },
  a: {
    color: AppColors.peanBlue, // Text color for links
    textDecorationLine: 'underline', // Underline for links
  },
  p: {
    fontFamily: AppFonts.GentiumBasic_Regular, // Font family for paragraphs
    color: AppColors.black, // Text color for paragraphs
    fontSize: AppFontSizes[15], // Font size for paragraphs
    marginBottom: AppFontSizes[10], // Bottom margin for paragraphs
  },
  ul: {
    fontFamily: AppFonts.GentiumBasic_Regular, // Font family for unordered lists
    color: AppColors.black, // Text color for unordered lists
  },
  i: {
    fontFamily: AppFonts.GentiumBasic_Regular, // Font family for italic text
    color: AppColors.black, // Text color for italic text
  },
  b: {
    fontFamily: AppFonts.GentiumBasic_Bold, // Font family for bold text
    color: AppColors.black, // Text color for bold text
  },
  strong: {
    fontFamily: AppFonts.GentiumBasic_Bold, // Font family for strong text
    color: AppColors.black, // Text color for strong text
  },
  u: {
    fontFamily: AppFonts.GentiumBasic_Bold, // Font family for underlined text
    color: AppColors.black, // Text color for underlined text
    textAlign: 'justify', // Justify alignment for underlined text
    textDecorationLine: 'underline', // Underline for text
  },
  img: {display: 'none'}, // Hide images
  em: {
    fontFamily: AppFonts.GentiumBasic_Regular, // Font family for emphasized text
    color: AppColors.black, // Text color for emphasized text
  },
  h1: {
    fontSize: AppFontSizes[18], // Font size for h1 headings
    color: AppColors.black, // Text color for h1 headings
    fontFamily: AppFonts.GentiumBasic_Bold, // Font family for h1 headings
  },
  h2: {
    fontSize: AppFontSizes[16], // Font size for h2 headings
    color: AppColors.black, // Text color for h2 headings
    fontFamily: AppFonts.GentiumBasic_Bold, // Font family for h2 headings
  },
  h3: {
    fontSize: AppFontSizes[14], // Font size for h3 headings
    color: AppColors.black, // Text color for h3 headings
    fontFamily: AppFonts.GentiumBasic_Bold, // Font family for h3 headings
  },
  h4: {
    fontSize: AppFontSizes[12], // Font size for h4 headings
    color: AppColors.black, // Text color for h4 headings
    fontFamily: AppFonts.GentiumBasic_Bold, // Font family for h4 headings
  },
  h5: {
    fontSize: AppFontSizes[10], // Font size for h5 headings
    color: AppColors.black, // Text color for h5 headings
    fontFamily: AppFonts.GentiumBasic_Bold, // Font family for h5 headings
  },
  h6: {
    fontSize: AppFontSizes[8], // Font size for h6 headings
    color: AppColors.black, // Text color for h6 headings
    fontFamily: AppFonts.GentiumBasic_Bold, // Font family for h6 headings
  },
  span: {
    fontFamily: AppFonts.GentiumBasic_Bold, // Font family for span elements
    color: AppColors.black, // Text color for span elements
    marginTop: -AppFontSizes[5], // Negative top margin for span elements
    fontSize: AppFontSizes[22], // Font size for span elements
  },
};

/**
 * Styles for span elements used in rendering content.
 *
 * This object defines styles specifically for span elements, including marker spans. It sets the
 * font family, color, and size to ensure consistent styling within spans.
 */
export const spanStyles: MixedStyleRecord = {
  marker: {
    fontFamily: AppFonts.GentiumBasic_Regular, // Font family for marker spans
    color: AppColors.black, // Text color for marker spans
    backgroundColor: AppColors.yellow, // Background color for marker spans
  },
  span: {
    fontFamily: AppFonts.GentiumBasic_Bold, // Font family for span elements
    color: AppColors.black, // Text color for span elements
    marginTop: -AppFontSizes[5], // Negative top margin for span elements
    fontSize: AppFontSizes[22], // Font size for span elements
  },
};
