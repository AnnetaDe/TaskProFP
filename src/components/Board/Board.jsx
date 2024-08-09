export const Board = ({ board }) => {
  return (
    <li>
      <div>{board.title}</div>
      <div>{board.icon}</div>
    </li>
  );
};
