import './index.css';

const Card = ({ image, title, author, publishedYear }) => {
    return (
        <li className="card">
            <img src={image} alt={title} className='image'/>
            <h2 className='title'>{title}</h2>
            <p className='author'>Author: {author}</p>
            <p className='year'>published year: {publishedYear}</p>
        </li>
    );
};

export default Card;