import { Squash as Hamburger } from "hamburger-react";
import { BurgerButtonContainer } from "./Menu.styled";

const Menu = ({ toggle, open }) => {
   return (
      <BurgerButtonContainer>
         <Hamburger
            rounded
            easing="ease-in"
            distance="sm"
            size={30}
            toggle={toggle}
            toggled={open}
         />
      </BurgerButtonContainer>
   );
};

export default Menu;
