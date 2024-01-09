import { Textfit } from "react-textfit";
import "./Screen.css";

const Screen = ({ value }) => {
  return (
    <Textfit className="screen" mode="single" max={40} style={{color:" #5e729f"}}>
      {value}
    </Textfit>
  );
};

export default Screen;