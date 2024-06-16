// 01 - This query FINDS ALL CHILDREN of the node whose name is given by the "categoryName" parameter
const findChildrenQuery = ` 
MATCH (node:Category {name: $categoryName})-[:HAS_SUBCATEGORY]->(child:Category) 
RETURN child 
ORDER BY child.name ASC 
`;

// 02 - This query COUNTS ALL CHILDREN of the node whose name is given by the "categoryName" parameter
const countChildrenQuery = ` 
MATCH (node:Category {name: $categoryName})-[:HAS_SUBCATEGORY]->(child:Category) 
RETURN COUNT (child) AS childrenCount 
`;

// 03 - This query FINDS ALL GRANDCHILDREN of the node whose name is given by the "categoryName" parameter
const findGrandchildrenQuery = `
MATCH (node:Category {name: $categoryName})-[:HAS_SUBCATEGORY*2]->(grandchild:Category)
RETURN DISTINCT grandchild
ORDER BY grandchild.name ASC
`;

// 04 - This query FINDS ALL PARENTS of the node whose name is given by the "categoryName" parameter
const findParentsQuery = ` 
MATCH (node:Category {name: $categoryName})<-[:HAS_SUBCATEGORY]-(parent:Category) 
RETURN parent 
ORDER BY parent.name ASC 
`;

// 05 - This query COUNTS ALL PARENTS of the node whose name is given by the "categoryName" parameter
const countParentsQuery = ` 
MATCH (node:Category {name: $categoryName})<-[:HAS_SUBCATEGORY]-(parent:Category) 
RETURN COUNT (parent) AS parentsCount 
`;

// 06 - This query FINDS ALL GRANDPARENTS of the node whose name is given by the "categoryName" parameter
const findGrandparentsQuery = ` 
MATCH (node:Category {name: $categoryName})<-[:HAS_SUBCATEGORY*2]-(grandparent:Category) 
RETURN DISTINCT grandparent 
ORDER BY grandparent.name ASC 
`;

// 07 - This query COUNTS ALL UNIQUELY NAMED NODES.
const countUniqueNodesQuery = `MATCH (node:Category) RETURN COUNT (DISTINCT node.name) AS uniqueCount`;

// 08 - This query FINDS RANDOM ROOT NODES in the amount given by the "amount" parameter.
const findRandomRootQuery = `
MATCH (root)-[:HAS_SUBCATEGORY]->()
WHERE NOT exists( ()-[:HAS_SUBCATEGORY]->(root) )
RETURN DISTINCT root.name, rand() AS r 
ORDER BY r
LIMIT $amount
`;

// 09 - This query return all nodes that have the most children (there could be more than one)
const findFertileNodesQuery = `
MATCH (node:Category)-[:HAS_SUBCATEGORY]->(child:Category)
WITH node, COUNT(child) AS childrenCount
WITH collect({node: node, count: childrenCount}) AS nodesAndCounts, MAX(childrenCount) AS maxChildrenCount
UNWIND nodesAndCounts AS nc
WITH nc.node AS node, nc.count AS childCount, maxChildrenCount
WHERE childCount = maxChildrenCount
RETURN node
ORDER BY node.name ASC;
`;

// 10 - This query finds out what is THE HIGHEST AMOUNT OF CHILDREN that a node has.
const findInfertileNodesQuery = `
MATCH (node:Category)-[:HAS_SUBCATEGORY]->(child:Category)
WITH node, COUNT(child) AS childrenCount
WITH collect({node: node, count: childrenCount}) AS nodesAndCounts, MIN(childrenCount) AS minChildrenCount
UNWIND nodesAndCounts AS nc
WITH nc.node AS node, nc.count AS childCount, minChildrenCount
WHERE childCount = minChildrenCount
RETURN node
ORDER BY node.name ASC;
`;

// 11 - This query RENAMES the node whose name is given by the "categoryName" parameter.
const renameQuery = `
MATCH (node:Category {name: $categoryName})
SET node.name = $newName
RETURN node
`;

// 12 - This query FINDS ALL PATHS starting at the node {name: $nodeFrom} and leading (always "downwards") to the node {name: $nodeTo}.
const findPathsQuery = `
MATCH path=(nodeFrom:Category {name: $nodeFrom})-[*]->(nodeTo:Category {name: $nodeTo})
RETURN path
`;

const boundedFindPathsQuery = `
   MATCH (startNode {name: $nodeFrom})
    WITH startNode
    MATCH (endNode {name: $nodeTo})
    CALL apoc.path.expandConfig(startNode, {
      relationshipFilter: 'HAS_SUBCATEGORY>',
      endNodes: [endNode],
      bfs: false,
      uniqueness: 'NODE_PATH',
      maxLevel: $maxLevel
    }) YIELD path
    RETURN path
`;

module.exports = {
  findChildrenQuery,
  countChildrenQuery,
  findGrandchildrenQuery,
  findParentsQuery,
  countParentsQuery,
  findGrandparentsQuery,
  countUniqueNodesQuery,
  findRandomRootQuery,
  findFertileNodesQuery,
  findInfertileNodesQuery,
  renameQuery,
  findPathsQuery,
  boundedFindPathsQuery,
};
