export default function Card({ card, onCardClick }) {
    function handleClick() {
        onCardClick(card);
    }
    return (
        <li className="element">
            <img src={card.link} alt={card.name} className="element__image" onClick={handleClick} />
            <div className="element__content">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-container">
                    <button type="button" className="element__like-button"></button>
                    <span className="element__like-count">{card.likes.length}</span>
                </div>
            </div>
            <button type="button" className="element__delete-button"></button>
        </li>
    )
}