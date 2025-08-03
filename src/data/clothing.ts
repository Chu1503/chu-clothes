import pants1 from "@/assets/pants-1.png";
import pants2 from "@/assets/pants-2.png";
import pants3 from "@/assets/pants-3.png";
import pants4 from "@/assets/pants-4.png";
import pants5 from "@/assets/pants-5.png";
import pants6 from "@/assets/pants-6.png";
import pants7 from "@/assets/pants-7.png";
import pants8 from "@/assets/pants-8.png";
import pants9 from "@/assets/pants-9.png";
import polo1 from "@/assets/polo-1.png";
import polo2 from "@/assets/polo-2.png";
import polo3 from "@/assets/polo-3.png";
import polo4 from "@/assets/polo-4.png";
import polo5 from "@/assets/polo-5.png";
import polo6 from "@/assets/polo-6.png";
import polo7 from "@/assets/polo-7.png";
import polo8 from "@/assets/polo-8.png";
import polo9 from "@/assets/polo-9.png";
import polo10 from "@/assets/polo-10.png";
import polo11 from "@/assets/polo-11.png";
import polo12 from "@/assets/polo-12.png";
import polo13 from "@/assets/polo-13.png";
import polo14 from "@/assets/polo-14.png";
import polo15 from "@/assets/polo-15.png";
import polo16 from "@/assets/polo-16.png";
import shirt1 from "@/assets/shirt-1.png";
import shirt2 from "@/assets/shirt-2.png";
import tshirt1 from "@/assets/tshirt-1.png";
import tshirt2 from "@/assets/tshirt-2.png";
import hoodie1 from "@/assets/hoodie-1.png";
import hoodie2 from "@/assets/hoodie-2.png";
import sweatshirt1 from "@/assets/sweatshirt-1.png";
import sweatshirt2 from "@/assets/sweatshirt-2.png";
import sweatshirt3 from "@/assets/sweatshirt-3.png";
import sweatshirt4 from "@/assets/sweatshirt-4.png";
import sweatshirt5 from "@/assets/sweatshirt-5.png";
import sweatshirt6 from "@/assets/sweatshirt-6.png";

export type VoteType = 'good' | 'mid' | 'bad' | null;

export interface ClothingItem {
  id: string;
  name: string;
  image: string;
  vote: VoteType;
}

export interface ClothingCategory {
  id: string;
  name: string;
  items: ClothingItem[];
}

export const clothingCategories: ClothingCategory[] = [
  {
    id: 'pants',
    name: 'PANTS',
    items: [
      { id: 'pants-1', name: 'Bonkers Corner | Dark Gray Cargos', image: pants1, vote: null },
{ id: 'pants-2', name: 'Peter England | Dark Gray Chinos', image: pants2, vote: null },
{ id: 'pants-3', name: 'Decathlon | Dark Gray Pants', image: pants2, vote: null },
{ id: 'pants-4', name: 'John Players | Olive Green Drawstring Chinos', image: pants3, vote: null },
{ id: 'pants-5', name: 'Jack & Jones | Beige Chinos', image: pants4, vote: null },
{ id: 'pants-6', name: 'H&M | Beige Drawstring Cargos', image: pants5, vote: null },
{ id: 'pants-7', name: 'Pepe Jeans | Dark Blue Jeans', image: pants6, vote: null },
{ id: 'pants-8', name: 'SF Jeans | Blue Jeans', image: pants7, vote: null },
{ id: 'pants-9', name: 'Levis | Blue Jeans', image: pants8, vote: null },
    ]
  },
  {
    id: 'polos',
    name: 'POLOS',
    items: [
      { id: 'polo-1', name: 'Peter England | Lilac Half Sleeve', image: polo1, vote: null },
      { id: 'polo-2', name: 'Peter England | Dark Gray Half Sleeve', image: polo2, vote: null },
      { id: 'polo-3', name: 'Levis | Maroon Half Sleeve', image: polo3, vote: null },
      { id: 'polo-4', name: 'United Colors of Benetton | Beige & Blue Half Sleeve', image: polo4, vote: null },
      { id: 'polo-5', name: 'Pepe Jeans | Dark Green Half Sleeve', image: polo5, vote: null },
      { id: 'polo-6', name: 'Van Heusen | Violet Half Sleeve', image: polo6, vote: null },
      { id: 'polo-7', name: 'Allen Solly | Red Half Sleeve', image: polo7, vote: null },
      { id: 'polo-8', name: 'Netplay | Beige Half Sleeve Knitted', image: polo8, vote: null },
      { id: 'polo-9', name: 'Netplay | Olive Green Half Sleeve Knitted', image: polo9, vote: null },
      { id: 'polo-10', name: 'Westside | Black Half Sleeve Ribbed', image: polo10, vote: null },
      { id: 'polo-11', name: 'India | Blue Half Sleeve Jersey', image: polo11, vote: null },
      { id: 'polo-12', name: 'CSK | Yellow Half Sleeve Jersey', image: polo12, vote: null },
      { id: 'polo-13', name: 'NUS | Navy Blue Half Sleeve Jersey', image: polo13, vote: null },
      { id: 'polo-14', name: 'Superconcepts | Navy Blue Full Sleeve Ribbed', image: polo14, vote: null },
      { id: 'polo-15', name: 'H&M | Beige Full Sleeve Ribbed', image: polo15, vote: null },
      { id: 'polo-16', name: 'Tyre | Black & Beige Full Sleeve Tyre', image: polo16, vote: null },
      
    ]
  },
  {
    id: 'shirts',
    name: 'SHIRTS',
    items: [
      { id: 'shirt-1', name: 'White Dress Shirt', image: shirt1, vote: null },
      { id: 'shirt-2', name: 'Light Blue Shirt', image: shirt2, vote: null },
    ]
  },
  {
    id: 'tshirts',
    name: 'T SHIRTS',
    items: [
      { id: 'tshirt-1', name: 'Black T-Shirt', image: tshirt1, vote: null },
      { id: 'tshirt-2', name: 'White T-Shirt', image: tshirt2, vote: null },
    ]
  },
  {
    id: 'hoodies',
    name: 'HOODIES',
    items: [
      { id: 'hoodie-1', name: 'Grey Hoodie', image: hoodie1, vote: null },
      { id: 'hoodie-2', name: 'Black Hoodie', image: hoodie2, vote: null },
    ]
  },
  {
    id: 'sweatshirts',
    name: 'SWEATSHIRTS',
    items: [
      { id: 'sweatshirt-1', name: 'Westside | Olive Green', image: sweatshirt1, vote: null },
      { id: 'sweatshirt-2', name: 'Marks & Spencer | Black & Gray', image: sweatshirt2, vote: null },
      { id: 'sweatshirt-3', name: 'Marks & Spencer | Light Blue', image: sweatshirt3, vote: null },
      { id: 'sweatshirt-4', name: 'H&M | Violet', image: sweatshirt4, vote: null },
      { id: 'sweatshirt-5', name: 'The Souled Store | Organge Red', image: sweatshirt5, vote: null },
      { id: 'sweatshirt-6', name: 'Wrogn | Black', image: sweatshirt6, vote: null },
    ]
  },
];