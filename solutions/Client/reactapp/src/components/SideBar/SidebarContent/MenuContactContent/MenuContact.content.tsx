import MenuContact from "@/components/ContactView/MenuContact";
import { useGlobalState, useScreenSectionNavigator } from "@/hooks";
import { menuContacts } from "data/constants";

const MenuContactContent = () => {
  const [activeContactType, setActiveContactType] =
    useGlobalState("activeContactType");

  const { handleClickScreenSection } = useScreenSectionNavigator();

  function handleClickMenuContact(index: number) {
    handleClickScreenSection(false);
    setActiveContactType(index);
  }

  return (
    <>
      {menuContacts.map((menuContact, index) => (
        <MenuContact
          key={index}
          index={index}
          image={menuContact.image}
          name={menuContact.name}
          isActive={activeContactType === index}
          onClick={handleClickMenuContact}
        />
      ))}
    </>
  );
};

export default MenuContactContent;
