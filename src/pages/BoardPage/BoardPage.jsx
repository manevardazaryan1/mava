import { useEffect, useState } from "react"

import { Header } from "../../components/Header/Header"
import TodoList from "../../components/Todo/TodoList"
import CardModal from "../../components/CardModal/CardModal"

import { useDispatch, useSelector } from "react-redux"
import { addBoard } from "../../redux/slices/boardsSlice"

import "./BoardPage.css"

import { useParams } from "react-router-dom"

import { db } from '../../config/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'


const BoardPage = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const currentBoard = useSelector(state => state.boards.boards);
    const [cardModal, setCardModal] = useState(false);
    const [cardID, setCardId] = useState("");

    useEffect(() => {
        const fetchBoards = async () => {
            const boardsCollection = collection(db, 'boards')
            const snapshot = await getDocs(boardsCollection)
            snapshot.docs.map((doc) => (dispatch(addBoard({ ...doc.data() }))))
        }
        if (!currentBoard.length) fetchBoards()
    }, [currentBoard.length, dispatch])

    const selectedImg = currentBoard.find(board => board.id === id)?.img?.bigImg
    return (
        <>
            <Header type="on-image"/>
            <div style={{ backgroundImage: `linear-gradient(45deg, #2c2c2c47, #3d3d3d40), url(${selectedImg})` }} className="board-list-container">
                <TodoList boardId={id} setCardModal={setCardModal} setCardId={setCardId}/>
            </div>
            {
                cardModal && <CardModal cardID={cardID} setCardId={setCardId} setCardModal={setCardModal}/>
            }
        </>
    )
}

export default BoardPage;

