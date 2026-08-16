import AsciiBackground from "./AsciiBackground";

const Background = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="diagonal-bg absolute inset-0 opacity-40" />
      <AsciiBackground />
    </div>
  );
};

export default Background;