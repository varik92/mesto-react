import React from "react";
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js'
import DeleteConfirmPopup from "./DeleteConfirmPopup.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [cardToDelete, setCardToDelete] = React.useState(null);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((res) => res.filter((c) => card._id !== c._id))
      closeAllPopups()
    })
  }

  React.useEffect(() => {
    api.getInitialCards().then((res) => setCards(res)).catch((err) => console.log(err))
  }, [])

  React.useEffect(() => {
    api.getUserInfo().then((res) => {
      setCurrentUser(res)
    }).catch((err) => console.log(err))
  }, [])

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
    setDeletePopupOpen(false)
    setCardToDelete(null);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(userInfo) {
    api.editUserInfo(userInfo).then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    }).catch((err) => console.log(err))
  }

  function handleChangeAvatar(userInfo) {
    api.changeAvatar(userInfo).then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    }).catch((err) => console.log(err))
  }

  function handleAddPlace(newCard) {
    api.addNewCard(newCard).then((res) => {
      setCards([res, ...cards])
      closeAllPopups()
    }).catch((err) => console.log(err))
  }

  function handleConfirmDelete(card) {
    setDeletePopupOpen(true)
    setCardToDelete(card);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleConfirmDelete} />
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
          <DeleteConfirmPopup isOpen={isDeletePopupOpen} onClose={closeAllPopups} onConfirm={handleCardDelete} card={cardToDelete} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleChangeAvatar} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;