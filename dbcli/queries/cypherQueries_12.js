
MATCH p=(a:Category {name : '15th-century_Italian_painters'})-[*]->(:Category {name : 'Paintings_by_Leonardo_da_Vinci'})
RETURN p

// result //


╒═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╕
│p                                                                                                                                                                                      │
╞═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╡
│(:Category {name: "15th-century_Italian_painters"})-[:HAS_SUBCATEGORY]->(:Category {name: "Leonardo_da_Vinci"})-[:HAS_SUBCATEGORY]->(:Category {name: "Works_by_Leonardo_da_Vinci"})-[:│
│HAS_SUBCATEGORY]->(:Category {name: "Paintings_by_Leonardo_da_Vinci"})                                                                                                                 │
├───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│(:Category {name: "15th-century_Italian_painters"})-[:HAS_SUBCATEGORY]->(:Category {name: "Italian_Renaissance_painters"})-[:HAS_SUBCATEGORY]->(:Category {name: "Leonardo_da_Vinci"})-│
│[:HAS_SUBCATEGORY]->(:Category {name: "Works_by_Leonardo_da_Vinci"})-[:HAS_SUBCATEGORY]->(:Category {name: "Paintings_by_Leonardo_da_Vinci"})                                          │
└───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘