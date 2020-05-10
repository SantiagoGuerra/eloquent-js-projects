const roads = [
  "Alice's House->Bob's House", "Alice's House->Cabin",
  "Alice's House->Post Office", "Bob's House->Town Hall",
  "Daria's House->Ernie's House", "Daria's House->Town Hall",
  "Ernie's House->Grete's House", "Grete's House->Farm",
  "Grete's House->Shop", 'Marketplace->Farm',
  'Marketplace->Post Office', 'Marketplace->Shop',
  'Marketplace->Town Hall', 'Shop->Town Hall',
];

const arrayToGraph = array => {
  const graph = {};
  const insertEdge = (from, to) => {
    if (graph[from] === null || graph[from] === undefined) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  };

  const eachRoad = array.map(road => road.split('->'));

  eachRoad.forEach(elem => {
    const [from, to] = elem;
    insertEdge(from, to);
    insertEdge(to, from);
  });

  return graph;
};

const roadGraph = arrayToGraph(roads);

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    }
    const parcels = this.parcels.map(p => {
      if (p.place !== this.place) return p;
      return { place: destination, address: p.address };
    }).filter(p => p.place !== p.address);
    return new VillageState(destination, parcels);
  }
}

const first = new VillageState(
  'Post Office',
  [{ place: 'Post Office', address: "Alice's House" }],
);
