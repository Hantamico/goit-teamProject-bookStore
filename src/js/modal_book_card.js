import axios from 'axios';
import { FetchBooks } from './fetchBooks';
import photoAmazon from '../images/amazon_x3.png';
import photoAppleBook from '../images/white_book_x3.png';
import photoBlackBook from '../images/black_book_x3.png';

const modal = document.querySelector('.modal');
const modalMarkup = document.querySelector('.modal-markup');
const addbook = document.querySelector('.addbook');
const backdrop = document.getElementById('backdrop');
const closeModalBtn = document.querySelector('.modal-book-close');
let idbook;
let titleBook;
let descrBook;
// let addDesc;

let storageBooks = JSON.parse(localStorage.getItem('bookInfo')) || []

async function getBooks(id) {
  try {
    const response = await axios.get(
      `https://books-backend.p.goit.global/books/${id}`
    );
    console.log(response.data);
    booksCard(response.data);
    modal.classList.remove('hidden');
    backdrop.classList.add('backdrop_open');
    backdrop.classList.remove('visually-hidden');
    document.removeEventListener('click', onBookClick);

    const colorTheme = localStorage.getItem('theme');
    titleBook = document.querySelector('.book-title');
    descrBook = document.querySelector('.book-descr');
    // addDesc = document.querySelector('.add-book-info')

    if (colorTheme === 'dark') {
      modal.classList.remove('modal');
      modal.classList.add('modal-dark');

      addbook.classList.remove('addbook');
      addbook.classList.add('addbook-dark');

      titleBook.classList.remove('book-title');
      titleBook.classList.add('book-title-dark');

      descrBook.classList.remove('book-descr');
      descrBook.classList.add('book-descr-dark');

      // addDesc.classList.remove('add-book-info');
      // addDesc.classList.add('add-book-info-dark');

      closeModalBtn.classList.remove('modal-book-close');
      closeModalBtn.classList.add('modal-book-close-dark');
    } 
    else if (colorTheme === 'light') {
      modal.classList.remove('modal-dark');
      modal.classList.add('modal');

      addbook.classList.remove('addbook-dark');
      addbook.classList.add('addbook');

      titleBook.classList.remove('book-title-dark');
      titleBook.classList.add('book-title');

      descrBook.classList.remove('book-descr-dark');
      descrBook.classList.add('book-descr');

      // addDesc.classList.remove('add-book-info-dark');
      // addDesc.classList.add('add-book-info');

      closeModalBtn.classList.remove('modal-book-close-dark');
      closeModalBtn.classList.add('modal-book-close');
    }



    return response.data;
  } catch (error) {
    console.log(error);
  }
}


function onBookClick(event) {
  const bookCard = event.target;
  const id =
    bookCard.parentNode.parentNode.parentNode.parentNode.getAttribute(
      'data-book-id'
    );
  getBooks(id);
}

document.addEventListener('click', onBookClick);

addbook.addEventListener('click', () => {
  changeBtn();
  addLocalStor();
});

async function getBookinModal(id) {
  try {
    const response = await axios.get(`https://books-backend.p.goit.global/books/${id}`);

    idbook = document.querySelector('.idbook');
    const id2 = idbook.textContent;
    // const bookInfo = localStorage.getItem('bookInfo');

    const bookInfo = JSON.parse(localStorage.getItem('bookInfo') || '[]');
    // console.log(bookInfo);

    addbook.addEventListener('click', () => {
   
      const index = bookInfo.findIndex(book => id === book._id);
      localStorage.setItem('bookInfo', JSON.stringify(bookInfo));
    if (addbook.classList.contains('remove')) {
        if (index === -1) {
          bookInfo.push(response.data);
          localStorage.setItem('bookInfo', JSON.stringify(bookInfo))
        }
      } else if (addbook.classList.contains('add')) {
        if (index !== -1)
          bookInfo.splice(index, 1)
        localStorage.setItem('bookInfo', JSON.stringify(bookInfo))
      }
    })
  }
  catch (error) {
    console.log(error);
  };
}


function addLocalStor() {
  idbook = document.querySelector('.idbook');
  const id = idbook.textContent;

  getBookinModal(id);
}

function changeBtn() {

  if (addbook.textContent === 'add to shoping list') {
    setTimeout(() => {
      addbook.textContent = 'remove from the shopping list';
    }, 150);
    addbook.classList.remove('add');
    addbook.classList.add('remove');
    addbook.classList.add('addbook-change-size');
    modal.classList.add('modal-change-size');
    const text = document.createElement('p');
    text.textContent =
      'Сongratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”.';
    text.classList.add('add-book-info');
    modal.appendChild(text);
  } else if (addbook.textContent === 'remove from the shopping list') {
    addbook.textContent = 'add to shoping list';
    addbook.classList.add('add');
    addbook.classList.remove('remove');
    addbook.classList.remove('addbook-change-size');
    modal.classList.remove('modal-change-size');
    const p = document.querySelector('.add-book-info');
    p.remove();
  }
}

closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
  backdrop.classList.remove('backdrop_open');
  backdrop.classList.add('visually-hidden');
  document.addEventListener('click', onBookClick);
  modalMarkup.innerHTML = '';
  addbook.textContent = 'add to shoping list';
  const p = document.querySelector('.add-book-info');
  p.remove();
  modal.classList.remove('modal-change-size');
});

function closeModal(event) {
  if (event.key === 'Escape' || event.target === backdrop) {
    modal.classList.add('hidden');
    backdrop.classList.remove('backdrop_open');
    backdrop.classList.add('visually-hidden');
    document.addEventListener('click', onBookClick);
    modalMarkup.innerHTML = '';
    addbook.textContent = 'add to shoping list';
    const p = document.querySelector('.add-book-info');
    p.remove();
    modal.classList.remove('modal-change-size');
  }
}
document.addEventListener('keydown', closeModal);

document.addEventListener('click', closeModal);

function booksCard(book) {
  const markup = `<div class='book-card'>
    <img class="book-img" src="${book.book_image}"  alt="photo_of_book " loading="lazy">
    <h2 class="book-title">${book.title}</h2>
    <p class="book-author">${book.author}</p>
    <p class="book-descr">${book.description}</p>
    <p class="idbook">${book._id}</p>
    <ul class="online-shops-list">
    <li class="online-shops-item"><a target="_blank" rel="noopener noreferrer" href="${book.buy_links[0].url}"><img src="${photoAmazon}" width="62px" heigth="19px"/></a></li>
    <li class="online-shops-item"><a target="_blank" rel="noopener noreferrer" href="${book.buy_links[1].url}"><img src="${photoAppleBook}" width="32px" heigth="32px"/></a></li>
    <li class="online-shops-item"><a target="_blank" rel="noopener noreferrer" href="${book.buy_links[4].url}"><img src="${photoBlackBook}" width="38px" heigth="36px"/></a></li>    
    </ul>
    </div>`;
  return modalMarkup.insertAdjacentHTML('afterbegin', markup);
}

export { booksCard };
