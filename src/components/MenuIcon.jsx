import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

export default function MenuIcon() {
  return (
    <Menu menuButton={<MenuButton>&#x2022; &#x2022; &#x2022;</MenuButton>} transition>
      <MenuItem>New File</MenuItem>
      <MenuItem>New Window</MenuItem>
      <MenuItem>Open File...</MenuItem>
      <MenuItem>Open Folder...</MenuItem>
    </Menu>
  );
}
