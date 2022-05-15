const node = {
    row,
    col,
    visited,
    distance,
}

function dijkstra(nodes, startNode, endNode, visited, grid) {
    if (!startNode || !endNode || startNode === endNode) {
        return false;
    }
    nodes[startNode].distance = 0;
    const unvisited = nodes.slice();
    while (unvisited.length) {
        sortNodesByDistance(unvisited);
        const currNode = unvisited.unshift();
        //handle walls, nonexistent path, and animation later
        /*
        while (currNode.status === "wall" && unvisited.length) {
            currNode = closestNode(nodes, unvisited);
        }
        */
       /*
        if (currNode.distance === Infinity) {
            return false;
        }
        */
        currNode.visited = true;
        if (currNode === endNode) return "success";
        updateNeighbors(currNode, grid);
    }
}

function sortNodesByDistance(unvisited) {
    unvisited.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateNeighbors(node, grid) {
    const neighbors = getNeighbors(node, grid);
    for (const neighbor of neighbors) {
        distance = node.distance + 1
        if (distance < neighbor.distance) {
            neighbor.distance = distance;
        }
    }
}

function getNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row-1][col]);
    if (row< grid.length-1) neighbors.push(grid[row+1][col]);
    if (col > 0) neighbors.push(grid[row][col-1]);
    if (col < grid[0].length-1) neighbors.push(grid[row][col+1]);
    return neighbors;
}