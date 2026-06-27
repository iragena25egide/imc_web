export interface BoardMember {
  id: string;
  name: string;
  position: string; // Fallback English string
  roleKey: string;  // Key for dictionary translation
  email: string;
  phone: string;
  imageUrl: string;
  level: number;
}

export const boardMembers: BoardMember[] = [
  {
    id: "dushimimana",
    name: "DUSHIMIMANA Stiven",
    position: "Managing Director",
    roleKey: "managingDirector",
    email: "interafricancorporation1@gmail.com",
    phone: "0781579376",
    imageUrl: "/images/board/dushimimana.jpeg",
    level: 1,
  },
  {
    id: "nsanzimana",
    name: "NSANZIMANA Vedaste",
    position: "Mine Manager",
    roleKey: "mineManager",
    email: "interafricancorporation1@gmail.com",
    phone: "0781579376",
    imageUrl: "/images/board/nsanzimana.jpeg",
    level: 3,
  },
  {
    id: "maniraguha",
    name: "MANIRAGUHA Emmanuel",
    position: "Site Manager",
    roleKey: "siteManager",
    email: "interafricancorporation1@gmail.com",
    phone: "0781579376",
    imageUrl: "/images/board/maniraguha.jpeg",
    level: 3,
  },
  {
    id: "tuyisenge",
    name: "TUYISENGE Flex",
    position: "Mine operation manager",
    roleKey: "mineOperationManager",
    email: "interafricancorporation1@gmail.com",
    phone: "0781579376",
    imageUrl: "/images/board/tuyisenge.jpeg",
    level: 3,
  },
  {
    id: "ngemanyi",
    name: "NGEMANYI RUKARA Bosco",
    position: "Chief of Security",
    roleKey: "chiefOfSecurity",
    email: "interafricancorporation1@gmail.com",
    phone: "0781579376",
    imageUrl: "/images/board/ngemanyi.jpeg",
    level: 3,
  },
];
