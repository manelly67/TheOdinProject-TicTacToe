function Gameboard() {
    rows=3;
    columns=3;
    board=[];
   
    for (let i = 0; i < rows; i++) {
       board[i] = [];
       for (let j = 0; j < columns; j++) {
         board[i].push(Cell());
       }
     };
   
   const getBoard = () => board;
   
   const dropToken = (row,column,player) => {
       
    board[row][column].addToken(player);
    
     };

  const getAvailableCells = () =>{
    let availableCells = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
        const valueOfCell = board[i][j].getValue();
            if (valueOfCell==='-'){
              availableCells = availableCells+1;  
            }else{
             availableCells = availableCells;
            }
    }}
    console.log(availableCells);
	return availableCells;
  }
   
   const printBoard = () => {
       const boardWithCellValues = board.map( (row) => row.map( (cell) => cell.getValue()) );
       console.log(boardWithCellValues);
   };

   const getValueofCell = (row,column) => {
    const valueOfCell = board[row][column].getValue();
    return valueOfCell;
  };
   
   return { getBoard, dropToken ,printBoard, getValueofCell, getAvailableCells};
   
   }
   
   function Cell(){
   
   let value = '-';
   
   const addToken = (player) => {
       value = player;
     };
   
   const getValue = () => value;
   
   return {addToken,getValue};
   
   }
   
   
   function GameController(
       playerOneName = "Player One",
       playerTwoName = "Player Two",
       winner = false,
       tie = false
     ) {
       const board = Gameboard();
     
       const players = [
         {
           name: playerOneName,
           token: 'X'
         },
         {
           name: playerTwoName,
           token: 'O'
         }
       ];
     
/* 
       const updateNames = (name1,indice) => {
       // funcion para actualizar el nombre de los jugadores - pendiente el input
        players[indice].name = name1;
        return players[indice].name;

       }

 */

       let activePlayer = players[0];
       
       const switchPlayerTurn = () => {

        switch (winner) {
            case true:
                /* the player doesnt change */
            activePlayer = activePlayer;                       
            break;
            default:
                    switch (tie) {
                    case true:
                    /* the player doesnt change */
                    activePlayer = activePlayer;                   
                    break;
                    default:
                        /* switch player*/
                     activePlayer = activePlayer === players[0] ? players[1] : players[0];
                    };           
            };           
       };
       const getActivePlayer = () => activePlayer;
       
     
       const printNewRound = () => {
       
		 board.printBoard();
         board.getAvailableCells();
            switch (winner) {
            case true:
                console.log(`${getActivePlayer().name}' is the winner`);  
                message =  getActivePlayer().name + ' is the winner';                      
            break;
            default:
                    switch (tie) {
                    case true:
                        console.log(`It is a tie`);  
                        message = 'It is a tie';              
                    break;
                    default:
                        console.log(`${getActivePlayer().name}'s turn.`);
                        message = 'next move';
                    };           
            };              
       };

       const getGameMessage = () => message;       

       const checkForWinner = () => {
        
        const row0Value = board.getValueofCell(0,0)+board.getValueofCell(0,1)+board.getValueofCell(0,2);
        const row1Value = board.getValueofCell(1,0)+board.getValueofCell(1,1)+board.getValueofCell(1,2);
        const row2Value = board.getValueofCell(2,0)+board.getValueofCell(2,1)+board.getValueofCell(2,2);
        const col0Value = board.getValueofCell(0,0)+board.getValueofCell(1,0)+board.getValueofCell(2,0);
        const col1Value = board.getValueofCell(0,1)+board.getValueofCell(1,1)+board.getValueofCell(2,1);
        const col2Value = board.getValueofCell(0,2)+board.getValueofCell(1,2)+board.getValueofCell(2,2);
        const diag1Value = board.getValueofCell(0,0)+board.getValueofCell(1,1)+board.getValueofCell(2,2);
        const diag2Value = board.getValueofCell(2,0)+board.getValueofCell(1,1)+board.getValueofCell(0,2);
        
        let mensaje ='';
        
        /* chequea por un ganador */
        switch (row0Value) {
          case 'XXX':
          case 'OOO':
            winner = true;
          break;
          default:
                    switch (row1Value) {
                    case 'XXX':
                    case 'OOO':
                     winner = true;
                    break;
                    default:
                            switch (row2Value) {
                            case 'XXX':
                            case 'OOO':
                              winner = true;
                            break;
                            default:
                                    switch (col0Value) {
                                    case 'XXX':
                                    case 'OOO':
                                      winner = true;
                                    break;
                                    default:
                                            switch (col1Value) {
                                            case 'XXX':
                                            case 'OOO':
                                              winner = true;
                                            break;
                                            default:
                                    switch (col2Value) {
                                    case 'XXX':
                                    case 'OOO':
                                     winner = true;               
                                    break;
                                    default:
                        switch (diag1Value) {
                        case 'XXX':
                        case 'OOO':
                        winner = true;                    
                        break;
                        default:
        switch (diag2Value) {
        case 'XXX':
        case 'OOO':
        winner = true;                       
        break;
        default:
            mensaje = 'juega hasta winner = true';
        };       
                            };        
                                    };          
                                          };
                                  };     
                          };
              };
        };

        console.log(row0Value, row1Value, row2Value, col0Value, col1Value, col2Value, diag1Value, diag2Value );
        console.log(mensaje,winner,tie);
  
    };
	
	const checkForTie = () => {
		const disponibles =  board.getAvailableCells();
		const winnerChecked = winner;
		if ( disponibles == 0 && winnerChecked == false){
			tie = true;
		}
		console.log('disponibles ',disponibles, 'chequeo ganador', winnerChecked, 'empate', tie);
	};
	
       
    const resetGame = () => { 
        winner = false;
        tie = false;
        activePlayer = players[0];
        console.log('NEW GAME');
        board.dropToken(0,0,'-');
        board.dropToken(0,1,'-');
        board.dropToken(0,2,'-');
        board.dropToken(1,0,'-');
        board.dropToken(1,1,'-');
        board.dropToken(1,2,'-');
        board.dropToken(2,0,'-');
        board.dropToken(2,1,'-');
        board.dropToken(2,2,'-');
        printNewRound();
     }
      
       const playRound = (row,column) => {

        if ( winner === true || tie === true){ 
            resetGame();
        }else{

            const cellValue = board.getValueofCell(row,column);
            console.log(cellValue);
        
            if (cellValue !=='-'){
                console.log('celda no disponible - seleccione otra ubicacion');
                }else{
                console.log(
                 `Dropping ${getActivePlayer().name}'s token into row ${row} column ${column}...`
                 );
                 board.dropToken(row,column, getActivePlayer().token);
     
         /*  This is where we would check for a winner and handle that logic,
             such as a win message. */
         checkForWinner();
		     checkForTie();
         switchPlayerTurn();
         printNewRound();
          }}
       };
     
       printNewRound();
     
       return {
         playRound,
         getActivePlayer,
         getGameMessage,
         resetGame,
         getBoard: board.getBoard
       };
     }
   
     

     function ScreenController() {
        
        const game = GameController();
        
        const playerTurnDiv = document.querySelector('.turn');
        const boardDiv = document.querySelector('.board');
        const resultDiv = document.querySelector('.result');
        
        

        const updateScreen = () => {
  
        // clear the board
        boardDiv.textContent = "";

       

        // get the newest version of the board and player turn
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();
        

        // Display player's turn
        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

      

        // Render board squares
      
       console.log ('filas',rows);
       console.log ('columns',columns);

        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < columns; j++) {
          // Anything clickable should be a button!!
          const cellButton = document.createElement("button");
          cellButton.classList.add("cell");
          // Create a data attribute to identify the column
          // This makes it easier to pass into our `playRound` function 
          cellButton.dataset.row = i;
          cellButton.dataset.column = j; 
          cellButton.textContent = board[i][j].getValue();
          boardDiv.appendChild(cellButton);
      }}

      

        }
 

          // Add event listener for the board
    function clickHandlerBoard(e) {
      const selectedRow = e.target.dataset.row;
      console.log('la fila es',selectedRow);
      const selectedColumn = e.target.dataset.column;
      console.log('la columna es',selectedColumn);
    // Make sure I've clicked a column and not the gaps in between
    if (!selectedRow) return;
    
    game.playRound(selectedRow,selectedColumn);
    getMessage(activeMessage);
    updateScreen();
  }
  boardDiv.addEventListener("click", clickHandlerBoard);

      // add a reset Button and the eventlistener
    const buttonDiv = document.createElement("div");  
    const resetButton = document.createElement("button");
      resetButton.classList.add('resetButton');
      buttonDiv.classList.add('resultButton');
      resetButton.textContent = 'reset game';
      resetButton.addEventListener('click', function(){
        game.resetGame();
        getMessage(activeMessage);
        updateScreen();
      });
      resultDiv.appendChild(buttonDiv);
      buttonDiv.appendChild(resetButton);

     // add a result game

     const resultGameDiv = document.createElement("div");
     resultGameDiv.classList.add('resultMessage');
     const activeMessage = game.getGameMessage();
     
     const getMessage = (activeMessage) => { 
      activeMessage = game.getGameMessage();
      resultGameDiv.textContent = activeMessage.toUpperCase();
      };

     resultDiv.appendChild(resultGameDiv);

    // Initial render
    updateScreen();

  // We don't need to return anything from this module because everything is encapsulated inside this screen controller.


     }

     ScreenController();