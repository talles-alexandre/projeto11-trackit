import StyledDisplayHabits from "../Styles/StyledDisplayHabits";
import trash from "../img/trash.png";
import { Paragraph } from "../Shared/stylesExports";
import { useState, useContext } from "react";
import AddHabits from "./AddHabits";
import { DeletarHabito } from "../Shared/API";
import UserContext from "../Shared/UserContext";
import { useNavigate } from "react-router-dom";

export default function DisplayHabits({ userListedHabit }) {
  const [typeHabit, setTypeHabit] = useState(false);
  return (
    <nav>
      <section>
        <h1>Meus hábitos</h1>
        <div
          data-identifier="create-habit-btn"
          onClick={() => setTypeHabit(true)}
        >
          +
        </div>
      </section>
      {typeHabit ? <AddHabits setTypeHabit={setTypeHabit} /> : ""}

      {userListedHabit.map((item, index) => (
        <MyHabits
          name={item.name}
          days={item.days}
          habitId={item.id}
          key={index}
        />
      ))}
    </nav>
  );
}

function MyHabits({ name, days, habitId }) {
  const { user } = useContext(UserContext);
  const config = { headers: { Authorization: `Bearer ${user.token}` } };
  const navigate = useNavigate();
  const weekDays = [
    { id: 0, day: "D" },
    { id: 1, day: "S" },
    { id: 2, day: "T" },
    { id: 3, day: "Q" },
    { id: 4, day: "Q" },
    { id: 5, day: "S" },
    { id: 6, day: "S" },
  ];

  function deleteHabit() {
    const confirm = window.confirm(
      "Tem certeza que você quer apagar esse hábito?"
    );
    if (confirm) {
      const promise = DeletarHabito(config, habitId);
      promise.then(() => {
        console.log("yay, it worked!!");
        navigate("/hoje");
        navigate("/habitos");
      });
    }
  }

  return (
    <StyledDisplayHabits>
      <div>
        <h1 data-identifier="habit-name">{name}</h1>
        <img
          data-identifier="delete-habit-btn"
          src={trash}
          onClick={deleteHabit}
          alt="icon"
        />
      </div>
      <span>
        {weekDays.map((item, index) => (
          <Colour
            data-identifier="week-day-btn"
            days={days}
            idP={item.id}
            listeddays={item.day}
            key={index}
          />
        ))}
      </span>
    </StyledDisplayHabits>
  );
}

function Colour({ days, idP, listeddays }) {
  let backGroundColor = "#FFFFFF";
  let color = "#dbdbdb";
  days.map((item) =>
    item === idP ? ((color = "#FFFFFF"), (backGroundColor = "#CFCFCF")) : ""
  );
  return (
    <Paragraph idP={idP} color={color} backGroundColor={backGroundColor}>
      {listeddays}
    </Paragraph>
  );
}
