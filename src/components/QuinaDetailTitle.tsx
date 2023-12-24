import React, { ReactNode } from "react";

const QuinaDetailTitle: React.FC<{children: ReactNode}> = ({ children }) => {
  return (
    <h2 className="absolute right-16 top-16 text-4xl font-semibold flex gap-4">
      {children}
    </h2>
  );
};

export default QuinaDetailTitle;
