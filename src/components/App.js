import React from "react";
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';

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
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
          isEditAvatarPopupOpen={isEditAvatarPopupOpen} isEditProfilePopupOpen={isEditProfilePopupOpen} isAddPlacePopupOpen={isAddPlacePopupOpen} onClose={closeAllPopups} card={selectedCard} onCardClick={handleCardClick} />
        <Footer />
      </div>
    </div>
  );
}

export default App;