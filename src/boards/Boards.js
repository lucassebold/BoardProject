import { useRef, useState, useEffect } from "react";
import BoardCard from "./BoardCard";
import HeaderBoards from "./HeaderBoards";
import ModalBoard from "./ModalBoard";
import data from "./data";

const Boards = () => {
  // const [boardData, setBoardData] = useState(data);
  const [boardsData, setBoardsData] = useState([]);
  const [boardName, setBoardName] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  let _modalBoard = useRef();

  const openModalCreate = () => {
    _modalBoard.current.show();
  };

  const getBoards = async () => {
    const response = await fetch(`http://localhost:3000/boards`);
    const data = await response.json();
    setBoardsData(data);
  };

  useEffect(() => {
    getBoards();
  }, []);

  const createBoard = async () => {
    const newBoard =
    {
      name: boardName,
      isFavorite
    }
      ;
    const response = await fetch("http://localhost:3000/boards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newBoard)
    });

    const data = await response.json();
    setBoardsData([data, ...boardsData]);

    _modalBoard.current.hide();
  };

  const deleteBoard = async (boardId) => {
    await fetch(`boards/${boardId}`, { method: 'DELETE' });
    console.log(boardId)
    setBoardsData(boardsData.filter((b) => b.id != boardId));
  };

  return (
    <div>
      {
        boardsData.map((item) => (
          <div>
            <BoardCard
              key={item.id}
              item={item}
              deleteBoard={deleteBoard}
            />
          </div>
        ))
      }
      <HeaderBoards openModalCreate={openModalCreate} />
      <ModalBoard
        ref={_modalBoard}
        boardsData={boardsData}
        setBoardsData={setBoardsData}
        setBoardName={setBoardName}
        setIsFavorite={setIsFavorite}
        isFavorite={isFavorite}
        createBoard={createBoard}
      />
    </div>
  );
};

export default Boards;
