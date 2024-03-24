import './CardModal.css'
import { useSelector } from 'react-redux'; 
import CardDescription from './CardDescription';
import logo from "../../images/mava-white.png"

function CardModal({ cardID, setCardModal, setCardId }) {
    const path = window.location.href.split("/");
    const boardId = path[path.length - 1];
    const boardImage  = useSelector((state) => state.boards.boards).filter((board) => board.id === boardId)[0]?.img?.bigImg;

    const closeCardModal = () => {
        document.body.style.overflowY = "scroll";
        setCardModal(() => false);
        setCardId(() => "")
    }
    return (
        <div id="card-modal-block" onClick={() => closeCardModal()} style={{backgroundImage:  `linear-gradient(45deg, rgba(44, 44, 44, 0.28), rgba(61, 61, 61, 0.25)), url(${boardImage})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center"}}>
            <div className="card-modal-header" onClick={(e) => e.stopPropagation()}>
                <div className="card-header">
                    <h3 className="card-header-title">
                        <a href="/" className="st-logo-card-modal">
                            <img src={logo} alt="mava"/>
                        </a>
                    </h3>
                    <button onClick={() => closeCardModal()} className='close-card-modal-btn'><i className="fa-solid fa-xmark"></i></button>
                </div>
            </div>
            <div className="card-modal" onClick={(e) => e.stopPropagation() }> 
                <CardDescription cardID={cardID} setCardModal={setCardModal} setCardId={setCardId}/>
            </div>
        </div>
    )
}

export default CardModal;