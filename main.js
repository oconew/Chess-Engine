

const game = new Chess()

function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}

let onDragStart = function (source, piece, position, orientation) {
    if (game.in_checkmate() === true || game.in_draw() === true ||
        piece.search(/^b/) !== -1) {
        return false;
    }
};

let onDrop = function (source, target) {

    let move = game.move({
        from: source,
        to: target,
        promotion: 'q'
    });

    removeGreySquares();
    if (move === null) {
        return 'snapback';
    }

    // renderMoveHistory(game.history());
    window.setTimeout(makeBestMove, 250);
};

let onSnapEnd = function () {
    board.position(game.fen());
};

let onMouseoverSquare = function(square, piece) {
    let moves = game.moves({
        square: square,
        verbose: true
    });

    if (moves.length === 0) return;

    greySquare(square);

    for (let i = 0; i < moves.length; i++) {
        greySquare(moves[i].to);
    }
};

let onMouseoutSquare = function(square, piece) {
    removeGreySquares();
};

let removeGreySquares = function() {
    $(document.getElementsByClassName('square-55d63')).css('background', '');
};

let greySquare = function(square) {
    let squareEl = document.getElementsByClassName('square-' + square)[0];
    let background = '#a9a9a9';
    if (hasClass(squareEl, 'black-3c85d') === true) {
        background = '#696969';
    }

    $(squareEl).css('background-color', background);
};


let cfg = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onMouseoutSquare: onMouseoutSquare,
    onMouseoverSquare: onMouseoverSquare,
    onSnapEnd: onSnapEnd
};

let board = Chessboard('board1', cfg)
