const size = 9;
const baseP = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

var m = undefined;
var p = undefined;

// test
const fillTest = () => {
    m[ 0 ][ 1 ] = 1;
    m[ 0 ][ 3 ] = 8;
    m[ 0 ][ 4 ] = 4;
    m[ 0 ][ 5 ] = 5;

    m[ 1 ][ 3 ] = 9;
    m[ 1 ][ 6 ] = 7;
    m[ 1 ][ 8 ] = 8;

    m[ 2 ][ 1 ] = 2;

    m[ 3 ][ 0 ] = 3;
    m[ 3 ][ 7 ] = 8;
    m[ 3 ][ 8 ] = 6;

    m[ 4 ][ 0 ] = 9;
    m[ 4 ][ 8 ] = 1;

    m[ 5 ][ 0 ] = 2;
    m[ 5 ][ 1 ] = 7;
    m[ 5 ][ 8 ] = 9;

    m[ 6 ][ 7 ] = 4;

    m[ 7 ][ 0 ] = 8;
    m[ 7 ][ 2 ] = 2;
    m[ 7 ][ 5 ] = 1;

    m[ 8 ][ 3 ] = 6;
    m[ 8 ][ 4 ] = 7;
    m[ 8 ][ 5 ] = 4;
    m[ 8 ][ 7 ] = 9;
}

const init = () => {
    m = [];
    p = [];
    for ( let i = 0; i < size; i++ ) {
        m[ i ] = [];
        p[ i ] = [];
        for ( let j = 0; j < size; j++ ) {
            m[ i ][ j ] = null;
            p[ i ][ j ] = baseP;
        }
    }
};

const placeNumber = ( x, y, n ) => {
    m[ x ][ y ] = n;
};

const solved = () => {
    let solved = true;
    for ( let i = 0; i < size; i++ ) {
        for ( let j = 0; j < size; j++ ) {
            if ( m[ i ][ j ] == null ) {
                solved = false;
                break;
            }
        }
        if ( !solved ) {
            break;
        }
    }
    return solved;
};

const validLine = ( x ) => {
    return m[ x ].filter( onlyUniqueNotNull ).length == m[ x ].filter( value => value != null ).length;
};

const validColumn = ( y ) => {
    let column = [];
    for ( let i = 0; i < size; i++ ) {
        column.push( m[ i ][ y ] );
    }
    return column.filter( onlyUniqueNotNull ).length == column.filter( value => value != null ).length;
};

const validBlock = ( x, y ) => {
    let minX = 3 * x;
    let minY = 3 * y;
    let maxX = minX + 3;
    let maxY = minY + 3;

    let block = [];
    for ( let i = minX; i < maxX; i++ ) {
        for ( let j = minY; j < maxY; j++ ) {
            block.push( m[ i ][ j ] );
        }
    }
    return block.filter( onlyUniqueNotNull ).length == block.filter( value => value != null ).length;
};

const updateLine = ( x ) => {
    let reUpdate = false;
    let l = [];
    for ( let i = 0; i < size; i++ ) {
        if ( m[ x ][ i ] ) {
            l.push( m[ x ][ i ] );
            p[ x ][ i ] = [];
        }
    }
    for ( let i = 0; i < size; i++ ) {
        p[ x ][ i ] = p[ x ][ i ].filter( value => l.indexOf( value ) < 0 );
    }
    for ( let i = 0; i < size; i++ ) {
        if ( m[ x ][ i ] == null && p[ x ][ i ].length == 1 ) {
            m[ x ][ i ] = p[ x ][ i ][ 0 ];
            reUpdate = true;
        }
    }
    if ( !validLine( x ) ) {
        console.error( 'Invalid line' );
        console.error( m );
        process.exit( 1 );
    }
    if ( reUpdate ) {
        updateLine( x );
    }
};

const updateColumn = ( y ) => {
    let reUpdate = false;
    let l = [];
    for ( let i = 0; i < size; i++ ) {
        if ( m[ i ][ y ] ) {
            l.push( m[ i ][ y ] );
            p[ i ][ y ] = [];
        }
    }
    for ( let i = 0; i < size; i++ ) {
        p[ i ][ y ] = p[ i ][ y ].filter( value => l.indexOf( value ) < 0 );
    }
    for ( let i = 0; i < size; i++ ) {
        if ( m[ i ][ y ] == null && p[ i ][ y ].length == 1 ) {
            m[ i ][ y ] = p[ i ][ y ][ 0 ];
            reUpdate = true;
        }
    }
    if ( !validColumn( y ) ) {
        console.error( 'Invalid column' );
        console.error( m );
        process.exit( 1 );
    }
    if ( reUpdate ) {
        updateColumn( y );
    }
};

const updateBlock = ( x, y ) => {
    let minX = 3 * x;
    let minY = 3 * y;
    let maxX = minX + 3;
    let maxY = minY + 3;

    let reUpdate = false;
    let l = [];
    for ( let i = minX; i < maxX; i++ ) {
        for ( let j = minY; j < maxY; j++ ) {
            if ( m[ i ][ j ] ) {
                l.push( m[ i ][ j ] );
                p[ i ][ j ] = [];
            }
        }
    }
    for ( let i = minX; i < maxX; i++ ) {
        for ( let j = minY; j < maxY; j++ ) {
            p[ i ][ j ] = p[ i ][ j ].filter( value => l.indexOf( value ) < 0 );
        }
    }
    for ( let i = minX; i < maxX; i++ ) {
        for ( let j = minY; j < maxY; j++ ) {
            if ( m[ i ][ j ] == null && p[ i ][ j ].length == 1 ) {
                m[ i ][ j ] = p[ i ][ j ][ 0 ];
                reUpdate = true;
            }
        }
    }
    if ( !validBlock( x, y ) ) {
        console.error( 'Invalid block' );
        console.error( m );
        process.exit( 1 );
    }
    if ( reUpdate ) {
        updateBlock( x, y );
    }
};

const searchNewValueBlock = ( x, y ) => {
    let minX = 3 * x;
    let minY = 3 * y;
    let maxX = minX + 3;
    let maxY = minY + 3;

    for ( let i = minX; i < maxX; i++ ) {
        for ( let j = minY; j < maxY; j++ ) {
            let pLocal = p[ i ][ j ];

            for ( let k = minX; k < maxX; k++ ) {
                for ( let l = minY; l < maxY; l++ ) {
                    if ( i != k || j != l ) {
                        pLocal = pLocal.filter( value => p[ k ][ l ].indexOf( value ) < 0 );
                    }
                }
            }

            if ( pLocal.length == 1 ) {
                m[ i ][ j ] = pLocal[ 0 ];
                p[ i ][ j ] = [];
            }
        }
    }
};

function onlyUniqueNotNull ( value, index, self ) {
    return value != null && self.indexOf( value ) === index;
}

const printBoard = () => {
    for ( let i = 0; i < size; i++ ) {
        let line = '';
        for ( let j = 0; j < size; j++ ) {
            line += '' + ( m[ i ][ j ] ? m[ i ][ j ] : ' ' ) + ' | ';
        }
        console.log( line );
        if ( ( i + 1 ) % 3 ) {
            console.log( '------------------------------------' );
        } else {
            console.log( '====================================' );
        }
    }
    console.log();
}

const validGame = () => {
    for ( let i = 0; i < size; i++ ) {
        if ( !validLine( i ) ) {
            console.error( 'Invalid line: ' + ( i + 1 ) );
            return false;
        }
    }
    for ( let i = 0; i < size; i++ ) {
        if ( !validColumn( i ) ) {
            console.error( 'Invalid column: ' + ( i + 1 ) );
            return false;
        }
    }
    for ( let i = 0; i < 3; i++ ) {
        for ( let j = 0; j < 3; j++ ) {
            if ( !validBlock( i, j ) ) {
                console.error( 'Invalid block: ' + ( i + 1 ) + ', ' + j + 1 );
                return false;
            }
        }
    }
    return true;
}

const resolve = () => {
    while ( !solved() ) {
        for ( let i = 0; i < size; i++ ) {
            updateLine( i );
            updateColumn( i );
            if ( i < 3 ) {
                for ( let j = 0; j < 3; j++ ) {
                    updateBlock( i, j );
                    searchNewValueBlock( i, j );
                }
            }
        }
        printBoard();
    }
    if ( validGame() ) {
        console.log( 'Sudoku resolvido' )
    } else {
        console.error( 'Sudoku inválido' )
    }

    process.exit( 0 );
};

const main = () => {
    init();
    fillTest();
    resolve();
}

// Execute
main();
