 import './MoveInputBox.css';
 
 function MoveInputBox({ isTop, setIsTop }) {
        return (
          <>
            <a
              className="move-input-box"
              onClick={() => {
                setIsTop(!isTop);
              }}
            >
              {isTop ? "Move textbox to bottom" : "Move textbox to top"}
            </a>
          </>
        );
      }

      export default MoveInputBox;