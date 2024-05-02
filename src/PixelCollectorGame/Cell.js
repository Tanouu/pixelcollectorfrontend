export default ({ cell }) => {
  const style = cell ? styles.color(cell) : styles.emptyCell;
  return (
      <div className="Cell" style={{ ...styles.cell, ...style }} />
  );
}

const colors = [
  [190, 0, 253],    // Purple
  [253, 253, 0],  // Yellow
  [0, 253, 0],  // Green
  [139, 0, 139],  // Dark Magenta
  [253, 179, 0],  // Orange
  [253, 0, 6],  // Red
  [0, 253, 253]  // Cyan
];

const styles = {
  cell: {
    width: '25px',
    height: '25px',
    display: 'inline-block',
    verticalAlign: 'top',
  },
  emptyCell: {
    border: '1px solid #ddd',
    backgroundColor: '#eee'
  },
  color: cell => {
    const color = colors[cell - 1];
    const rgbaColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.8)`;
    return {
      backgroundColor: rgbaColor,
      border: '4px solid',
      borderBottomColor: `linear-gradient(45deg, rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.1), rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.4))`,
      borderRightColor: `linear-gradient(135deg, rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.3), rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.6))`,
      borderTopColor: `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.6)`,
      borderLeftColor: `linear-gradient(225deg, rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.3), rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.6))`,
      boxShadow: `inset 0 0 4px rgba(0,0,0,0.4)`
    }
  }
  };


