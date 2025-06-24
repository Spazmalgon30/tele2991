import React, { useState } from "react";

export function Tabs({ defaultValue, children }) {
  const [active, setActive] = useState(defaultValue);
  const triggers = React.Children.toArray(children).filter(child => child.type.displayName === "TabsTrigger");
  const contents = React.Children.toArray(children).filter(child => child.type.displayName === "TabsContent");

  return (
    <div>
      <div>{triggers.map(trigger => React.cloneElement(trigger, { active, setActive }))}</div>
      <div>{contents.find(content => content.props.value === active)}</div>
    </div>
  );
}

export function TabsList({ children, className = "" }) {
  return <div className={`flex gap-2 ${className}`}>{children}</div>;
}

export function TabsTrigger({ value, children, active, setActive }) {
  const isActive = active === value;
  return (
    <button
      className={`px-4 py-2 rounded-md text-sm font-medium ${isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
      onClick={() => setActive(value)}
    >
      {children}
    </button>
  );
}
TabsTrigger.displayName = "TabsTrigger";

export function TabsContent({ value, children }) {
  return <div>{children}</div>;
}
TabsContent.displayName = "TabsContent";
