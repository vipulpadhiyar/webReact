/**
 * Represents a utility class for managing loaders.
 * @class Loader
 *
 * @exports default - Default export of the Loader class.
 */
export default class Loader {
  /**
   * Private static property to store the loader instance.
   * @static
   * @type {any}
   */
  private static _loader: any;

  /**
   * Sets the loader instance.
   * @static
   * @param {any} loader - Loader instance to set.
   */
  static setLoader(loader: any): void {
    Loader._loader = loader;
  }

  /**
   * Gets the loader instance.
   * @static
   * @returns {any} - Loader instance.
   */
  static getLoader(): any {
    return Loader._loader;
  }

  /**
   * Shows the loader.
   * @static
   */
  static showLoader(): void {
    Loader._loader.showLoader();
  }

  /**
   * Hides the loader.
   * @static
   */
  static hideLoader(): void {
    Loader._loader.hideLoader();
  }
}
