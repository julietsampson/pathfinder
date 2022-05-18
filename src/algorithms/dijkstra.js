let node = {
    row: 0,
    col: 0,
    visited: false,
    distance: Infinity,
}

export default function dijkstra(grid, startNode, endNode) {
    const visited = [];
    let unvisited = getAllNodes(grid);
    startNode.distance = 0;
    unvisited[startNode.row][startNode.col] = startNode
    /*
    if (!startNode || !endNode || startNode === endNode) {
        return false;
    } */
    let i = 0;
    while (unvisited.length) {
        sortNodesByDistance(unvisited);
        const currNode = unvisited.shift();
        if (currNode.isWall) {
            console.log("---DIJKSTRA HITS WALL---");
            console.log(currNode.row);
            console.log(currNode.col);
            console.log("------------------------");
            continue;
        }
        //handles situations where there is no possible path to endNode
        if (currNode.distance === Infinity) {
            return visited;
        }
        currNode.visited = true;
        visited.push(currNode);
        if (currNode === endNode) {
            return visited;
        }
        updateNeighbors(currNode, grid);
    }
}

function sortNodesByDistance(unvisited) {
    unvisited.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateNeighbors(node, grid) {
    const neighbors = getNeighbors(node, grid);
    for (const neighbor of neighbors) {
        const distance = node.distance + 1
        if (!neighbor.visited) {
            neighbor.distance = distance;
            neighbor.previous = node;
        }
    }
}

function getNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) {
        neighbors.push(grid[row-1][col]);
    }
    if (row<(grid.length-1)) neighbors.push(grid[row+1][col]);
    if (col > 0) neighbors.push(grid[row][col-1]);
    if (col < (grid[0].length-1)) neighbors.push(grid[row][col+1]);
    return neighbors;
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}