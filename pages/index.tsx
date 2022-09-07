import type { NextPage } from "next";
import Header from "../components/header";
import Listwords from "../components/Listwords";
import Search from "../components/search";

const Home: NextPage = () => {
  return (
    <main>
      <Header/>
      <Search/>
      <Listwords/>
    </main>
  );
};

export default Home;
