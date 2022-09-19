import React from "react";
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from './ImagePopup.js'

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  return (
    <div className="body">
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick} />
        <Footer />
        <PopupWithForm name='edit-profile' title='Редактировать профиль' buttonSubmitText='Сохранить' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <input type="text" name="name" defaultValue="Жак-Ив Кусто" id="name" className="input input_type_name"
            required minLength="2" maxLength="40" />
          <span id="name-error" className="popup__error"></span>
          <input type="text" name="about" defaultValue="Исследователь океана" id='about'
            className="input input_type_about" required minLength="2" maxLength="200" />
          <span id="about-error" className="popup__error"></span>
        </PopupWithForm>
        <PopupWithForm name='add-place' title='Новое место' buttonSubmitText='Создать' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <input type="text" name="name" placeholder="Название" id="place" className="input input_type_place"
            required minLength="2" maxLength="30" />
          <span id="place-error" className="popup__error"></span>
          <input type="url" name="link" placeholder="Ссылка на картинку" id="link"
            className="input input_type_link" required />
          <span id="link-error" className="popup__error"></span>
        </PopupWithForm>
        <PopupWithForm name='delete-confirm' title='Вы уверены?' buttonSubmitText='Да' onClose={closeAllPopups} />
        <PopupWithForm name='change-avatar' title='Обновить аватар' buttonSubmitText='Сохранить' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <input type="url" name="avatar" placeholder="Ссылка на картинку" id="avatar"
            className="input input_type_avatar" required />
          <span id="avatar-error" className="popup__error"></span>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </div>
  );
}

export default App;