import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryEl = document.querySelector(".gallery");
const imagesMarkup = createItemsMarkup(galleryItems);
galleryEl.insertAdjacentHTML("beforeend", imagesMarkup);

function createItemsMarkup(item) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <ul class="gallery">
      <li>
      <a class="gallery__item" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"        
          alt="${description}"
        />
      </a>
      </li>
     
    </ul>`;
    })
    .join("");
}

galleryEl.addEventListener("click", onGalleryClick);

function onGalleryClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== "IMG") {
    return;
  }
  const dataEl = evt.target.getAttribute("data-source");
  const modalEl = basicLightbox.create(
    `
		<img src="${dataEl}" width="1280">
	`,
    {
      onShow: () => document.body.addEventListener("keydown", closeEsc),
      onClose: () => document.body.removeEventListener("keydown", closeEsc),
    }
  );

  modalEl.show();

  function closeEsc(evt) {
    if (evt.key === "Escape") {
      modalEl.close();
    }
  }
}
