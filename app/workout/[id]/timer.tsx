import { useState, useEffect } from "react";

export default function Timer({
  breakDuration,
  isStarted,
}: {
  breakDuration: number;
  isStarted: boolean;
}) {
  const [timeLeft, setTimeLeft] = useState(breakDuration);

  useEffect(() => {
    if (!isStarted) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(interval);
    }
    console.log(timeLeft);

    return () => {
      clearInterval(interval);
    };
  }, [timeLeft, isStarted]);

  const getCircleGradient = () => {
    const percentage = (timeLeft / 60) * 100;
    const startColor = "red";
    const endColor = "green";
    return `linear-gradient(90deg, ${startColor} ${percentage}%, ${endColor} ${percentage}%)`;
  };

  const circleStyle = {
    background: getCircleGradient(),
  };

  return (
    <>
      <div
        className="grid place-items-center h-48 w-48 rounded-full  my-2"
        style={circleStyle}
      >
        <div className="bg-color-secondary w-4/5 h-4/5 rounded-full flex items-center justify-center">
          <h1> {timeLeft}</h1>
        </div>
      </div>
    </>
  );
}
