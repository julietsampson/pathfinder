function dijkstra(nodes, start, target, visited, grid) {
    if (!start || !target || start === target) {
        return false;
    }
    nodes[start].distance = 0;
    nodes[start].direction = "right";
    let unvisited = Object.keys(nodes);
    while (unvisited.length) {
        let currNode = closestNode(nodes, unvisited);
        while (currNode.status === "wall" && unvisited.length) {
            currNode = closestNode(nodes, unvisited);
        }
        if (currNode.distance === Infinity) {
            return false;
        }
        visited.push(currNode);
        currNode.status = "visited";
        if (currNode.isEndNode) return "success";
        updateNeighbors(nodes, currNode, grid);
    }
}

function closestNode(nodes, unvisited) {
    let smallestDistance = Infinity;
    let closest = unvisited[0];
    for (let i=0; i<unvisited.length;i++) {
        if (unvisited[i].distance < smallestDistance) {
            smallestDistance = unvisited[i].distance;
            closest = unvisited[i];
        }
    }
    return closest;
}

function updateNeighbors(nodes, currNode, grid) {
    for (let i=0;i<currNode.neighbors.length;i++) {
        col = currNode.neighbors[i].row
        row = currNode.neighbors[i].col
        distance = currNode.neighbors[i].distance
        distance += currNode.distance
        nodes[row][col].distance = distance
        grid[row][col].distance = distance
    }
}