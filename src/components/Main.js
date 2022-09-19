import React from "react";
import { api } from '../utils/api.js';
import Card from "./Card.js";

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
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
    }, [])
    React.useEffect(() => {
        api.getInitialCards().then((res) => setCards(res)).catch((err) => console.log(err))
    }, [])

    return (
        <main>
            <section className="profile">
                <div className="profile__main">
                    <div className="profile__avatar-container">
                        <img src={userAvatar} alt="Аватар" className="profile__avatar" />
                        <button className="profile__avatar-edit-button" onClick={onEditAvatar} />
                    </div>
                    <div className="profile__column">
                        <div className="profile__info">
                            <h1 className="profile__name">{userName}</h1>
                            <button type="button" aria-label="Редактировать профиль"
                                className="profile__edit-button" onClick={onEditProfile} />
                        </div>
                        <p className="profile__description">{userDescription}</p>
                    </div>
                </div>
                <button type="button" aria-label="Добавить" className="profile__add-button" onClick={onAddPlace} />
            </section>
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