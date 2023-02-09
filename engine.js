let getPieceValue = function(piece) {
    // absolute material value of the piece
    let absoluteValue = 0
    // return score of 0 if the given piece is null to avoid throwing TypeError
    if (piece === null) {
        return 0
    }
    // find the appropriate material value of the piece
    switch (piece.type) {
        case 'p':
            absoluteValue = 1
            break;
        case 'n':
            absoluteValue = 1
            break;
        case 'b':
            absoluteValue = 1
            break;
        case 'r':
            absoluteValue = 1
            break;
        case 'q':
            absoluteValue = 1
            break;
        case 'k':
            absoluteValue = 1
            break;
        default:
            return 0
            break;
    }

    // reuturn positive scores for white and negative for black
    return piece.color === 'w' ? absoluteValue : -absoluteValue
}

let getPositionValue = function (piece, position) {
    // return 0 if square is empty
    if (piece === null) {return 0}
    // find the appropriate piece square table
    let pieceSquareTable
    switch (piece.type) {
        case 'p':
            pieceSquareTable = [0,  0,  0,  0,  0,  0,  0,  0,
                50, 50, 50, 50, 50, 50, 50, 50,
                10, 10, 20, 30, 30, 20, 10, 10,
                 5,  5, 10, 25, 25, 10,  5,  5,
                 0,  0,  0, 20, 20,  0,  0,  0,
                 5, -5,-10,  0,  0,-10, -5,  5,
                 5, 10, 10,-20,-20, 10, 10,  5,
                 0,  0,  0,  0,  0,  0,  0,  0
                ]
            break;
        case 'n':
            pieceSquareTable = [50,-40,-30,-30,-30,-30,-40,-50,
                -40,-20,  0,  0,  0,  0,-20,-40,
                -30,  0, 10, 15, 15, 10,  0,-30,
                -30,  5, 15, 20, 20, 15,  5,-30,
                -30,  0, 15, 20, 20, 15,  0,-30,
                -30,  5, 10, 15, 15, 10,  5,-30,
                -40,-20,  0,  5,  5,  0,-20,-40,
                -50,-40,-30,-30,-30,-30,-40,-50]
            break;
        case 'b':
            pieceSquareTable = [-20,-10,-10,-10,-10,-10,-10,-20,
                -10,  0,  0,  0,  0,  0,  0,-10,
                -10,  0,  5, 10, 10,  5,  0,-10,
                -10,  5,  5, 10, 10,  5,  5,-10,
                -10,  0, 10, 10, 10, 10,  0,-10,
                -10, 10, 10, 10, 10, 10, 10,-10,
                -10,  5,  0,  0,  0,  0,  5,-10,
                -20,-10,-10,-10,-10,-10,-10,-20]
            break;
        case 'r':
            pieceSquareTable = [0,  0,  0,  0,  0,  0,  0,  0,
                5, 10, 10, 10, 10, 10, 10,  5,
               -5,  0,  0,  0,  0,  0,  0, -5,
               -5,  0,  0,  0,  0,  0,  0, -5,
               -5,  0,  0,  0,  0,  0,  0, -5,
               -5,  0,  0,  0,  0,  0,  0, -5,
               -5,  0,  0,  0,  0,  0,  0, -5,
                0,  0,  0,  5,  5,  0,  0,  0]
            break;
        case 'q':
            pieceSquareTable = [-20,-10,-10, -5, -5,-10,-10,-20,
                -10,  0,  0,  0,  0,  0,  0,-10,
                -10,  0,  5,  5,  5,  5,  0,-10,
                 -5,  0,  5,  5,  5,  5,  0, -5,
                  0,  0,  5,  5,  5,  5,  0, -5,
                -10,  5,  5,  5,  5,  5,  0,-10,
                -10,  0,  5,  0,  0,  0,  0,-10,
                -20,-10,-10, -5, -5,-10,-10,-20]
            break;
        case 'k':
            pieceSquareTable = [30,-40,-40,-50,-50,-40,-40,-30,
                -30,-40,-40,-50,-50,-40,-40,-30,
                -30,-40,-40,-50,-50,-40,-40,-30,
                -30,-40,-40,-50,-50,-40,-40,-30,
                -20,-30,-30,-40,-40,-30,-30,-20,
                -10,-20,-20,-20,-20,-20,-20,-10,
                 20, 20,  0,  0,  0,  0, 20, 20,
                 20, 30, 10,  0,  0, 10, 30, 20]
            break;
    }

    // return positive scores for white, negative for black
    return piece.color === 'w' ? pieceSquareTable[position] : -pieceSquareTable[position]
}

let minimaxRoot = function(depth, game, isMaximisingPlayer) {
    // build the game tree apply the minimax search algorithm recursively returning the best move

    // generate all possible moves
    let newGameMoves = game.ugly_moves()
    // initialise the best score and best move
    let bestEval = -1000000
    let bestMove

    // iterate through each move from the root node and apply minimax
    for (let i=0; i<newGameMoves.length; i++) {
        let newGameMove = newGameMoves[i]
        game.ugly_move(newGameMove)
        // initially alpha and beta are extremes so they are overwritten
        let value = minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer)
        // undo the move to return to the original game state
        game.undo()
        // if a better move is found save this
        if (value >= bestEval) {
            bestEval = value
            bestMove = newGameMove
        }
    }
    return bestMove
}

let minimax = function(depth, game, alpha, beta, isMaximisingPlayer) {
    // return if the max depth is reached
    if (depth === 0) {return -evaluateBoard(game.board())}

    // black
    if (isMaximisingPlayer) {
        let newGameMoves = game.ugly_moves()
        let bestEval = -1000

        // iterate through all child nodes
        for (let i=0; i<newGameMoves.length; i++) {
            let newGameMove = newGameMoves[i]
            game.ugly_move(newGameMove)
            // recursively apply minimax
            bestEval = Math.max(bestEval, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer))
            // alpha is highest score so far
            alpha = Math.max(alpha, bestEval)
            // restore the game to original state
            game.undo()
            // alpha beta pruning
            if (beta <= alpha) {return bestEval}
            
        }
        return bestEval
    } else {
        let newGameMoves = game.ugly_moves()
        let bestEval = 1000

        // iterate through all child nodes
        for (let i=0; i<newGameMoves.length; i++) {
            newGameMove = newGameMoves[i]
            game.ugly_move(newGameMove)
            // recuresively apply minimax
            bestEval = Math.min(bestEval, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer))
            // beta is lowest score so far
            beta = Math.min(beta, bestEval)
            game.undo()
            // alpha beta pruning
            if (beta <= alpha) {return bestEval}
            
        }
        return bestEval
    }
}

let evaluateBoard = function(board) {
    // Takes the board representation and returns the evaluated score 

    // initial score is 0
    let totalEval = 0
    // iterate through the board and add the value of each piece
    for (let i = 0; i<8; i++) {
        for (let j = 0; j<8; j++) {
            // material evaluation
            totalEval += getPieceValue(board[i][j])
            // positional evaluation
            totalEval += getPositionValue(board[i][j], i*8+(j))
        }
    }
    return totalEval
}

// let calculateBestMove = function(game) {
//     // Applies the minimax search tree to the list of possible moves and returns the move with best evaluation
//     let newGameMoves = game.ugly_moves();
//     let bestMove = null
//     // best eval is initially set to a high negative score
//     let bestEval = -100000

//     // Iterate through each move
//     for (let i=0; i<newGameMoves.length; i++) {
//         let newGameMove = newGameMoves[i]
//         game.ugly_move(newGameMove)
//         let boardValue = -evaluateBoard(game.board())
//         game.undo()
//         if (boardValue > bestEval) {
//             bestEval = boardValue
//             bestMove = newGameMove
//         }
//     }
//     return bestMove
// };


let makeBestMove = function () {
    // Gets the engine's move and applies it to the chessboard.js board 
    // Remove this function to make the engine headless
    let bestMove = getBestMove(game);
    game.ugly_move(bestMove);
    // Apply the move to the chessboard.js board
    board.position(game.fen());
    // renderMoveHistory(game.history());
    if (game.game_over()) {
        alert('Game over');
    }
};

let getBestMove = function (game) {
    // Applies the minimax search tree to the current game state & returns best move
    
    // End game if a player wins or a stalemate is hit
    if (game.game_over()) {
        alert('Game over');
    }
    let bestMove = minimaxRoot(4, game, true);
    return bestMove;
};

