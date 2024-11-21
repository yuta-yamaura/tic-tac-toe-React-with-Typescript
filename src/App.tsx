import React, { useState } from "react";
import { Button, Modal } from "antd";

type Player = "X" | "O" | null;

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null)); // 配列を９つ用意
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X"); // 最初のターンをXに設定
  const [winner, setWinner] = useState<Player>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 勝利パターン
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // 勝者のチェック
  const checkWinner = (board: Player[]): Player | null => {
    for (let patern of winPatterns) {
      const [a, b, c] = patern;
      // 条件式を使って勝者がいるかチェックする
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        // 勝者をreturnで返す
        return board[a];
      }
    }
    return null;
  };

  // セルがクリックされた時の処理
  const handleClick = (index: number) => {
    if (board[index] || winner) {
      return;
    }

    const newBorad = [...board]; // 既存の配列をコピーしてnewBoradに代入
    newBorad[index] = currentPlayer; // プレイヤーの値をnewBorad配列のインデックスに格納
    setBoard(newBorad); // コピーしたboardをsetBoardの更新式で更新

    const detectedWinner = checkWinner(newBorad);
    // ターンの切り替え
    if (detectedWinner) {
      setWinner(detectedWinner);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  // ゲームのリセット
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>React + TypeScript Tic Tac Toe</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gap: "5px",
          justifyContent: "center",
        }}
      >
        {board.map((cell, index) => (
          <div
            key={index}
            style={{
              width: "100px",
              height: "100px",
              border: "1px solid black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "24px",
              cursor: "pointer",
              backgroundColor: cell ? "#f0f0f0" : "#fff",
            }}
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      {winner && (
        <div>
          <h2>{winner} wins!</h2>
          <Button onClick={showModal} type="primary" danger>
            Open Modal
          </Button>
          <Modal
            title="Play again?"
            open={isModalOpen}
            onOk={resetGame}
            onCancel={handleCancel}
          >
            <p>test test test</p>
            <p>test test test</p>
            <p>test test test</p>
          </Modal>
        </div>
      )}
      {!winner && board.every((cell) => cell) && (
        <div>
          <h2>It's a draw!</h2>
          <Button onClick={resetGame} type="primary">
            Play Again
          </Button>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
