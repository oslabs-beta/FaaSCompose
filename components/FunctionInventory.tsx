const FunctionInventory = (props) => {
  return (
    <div>
      <span>Cloud Function Inventory</span>
      <button>+</button>
      <div>
        <ul>{props.functions}</ul>
      </div>
    </div>
  );
};

export default FunctionInventory;
