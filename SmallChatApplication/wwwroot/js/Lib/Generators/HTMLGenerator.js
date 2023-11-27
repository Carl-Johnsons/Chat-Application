export default class HTMLGenerator {
    constructor() {

    }
    static generateElement(elementName, className) {
        let divElement = document.createElement(elementName);
        divElement.className = className;
        return divElement;
    }
}