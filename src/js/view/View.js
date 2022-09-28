import icons from 'url:../../img/icons.svg'; // parcel 2

export default class View {
  _data;

  /**
   * render the received object to the dom
   * @param {Object | Object[]} data the data to be randered(e.g recipe)
   * @param {boolean}} [render = true] if false create markup string instead of rendering to the dom
   * @returns {undefined | string} A markup string is returned if render = false
   * @this {object } View instance
   * @author Nabin Panthi
   * @todo finish implementation
   */

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup); // putting necessary things
  }
  /*
  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const newMarkup = this._generateMarkup();

    // for comparing markup
    const newDOM = document.createRange().createContextualFragment(newMarkup); // convert string to real dom object newDOM is virtual DOM which is present on the memory not on the page
    const newElements = Array.from(newDOM.querySelectorAll('*')); // nodelist converted to array
    // console.log(newElements); // this contain all the element that are on the newDOM virtual dom
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      console.log(curEl, newEl.isEqualNode(curEl)); // comparing the content of curelement and new element

      // updates change text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // firstchild has text
        // console.log(
        //   '########################',
        //   // newEl.firstChild.nodeValue.trim()
        // );
        curEl.textContent = newEl.textContent; // this will also change the ui so we need a way to change the text only for that there is a property available on node called as nodevalue. if no text in the value of nodevalue than the value will be null and if text then value containt of the text node
      }

      //  we also need to update change attribute
      if (newEl.isEqualNode(curEl)) {
        // console.log(newEl.attributes); // this will give object so change to array so that we can change attributes
        // console.log(Array.from(newEl.attributes));

        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
  */

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // for comparing markup
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // updates change text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      //  we also need to update change attribute
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = ''; // emptying unnecessary things on recipe container
  }

  renderSpinner() {
    const markup = `
          <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
          </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
