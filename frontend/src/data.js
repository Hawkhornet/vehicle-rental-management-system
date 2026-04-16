
import raptor from "./assets/vehicles/raptor.jpg";
import prius from "./assets/vehicles/prius.jpg";
import vezel from "./assets/vehicles/vezel.jpg";
import wagonr from "./assets/vehicles/wagonr.jpg";

const vehicles = [
  {
    id: 1,
    name: "Ford Raptor Ranger 2019",
    username: "@notshanesilva",
    owner: "Shane Silva",
    transmission: "Automatic",
    year: "2019",
    fuel: "Diesel",
    location: "Ganemulla",
    price: "Rs. 7000/day",
    image: raptor,
  },
  {
    id: 2,
    name: "Toyota Prius 2018",
    username: "@priusowner",
    owner: "Kasun Perera",
    transmission: "Automatic",
    year: "2018",
    fuel: "Hybrid",
    location: "Colombo",
    price: "Rs. 5500/day",
    image: prius,
  },
  {
    id: 3,
    name: "Honda Vezel 2020",
    username: "@vezelhub",
    owner: "Nadeesha",
    transmission: "Automatic",
    year: "2020",
    fuel: "Petrol",
    location: "Kandy",
    price: "Rs. 8000/day",
    image: vezel,
  },
  {
    id: 4,
    name: "Suzuki Wagon R 2017",
    username: "@citydrive",
    owner: "Ruwan",
    transmission: "Automatic",
    year: "2017",
    fuel: "Petrol",
    location: "Maharagama",
    price: "Rs. 4500/day",
    image: wagonr,
  },
];

export default vehicles;