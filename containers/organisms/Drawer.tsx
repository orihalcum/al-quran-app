import React, { useEffect, useState } from 'react';

const Drawer = ({ children, position = 'left', visible, onClose }) => {

  let [maxWidth, setMaxWidth] = useState(500)

  let drawerStyle = {
    maxWidth,
    top: 0,
  }

  if (position === 'right')
    drawerStyle['right'] = visible ? 0 : (maxWidth * -1)
  else
    drawerStyle['left'] = visible ? 0 : (maxWidth * -1)

  useEffect(() => {
    if(typeof window !== 'undefined') setMaxWidth(window.innerWidth)
  }, [])

  return (
    !visible
      ? <div />
      : (
        <div className="fixed h-screen w-screen bg-white bg-gray-900 bg-opacity-75 top-0 z-50 shadow-lg">
          <div
            className="drawer h-screen w-screen bg-gradient-to-br from-green-400 to-blue-500 text-white opacity-90 absolute sm:max-w-md sm:mx-auto"
            style={drawerStyle}
          >
            {children}
          </div>
        </div>
      )
  );
};

export default Drawer;