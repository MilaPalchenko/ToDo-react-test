import PropTypes from "prop-types";
import '../styles/ToDo/style.css'
import IconUp from '../assets/arrow-up.png'
import IconDown from '../assets/arrow-down.png'
import IconTrashBin from '../assets/red-trash-can-icon.png'

const TodoItem = ({ item, onDelete, onToggle, onUp, onDown }) => {
    return (
        <li className='text'>
            {" "}
            <input type="checkbox"
                className="checkbox-mark"
                checked={item.completed}
                onChange={() => onToggle(item.id)}
            />

            <span className={item.completed ? "crossed-text" : "text"}>{item.task}</span>

            <button className="move-button"
                onClick={() => onUp(item.id)}>
                <img src={IconUp} alt="down button icon"
                    height="40px"
                />
            </button>
            <button className="move-button"
                onClick={() => onDown(item.id)}>
                <img src={IconDown} alt="down button icon"
                    height="40px"
                />
            </button>
            <button className="delete-button"
                onClick={() => onDelete(item.id)}>
                <img src={IconTrashBin} alt="delete button icon"
                    height="30px" />
            </button>

        </li>
    );
};

TodoItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        task: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired
};

export default TodoItem;