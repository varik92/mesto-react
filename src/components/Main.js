import PopupWithForm from "./PopupWithForm";
import React from "react";
import { api } from '../utils/api.js';
import Card from "./Card.js";
import ImagePopup from './ImagePopup.js'

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, onClose, card, onCardClick }) {
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getUserInfo().then((res) => {
            setUserName(res.name)
            setUserDescription(res.about)
            setUserAvatar(res.avatar)
        }).catch((err) => console.log(err))
    })
    React.useEffect(() => {
        api.getInitialCards().then((res) => setCards(res)).catch((err) => console.log(err))
    })

    return (
        <main>
            <section className="profile">
                <div className="profile__main">
                    <div className="profile__avatar-container">
                        <img src={userAvatar} alt="Аватар" className="profile__avatar" />
                        <button className="profile__avatar-edit-button" onClick={onEditAvatar}></button>
                    </div>
                    <div className="profile__column">
                        <div className="profile__info">
                            <h1 className="profile__name">{userName}</h1>
                            <button type="button" aria-label="Редактировать профиль"
                                className="profile__edit-button" onClick={onEditProfile}></button>
                        </div>
                        <p className="profile__description">{userDescription}</p>
                    </div>
                </div>
                <button type="button" aria-label="Добавить" className="profile__add-button" onClick={onAddPlace}></button>
            </section>
            <PopupWithForm name='edit-profile' title='Редактировать профиль' buttonSubmitText='Сохранить' isOpen={isEditProfilePopupOpen} onClose={onClose}>
                <input type="text" name="name" defaultValue="Жак-Ив Кусто" id="name" className="input input_type_name"
                    required minLength="2" maxLength="40" />
                <span id="name-error" className="popup__error"></span>
                <input type="text" name="about" defaultValue="Исследователь океана" id='about'
                    className="input input_type_about" required minLength="2" maxLength="200" />
                <span id="about-error" className="popup__error"></span>
            </PopupWithForm>
            <PopupWithForm name='add-place' title='Новое место' buttonSubmitText='Создать' isOpen={isAddPlacePopupOpen} onClose={onClose}>
                <input type="text" name="name" placeholder="Название" id="place" className="input input_type_place"
                    required minLength="2" maxLength="30" />
                <span id="place-error" className="popup__error"></span>
                <input type="url" name="link" placeholder="Ссылка на картинку" id="link"
                    className="input input_type_link" required />
                <span id="link-error" className="popup__error"></span>
            </PopupWithForm>
            <PopupWithForm name='delete-confirm' title='Вы уверены?' buttonSubmitText='Да' onClose={onClose} />
            <PopupWithForm name='change-avatar' title='Обновить аватар' buttonSubmitText='Сохранить' isOpen={isEditAvatarPopupOpen} onClose={onClose}>
                <input type="url" name="avatar" placeholder="Ссылка на картинку" id="avatar"
                    className="input input_type_avatar" required />
                <span id="avatar-error" className="popup__error"></span>
            </PopupWithForm>
            <ImagePopup card={card} onClose={onClose} />
            <section className="elements">
                <ul className="elements__list">
                    {cards.map((card) => {
                        return (
                            <Card key={card._id} card={card} onCardClick={onCardClick} />
                        )
                    })}
                </ul>
            </section>
        </main >
    )
}