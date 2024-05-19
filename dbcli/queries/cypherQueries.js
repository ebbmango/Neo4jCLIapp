// 01 - This query FINDS ALL CHILDREN of the node whose name is given by the "nodeName" parameter
const findChildrenQuery = ` 
MATCH (node:Category {name: $categoryName})-[:HAS_SUBCATEGORY]->(child:Category) 
RETURN child 
ORDER BY child.name ASC 
`;

// 02 - This query COUNTS ALL CHILDREN of the node whose name is given by the "nodeName" parameter
const countChildrenQuery = ` 
MATCH (node:Category {name: $categoryName})-[:HAS_SUBCATEGORY]->(child:Category) 
RETURN COUNT (child) AS childrenCount 
`;

// 03 - This query FINDS ALL GRANDCHILDREN of the node whose name is given by the "nodeName" parameter
const findGrandchildrenQuery = `
MATCH (node:Category {name: $categoryName})-[:HAS_SUBCATEGORY*2]->(grandchild:Category)
RETURN grandchild
ORDER BY grandchild.name ASC
`;

// 04 - This query FINDS ALL PARENTS of the node whose name is given by the "nodeName" parameter
const findParentsQuery = ` 
MATCH (node:Category {name: $categoryName})<-[:HAS_SUBCATEGORY]-(parent:Category) 
RETURN parent 
ORDER BY parent.name ASC 
`;

// 05 - This query COUNTS ALL PARENTS of the node whose name is given by the "nodeName" parameter
const countParentsQuery = ` 
MATCH (node:Category {name: $categoryName})<-[:HAS_SUBCATEGORY]-(parent:Category) 
RETURN COUNT (parent) AS parentsCount 
`;

// 06 - This query FINDS ALL GRANDPARENTS of the node whose name is given by the "nodeName" parameter
const findGrandparentsQuery = ` 
MATCH (node:Category {name: $categoryName})<-[:HAS_SUBCATEGORY*2]-(grandparent:Category) 
RETURN grandparent 
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

// 09a - This query finds out what is THE HIGHEST AMOUNT OF CHILDREN that a node has.
const countMaxChildrenQuery = `
MATCH (node:Category)-[:HAS_SUBCATEGORY]->(child:Category)
WITH node, COUNT(child) AS childrenCount
WITH MAX(childrenCount) AS maxChildrenCount
RETURN maxChildrenCount;
`;

// 10b This query finds out what is THE LOWEST AMOUNT OF CHILDREN that a node has.
const countMinChildrenQuery = `
MATCH (node:Category)-[:HAS_SUBCATEGORY]->(child:Category)
WITH node, COUNT(child) AS childrenCount
WITH MIN(childrenCount) AS minChildrenCount
RETURN minChildrenCount;
`;

// 09b & 10b - This query FINDS ALL NODES whose AMOUNT OF CHILDREN is given by the "amount" parameter.
const findNodesWithChildrenAmountQuery = `
MATCH (node:Category)-[:HAS_SUBCATEGORY]->(child:Category)
WITH node, COUNT(child) AS childCount
WHERE childCount = $amount
RETURN node, childCount
ORDER BY node.name ASC 
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
  countMaxChildrenQuery,
  countMinChildrenQuery,
  findNodesWithChildrenAmountQuery
};
