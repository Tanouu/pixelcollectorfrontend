import React from 'react';

export default ({ cell }) => {
  const style = cell ? styles.color(cell) : styles.emptyCell;
  return (
      <div className="Cell" style={{...styles.cell, ...style }} />
  );
}

const colors = [
  [0, 0, 139],    // darkblue
  [220, 20, 60],  // crimson
  [50, 205, 50],  // limegreen
  [139, 0, 139],  // darkmagenta
  [255, 140, 0],  // darkorange
  [0, 139, 139],  // cyan
  [255, 20, 147]  // deeppink
];

const styles = {
  cell: {
    width: '25px',
    height: '25px',
    float: 'left',
  },
  emptyCell: {
    border: '1px solid #ddd',
    backgroundColor: '#eee'
  },
  color: cell => {
    const color = colors[cell - 1];
    return {
      backgroundColor: `rgba(${color.join(',')}, 0.8)`,
      border: '3px solid',
      borderBottomColor: `rgba(${color.join(',')}, 0.1)`,
      borderRightColor: `rgba(${color.join(',')}, 1)`,
      borderTopColor: `rgba(${color.join(',')}, 1)`,
      borderLeftColor: `rgba(${color.join(',')}, 0.3)`,
      boxShadow: 'inset 0px 0px 0px 1px rgba(255,255,255,0.5)',
    }
  }
};
