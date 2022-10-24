import StyledHeader from "../Styles/StyleHeader";
import { useContext } from "react";
import UserContext from "../Shared/UserContext";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <StyledHeader>
      <h1>TrackIt</h1>
      <img data-identifier="avatar" src={user.image} alt="User" />
    </StyledHeader>
  );
}
